const express = require('express');
const session = require('express-session');
const routes = require('./controllers')

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app= express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'SuperSecretDeveloper',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new  sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
