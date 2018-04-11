import * as firebase from "firebase";
import dbConstants from "../constants/dbConstants";

require("firebase/firestore");

const config = {
  apiKey: "AIzaSyBtjdIpz-4Lq3vSDPRCIiyRAlEmwR-qNKE",
  authDomain: "weekly-scheduler.firebaseapp.com",
  databaseURL: "https://weekly-scheduler.firebaseio.com",
  projectId: "weekly-scheduler",
  storageBucket: "",
  messagingSenderId: "525804016085"
};
firebase.initializeApp(config);
window.firebase = firebase;


const col_schedule = 'schedules';

const db = firebase.firestore();

function getDefaultSchedule() {
  if (navigator.onLine) {
    return db.collection(col_schedule).doc('default').get().then(doc => {
      if (doc.exists) {
        saveDocToIDB(doc.data());
        return doc.data();
      } else {
        return null;
      }
    });
  } else {

    return getSchedule('default');
  }


}

function updateDefaultSchedule(schedule) {
  return db.collection(col_schedule).doc('default').set(schedule);

}

function getIDB() {
  return new Promise((resolve, reject) => {
    if (window.idb) {
      return resolve(window.idb);
    }

    const request = window.indexedDB.open(dbConstants.INDEX_DB_NAME);

    request.onsuccess = event => {
      const db = window.idb = event.target.result;
      resolve(db);
    };

    request.onerror = e => {
      reject(e);
    };
  });
}

function saveDocToIDB(doc) {
  if (!window.idb) {
    const request = window.indexedDB.open(dbConstants.INDEX_DB_NAME);

    request.onsuccess = event => {
      window.idb = event.target.result;
      _saveDoc(doc);
    };

    request.onerror = e => {
      console.log(e);
    };

    return;
  }

  _saveDoc(doc);
}

function _saveDoc(doc) {
  const transaction = window.idb.transaction(["schedules"], "readwrite");

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
  getDefaultSchedule,
  updateDefaultSchedule
}
