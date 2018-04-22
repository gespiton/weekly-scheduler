import idbManager from './lib/idbManager';
import Request from './lib/FirebaseRequest';

function getDefaultSchedule() {
  const request = new Request(
    function request() {
      // return db.collection(col_schedule).doc('default').get();
      return fetch('/db/schedules/default')
        .then(response => response.json());
    },

    function postRequest(doc) {
      if (doc) {
        console.log(doc);
        idbManager.saveDocToIDB(doc);
        return doc;
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
      // this.schedule = schedule;
      // return db.collection(col_schedule).doc('default').set(schedule);


      return fetch('/db/schedules/default', {
        body: JSON.stringify(schedule), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
        .then(response => response.json()) // parses response to JSON
    },

    function postRequest() {
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
