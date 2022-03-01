const express = require('express');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const routes = require('./routes');

const port = 3000;

// need this for cookies
app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687359s7w', 'hhjjdf19s866799'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use('/', routes({}));

app.listen(port, () => {
  console.log(`Express server listening on port ${port} - success!`);
});
