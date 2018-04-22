const admin = require("firebase-admin");
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://weekly-scheduler.firebaseio.com"
});

const firestore = admin.firestore();
const fs_schedule_default = firestore.collection('schedules').doc('default');

function getDefaultSchedule() {
  return fs_schedule_default.get();
}

function updateDefaultSchedule(schedule) {
  return fs_schedule_default.set(schedule);
}

function initializeRoute(router) {
  router.get('/db/schedule/default', function (req, res) {
    getDefaultSchedule()
      .then(doc => {
        res.json(doc.data());
      })
      .catch(err => {
        console.log("err");
        res.json({});
      });
  });

  router.post('/db/schedule/default', function (req, res) {
    const schedule = req.body;
    updateDefaultSchedule(schedule)
      .then(() => {
        res.json({success: true});
      })
      .catch(() => {
        res.json({success: false});
      });
  });
}

module.exports = initializeRoute;
