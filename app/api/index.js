import * as firebase from "firebase";

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
  return db.collection(col_schedule).doc('default').get();
}

function updateDefaultSchedule(schedule) {
  return db.collection(col_schedule).doc('default').set(schedule);

}

export default {
  getDefaultSchedule,
  updateDefaultSchedule
}
