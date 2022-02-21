import { db } from "./dbInit";

export const DROP_DB_TABLE = async () => {
  try {
    const res = await db.execute(`DROP TABLE IF EXISTS Accounts`);
    console.log("[DB SAYS] Accounts DROPPED");
  } catch (error) {
    console.log("[DB ERROR]", error.message);
  }
};
