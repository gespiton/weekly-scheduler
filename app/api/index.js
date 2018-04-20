import * as firebase from "firebase";
import idbManager from './lib/idbManager';
import Request from './lib/FirebaseRequest';

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
  const request = new Request(
    function request() {
      return db.collection(col_schedule).doc('default').get();
    },

    function postRequest(doc) {
      if (doc.exists) {
        idbManager.saveDocToIDB(doc.data());
        return doc.data();
      }
    },

    function fallback() {
      return idbManager.getSchedule('default');
    }
  );
  return request.excute;
}

function updateDefaultSchedule() {
  //todo insert timestamp
  const request = new Request(
    function request(schedule) {
      this.schedule = schedule;
      return db.collection(col_schedule).doc('default').set(schedule);
    },

    function postRequest() {
      console.log("update local");
      return idbManager.saveDocToIDB(this.requestArg[0]);
    },

    function fallback() {
      //todo update local idb, set timestamp
    }
  );

  return request.excute;
}


export default {
  getDefaultSchedule: getDefaultSchedule(),
  updateDefaultSchedule: updateDefaultSchedule()
}
