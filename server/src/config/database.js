const { Sequelize } = require("sequelize");
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = require("./env");

const postgres = new Sequelize(DB_NAME, DB_USERNAME, String(DB_PASSWORD), {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testPostgresConnection = async () => {
  try {
    console.log("🔹 Attempting DB connection...");
    await postgres.authenticate();
    console.log("PostgreSQL connected (Aiven)");

    await postgres.sync({ alter: false });
    console.log("Database synced successfully.");
  } catch (error) {
    throw new error("Unable to connect", error.message);
  }
};
module.exports = { testPostgresConnection, postgres };
