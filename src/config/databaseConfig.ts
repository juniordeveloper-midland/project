export const databaseConfig = {
  host: process.env.DB_HOST || '176.32.230.29',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'cl49-g20db',
  password: process.env.DB_PASSWORD || 'c^qBHUEmn',
  database: process.env.DB_NAME || 'cl49-g20db',
  connectionLimit: 10,
  charset: 'utf8mb4',
  timezone: '+00:00'
};

export default databaseConfig;
