import mysql from 'mysql2/promise';
import { readFileSync, existsSync } from 'fs';

console.log("--- MySQL Database Connection Test ---");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL_CA } = process.env;

console.log("DB_HOST:", DB_HOST);
console.log("DB_USER:", DB_USER);
console.log("DB_NAME:", DB_NAME);
console.log("DB_PORT:", DB_PORT);
console.log("Has SSL CA path?:", !!DB_SSL_CA);

const runTest = async () => {
  try {
    const config: any = {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT) || 3306,
    };

    if (DB_SSL_CA && existsSync(DB_SSL_CA)) {
      config.ssl = {
        ca: readFileSync(DB_SSL_CA)
      };
    }

    const connection = await mysql.createConnection(config);
    console.log("SUCCESSFULLY CONNECTED TO MYSQL!");
    
    const [rows]: any = await connection.execute("SHOW TABLES;");
    console.log("Tables in database:", rows);
    await connection.end();
  } catch (err: any) {
    console.log("MySQL connection failed:", err.message);
  }
};

runTest();
