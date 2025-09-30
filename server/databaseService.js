import mysql from 'mysql2/promise';
import { databaseConfig } from './databaseConfig.js';

export class DatabaseService {
  static instance = null;
  pool = null;

  constructor() {
    this.pool = mysql.createPool(databaseConfig);
    
    // Test connection on startup
    this.testConnection();
  }

  static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Get a connection from the pool
   */
  async getConnection() {
    const connection = await this.pool.getConnection();
    
    return {
      connection,
      release: () => connection.release()
    };
  }

  /**
   * Execute a query with automatic connection management
   */
  async query(sql, params) {
    const { connection, release } = await this.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows;
    } finally {
      release();
    }
  }

  /**
   * Execute a query and return the first result
   */
  async queryOne(sql, params) {
    const results = await this.query(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Execute an INSERT query and return the insert ID
   */
  async insert(sql, params) {
    const { connection, release } = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return result.insertId;
    } finally {
      release();
    }
  }

  /**
   * Execute an UPDATE/DELETE query and return affected rows
   */
  async update(sql, params) {
    const { connection, release } = await this.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return result.affectedRows;
    } finally {
      release();
    }
  }

  /**
   * Test database connection
   */
  async testConnection() {
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
  async closePool() {
    await this.pool.end();
    console.log('Database pool closed');
  }

  /**
   * Create necessary tables if they don't exist
   */
  async initializeTables() {
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

      // Create social_media_links table
      await this.query(`
        CREATE TABLE IF NOT EXISTS social_media_links (
          id INT AUTO_INCREMENT PRIMARY KEY,
          platform VARCHAR(50) UNIQUE NOT NULL,
          url VARCHAR(500) NOT NULL,
          icon_class VARCHAR(100),
          is_active BOOLEAN DEFAULT TRUE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      // Create testimonials table
      await this.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id INT AUTO_INCREMENT PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          customer_position VARCHAR(255),
          customer_company VARCHAR(255),
          testimonial_text TEXT NOT NULL,
          customer_image VARCHAR(500),
          rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      // Insert default social media links
      await this.insertDefaultSocialMediaLinks();

      // Insert default testimonials
      await this.insertDefaultTestimonials();

      console.log('✅ Database tables initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database tables:', error);
      throw error;
    }
  }

  /**
   * Insert default social media links
   */
  async insertDefaultSocialMediaLinks() {
    try {
      const defaultLinks = [
        { platform: 'facebook', url: '#', icon_class: 'facebook', display_order: 1 },
        { platform: 'twitter', url: '#', icon_class: 'twitter', display_order: 2 },
        { platform: 'instagram', url: '#', icon_class: 'instagram', display_order: 3 },
        { platform: 'youtube', url: '#', icon_class: 'youtube', display_order: 4 }
      ];

      for (const link of defaultLinks) {
        // Check if link already exists
        const existing = await this.queryOne(
          'SELECT id FROM social_media_links WHERE platform = ?',
          [link.platform]
        );

        if (!existing) {
          await this.insert(
            'INSERT INTO social_media_links (platform, url, icon_class, display_order) VALUES (?, ?, ?, ?)',
            [link.platform, link.url, link.icon_class, link.display_order]
          );
        }
      }
      console.log('✅ Default social media links inserted');
    } catch (error) {
      console.error('❌ Failed to insert default social media links:', error);
    }
  }

  /**
   * Insert default testimonials
   */
  async insertDefaultTestimonials() {
    try {
      const defaultTestimonials = [
        {
          customer_name: 'Sarah Johnson',
          customer_position: 'CEO',
          customer_company: 'Tech Solutions Ltd',
          testimonial_text: 'G20 Security has been our trusted partner for over 3 years. Their professionalism and attention to detail are unmatched.',
          customer_image: '/images/review1.jpg',
          rating: 5,
          is_featured: true,
          display_order: 1
        },
        {
          customer_name: 'Michael Chen',
          customer_position: 'Operations Manager',
          customer_company: 'Retail Group',
          testimonial_text: 'Excellent security services. The team is always responsive and reliable. Highly recommend their services.',
          customer_image: '/images/review2.jpg',
          rating: 5,
          is_featured: true,
          display_order: 2
        },
        {
          customer_name: 'Emma Williams',
          customer_position: 'Facility Manager',
          customer_company: 'Corporate Plaza',
          testimonial_text: 'Outstanding security solutions. G20 Security has helped us maintain a safe environment for our tenants.',
          customer_image: '/images/review3.jpg',
          rating: 5,
          is_featured: true,
          display_order: 3
        }
      ];

      for (const testimonial of defaultTestimonials) {
        // Check if testimonial already exists
        const existing = await this.queryOne(
          'SELECT id FROM testimonials WHERE customer_name = ? AND customer_company = ?',
          [testimonial.customer_name, testimonial.customer_company]
        );

        if (!existing) {
          await this.insert(
            'INSERT INTO testimonials (customer_name, customer_position, customer_company, testimonial_text, customer_image, rating, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
              testimonial.customer_name,
              testimonial.customer_position,
              testimonial.customer_company,
              testimonial.testimonial_text,
              testimonial.customer_image,
              testimonial.rating,
              testimonial.is_featured,
              testimonial.display_order
            ]
          );
        }
      }
      console.log('✅ Default testimonials inserted');
    } catch (error) {
      console.error('❌ Failed to insert default testimonials:', error);
    }
  }
}

// Export singleton instance
export const databaseService = DatabaseService.getInstance();
