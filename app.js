var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import cors from 'cors';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import userConnection from './connections/users.connection';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// db connection
// eslint-disable-next-line
userConnection.on("error", console.error.bind(console, "connection error:"));
userConnection.once('open', function() {
  // eslint-disable-next-line
	console.log("Connected correctly to users DB");
});

const typesArray = fileLoader(path.join(__dirname, './schemas'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const typeDefs = mergeTypes(typesArray);

const resolvers = mergeResolvers(resolversArray);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
