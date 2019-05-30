const express = require('express');
const app = express();

app.use(require('./users'));
app.use(require('./rol'));
app.use(require('./sala'));
app.use(require('./permiso_acceso'));
module.exports = app;