import { db } from "./dbInit";

const init = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS Storages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uid TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                date TEXT,
                description TEXT,
                totalInside REAL
                )`);
  } catch (error) {
    console.log("[DB ERROR]", error.message);
  }
};

export const INSERT_STORAGE = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `INSERT INTO Storages (uid, name, date, description, totalInside) VALUES (?, ?, ?, ?, ?)`,
      [data.uid, data.name, data.date, data.description, data.totalInside]
    );
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_STORAGES = async () => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Storages`);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_STORAGE = async (id) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Storages WHERE id=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const GET_STORAGE_UID = async (UID) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Storages WHERE uid=?`, [UID]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const UPDATE_STORAGE = async (id, data) => {
  try {
    await init();
    const res = await db.execute(
      `UPDATE Storages SET name=?, description=?, totalInside=? WHERE id=?`,
      [data.name, data.description, data.totalInside, id]
    );
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DELETE_STORAGE = async (id) => {
  try {
    await init();
    const res = await db.execute(`DELETE FROM Storages WHERE id=?`, [id]);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const DROP_STORAGE = async () => {
  try {
    await init();
    const res = await db.execute(`DROP TABLE IF EXISTS Storages`);
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};
