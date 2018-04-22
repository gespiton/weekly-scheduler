const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const options = {
  root: path.join(__dirname, '../dist/'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

const dbRouter = express.Router();
const fireStoreApi = require('./fireStoreApi');
fireStoreApi(dbRouter);
app.use(dbRouter);
app.use('/', (req, res) => {
  console.log(req.url);
  res.sendFile('./index.html', options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("sent")
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  console.log('404');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(4000, function () {
  console.log('App (dev) is now running on port 4000!');
});


module.exports = app;
