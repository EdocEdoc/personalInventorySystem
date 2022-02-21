import { db } from "./dbInit";

const init = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS Accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uid TEXT NOT NULL UNIQUE,
                pin TEXT NOT NULL,
                string01 TEXT,
                string02 TEXT,
                string03 TEXT
                )`);
  } catch (error) {
    console.log("[DB ERROR]", error.message);
  }
};

export const INSERT_USER_ACCOUNT = async (data) => {
  try {
    await init();
    const res = await db.execute(
      `INSERT INTO Accounts (uid, pin, string01, string02, string03) VALUES (?, ?, ?, ?, ?)`,
      [data.uid, data.pin, data.string01, data.string02, data.string03]
    );
    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const LOGIN = async (pin) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Accounts WHERE pin=?`, [pin]);
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "WRONG PIN" } };
    }
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const CHECK_IF_ACCOUNT = async () => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Accounts`);
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "NO ACCOUNT" } };
    }
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const LOGIN_QR = async (qr) => {
  try {
    await init();
    const res = await db.execute(`SELECT * FROM Accounts WHERE uid=?`, [qr]);
    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "QR NOT FOUND" } };
    }
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const RECOVER_ACCOUNT = async (str) => {
  try {
    await init();
    const res = await db.execute(
      `SELECT * FROM Accounts WHERE string01=? OR string02=? OR string03=?`,
      [str, str, str]
    );

    if (res?.rows.length > 0) {
      return { success: res };
    } else {
      return { failed: { error: "QR NOT FOUND" } };
    }
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};

export const UPDATE_ACCOUNT = async (pin, id) => {
  try {
    await init();
    const res = await db.execute(`UPDATE Accounts SET pin=? WHERE id=?`, [
      pin,
      id,
    ]);

    return { success: res };
  } catch (error) {
    console.log("[DB ERROR]", error.message);
    return { failed: error };
  }
};
