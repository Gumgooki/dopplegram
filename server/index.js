const path = require("path");
const express = require("express"); //used for routing
const app = express();
const db = require("./db");
const session = require("express-session"); //helps to give us session information thats normally saved in memory
const morgan = require("morgan"); //used for logging
const bodyParser = require("body-parser"); //used for body parsing
const passport = require("passport"); //used for authentication
const sequelizeStore = require("connect-session-sequelize")(session.Store); //creating a way to connect Sequelize with session data
const dbStore = new sequelizeStore({ db: db }); //configuring and creating our database store so we can save session data directly in DB
const port = process.env.PORT || 3000;
const socketio = require("socket.io");
console.log(require("dotenv").config());
require("dotenv").config();

// keep all of our secret API keys in 'secrets.js'. If we gitignore that file, then nothing will ever show up in git.
if (process.env.NODE_ENV !== "production") {
  require("../secrets");
}

// passport registration
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  //logging middleware
  app.use(morgan("dev"));

  //need middleware to parse  body for use in req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //this is optional middleware that gives us session information thats normally saved in memory
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "super insecure secret",
      store: dbStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  //initializing passport to take in req.session and attach user to request obhect
  app.use(passport.initialize());
  app.use(passport.session());

  //this is pulling all the routes from the api folder
  app.use("/api", require("./api"));
  //this is pulling all the routes from the auth folder
  app.use("/auth", require("./auth"));

  //serving up static resources from my server
  app.use(express.static(path.join(__dirname, "../public/")));

  //testing to remove the above============
  app.use(express.static(path.join(__dirname, "../public/uploads/")));

  //this is sending our index.html file for anything that doesn't match any routes
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //so we can log 500 errors
  app.use(function (err, req, res, next) {
    console.log(err);
    console.log(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
  });
};

const startListening = () => {
  //start listening (also creates a server object representing our server)
  const server = app.listen(port, () => {
    console.log("Knock, knock");
    console.log("Who's there?");
    console.log(`Your server, listening on port ${port}`);
  });

  const io = socketio(server);
  require("./socket")(io);
};

//sync the database
const syncDb = () => db.sync({ force: true });

async function bootApp() {
  await dbStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

// if somebody runs file directly from command line, its true; if required by another module, it's false, like if we wanted to use the app in a test spect
if (require.main === module) {
  bootApp();
} else {
  createApp();
}

module.exports = app;
