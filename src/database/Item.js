import { db } from "./dbInit";

const init = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS Items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                storageId INTEGER NOT NULL,
                name TEXT NOT NULL,
                date TEXT,
                description TEXT,
                quantity REAL
                )`);
  } catch (error) {
    console.log("[DB ERROR]", error.message);
  }
};

export const INSERT_ITEM = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `INSERT INTO Items (storageId, name, date, description, quantity) VALUES (?, ?, ?, ?, ?)`,
      [data.storageId, data.name, data.date, data.description, data.quantity]
    );
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_ITEMS = async (id) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Items WHERE storageId=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_ITEM = async (id) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Items WHERE id=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const UPDATE_ITEM = async (id, data) => {
  try {
    await init();
    const res = await db.execute(
      `UPDATE Items SET name=?, description=?, quantity=? WHERE id=?`,
      [data.name, data.description, data.quantity, id]
    );
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DELETE_ITEMS = async (id) => {
  try {
    await init();
    const res = await db.execute(`DELETE FROM Items WHERE storageId=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DELETE_ITEM = async (id) => {
  try {
    await init();
    const res = await db.execute(`DELETE FROM Items WHERE id=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DROP_ITEMS = async () => {
  try {
    await init();
    const res = await db.execute(`DROP TABLE IF EXISTS Items`);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};
