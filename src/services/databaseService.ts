import mysql from 'mysql2/promise';
import { databaseConfig } from '../config/databaseConfig';

export interface DatabaseConnection {
  connection: mysql.Connection;
  release: () => void;
}

export class DatabaseService {
  private static instance: DatabaseService;
  private pool: mysql.Pool;

  private constructor() {
    this.pool = mysql.createPool(databaseConfig);
    
    // Test connection on startup
    this.testConnection();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Get a connection from the pool
   */
  public async getConnection(): Promise<DatabaseConnection> {
    const connection = await this.pool.getConnection();
    
    return {
      connection,
      release: () => connection.release()
    };
  }

  /**
   * Execute a query with automatic connection management
   */
  public async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const { connection, release } = await this.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows as T[];
    } finally {
      release();
    }
  }

  /**
   * Execute a query and return the first result
   */
  public async queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Execute an INSERT query and return the insert ID
   */
  public async insert(sql: string, params?: any[]): Promise<number> {
    const { connection, release } = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, params) as any;
      return result.insertId;
    } finally {
      release();
    }
  }

  /**
   * Execute an UPDATE/DELETE query and return affected rows
   */
  public async update(sql: string, params?: any[]): Promise<number> {
    const { connection, release } = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, params) as any;
      return result.affectedRows;
    } finally {
      release();
    }
  }

  /**
   * Test database connection
   */
  public async testConnection(): Promise<boolean> {
    try {
      const { connection, release } = await this.getConnection();
      await connection.ping();
      release();
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
  }

  /**
   * Close all connections in the pool
   */
  public async closePool(): Promise<void> {
    await this.pool.end();
    console.log('Database pool closed');
  }

  /**
   * Create necessary tables if they don't exist
   */
  public async initializeTables(): Promise<void> {
    try {
      // Create subscribers table
      await this.query(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_active BOOLEAN DEFAULT TRUE,
          ip_address VARCHAR(45),
          user_agent TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      // Create contact_messages table
      await this.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          subject VARCHAR(500),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          ip_address VARCHAR(45),
          user_agent TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      // Create blog_posts table
      await this.query(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          slug VARCHAR(500) UNIQUE NOT NULL,
          content LONGTEXT NOT NULL,
          excerpt TEXT,
          featured_image VARCHAR(500),
          author VARCHAR(255) DEFAULT 'G20 Security Team',
          status ENUM('draft', 'published') DEFAULT 'draft',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          published_at TIMESTAMP NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      console.log('✅ Database tables initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database tables:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const databaseService = DatabaseService.getInstance();
