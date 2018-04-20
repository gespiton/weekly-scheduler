import dbConstants from "../../constants/dbConstants";

let idb = null;


function getIDB() {
  return new Promise((resolve, reject) => {
    if (idb) {
      return resolve(idb);
    }

    const request = window.indexedDB.open(dbConstants.INDEX_DB_NAME);

    request.onsuccess = event => {
      idb = event.target.result;
      idb.onclose = function () {
        idb = null;
      };

      resolve(idb);
    };

    request.onerror = e => {
      reject(e);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;


      const objectStore = db.createObjectStore("schedules", {keyPath: "name"});

      objectStore.createIndex("name", "name", {unique: false});

      objectStore.transaction.oncomplete = function () {
        // const customerObjectStore = db.transaction("schedules", "readwrite").objectStore("schedules");
        // customerObjectStore.add({name: 'haha', ssn: 'ssn'});
      };
    };
  });
}

function saveDocToIDB(doc) {

  return getIDB()
    .then(idb => {
      const transaction = idb.transaction(["schedules"], "readwrite");

      transaction.oncomplete = function (event) {
      };

      transaction.onerror = function (event) {
        // Don't forget to handle errors!
      };

      const objectStore = transaction.objectStore("schedules");

      const request = objectStore.put({name: 'default', schedule: doc});
      request.onsuccess = function (event) {
        console.log('doc saved');
      };
    });
}

function getSchedule(scheduleName) {
  return getIDB()
    .then(db => {
        return new Promise((resolve, reject) => {
          const request = db.transaction(['schedules']).objectStore("schedules").get(scheduleName);

          request.onerror = err => {
            reject(err);
          };

          request.onsuccess = event => {
            resolve(event.target.result.schedule);
          }
        });
      }
    );
}

export default {
  getIDB, saveDocToIDB, getSchedule
};
