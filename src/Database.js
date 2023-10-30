import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase({ name: "MyDatabase.db", location: "default" });

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS allcontacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), surname VARCHAR(50), phone VARCHAR(15), email VARCHAR(50), iban VARCHAR(38), address VARCHAR(255), note VARCHAR(255));",

        [],
        () => {
          resolve("Veritabanı  oluşturuldu.");
        },
        (_, err) => {
          reject("Veritabanı oluşturulurken hata oluştu: " + err.message);
        }
      );
    });
  });
};


export const insertContact = (name, surname, phone, email, iban, address, note) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO allcontacts (name, surname, phone, email, iban, address, note) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [name, surname, phone, email, iban, address, note],
        (_, result) => {
          resolve(" başarıyla kaydedildi.");
        },
        (_, err) => {
          reject(" hata oluştu: " + err.message);
        }
      );
    });
  });
};

export const fetchContacts = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM allcontacts",
        [],
        (_, result) => {
          resolve(result.rows.raw());
        },
        (_, err) => {
          reject("Kişileri getirirken hata oluştu: " + err.message);
        }
      );
    });
  });
};


export const updateContact = (id, name, surname, phone, email, iban, address, note) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE allcontacts SET name = ?, surname = ?, phone = ?, email = ?, iban = ?, address = ?, note = ? WHERE id = ?;",
        [name, surname, phone, email, iban, address, note, id],
        (_, result) => {
          resolve(" başarıyla güncellendi.");
        },
        (_, err) => {
          reject(" güncellenirken hata oluştu: " + err.message);
        }
      );
    });
  });
};

export const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM allcontacts WHERE id = ?;",
        [id],
        (_, result) => {
          resolve(" başarıyla silindi.");
        },
        (_, err) => {
          reject(" silinirken hata oluştu: " + err.message);
        }
      );
    });
  });
};