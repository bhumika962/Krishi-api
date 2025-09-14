"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _env = require("./config/env.js");

var _db = require("./config/db.js");

var _schema = require("./db/schema.js");

var _drizzleOrm = require("drizzle-orm");

var _cron = _interopRequireDefault(require("./config/cron.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = _env.ENV.PORT || 5001;
if (_env.ENV.NODE_ENV === "production") _cron["default"].start(); // CORS setup

app.use((0, _cors["default"])({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"]
}));
app.use(_express["default"].json()); // Health Check

app.get("/api/health", function (req, res) {
  res.status(200).json({
    success: true,
    message: "API running fine 🚀"
  });
});
/* -------- FAVORITES -------- */
// Add favorite crop

app.post("/api/favorites", function _callee(req, res) {
  var _req$body, userId, title, newFavorite;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userId = _req$body.userId, title = _req$body.title;

          if (!(!userId || !title)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_db.db.insert(_schema.favoritesTable).values({
            userid: userId,
            title: title
          }).returning());

        case 6:
          newFavorite = _context.sent;
          res.status(201).json(newFavorite[0]);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("Error adding favorite:", _context.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Get all favorites by user

app.get("/api/favorites/:userId", function _callee2(req, res) {
  var userId, favorites;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_db.db.select().from(_schema.favoritesTable).where((0, _drizzleOrm.eq)(_schema.favoritesTable.userid, userId)));

        case 4:
          favorites = _context2.sent;
          res.status(200).json(favorites);
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching favorites:", _context2.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Delete a specific favorite by ID

app["delete"]("/api/favorites/:id", function _callee3(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_db.db["delete"](_schema.favoritesTable).where((0, _drizzleOrm.eq)(_schema.favoritesTable.id, Number(id))).execute());

        case 4:
          result = _context3.sent;
          res.status(200).json({
            message: "Favorite deleted",
            result: result
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error("Error deleting favorite:", _context3.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/* -------- USERS -------- */
// Add user

app.post("/api/users", function _callee4(req, res) {
  var _req$body2, username, usercontact, userbirth, newUser;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, usercontact = _req$body2.usercontact, userbirth = _req$body2.userbirth;

          if (!(!username || !usercontact || !userbirth)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Missing required fields"
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_db.db.insert(_schema.userTable).values({
            username: username,
            usercontact: usercontact,
            userbirth: userbirth
          }).returning());

        case 6:
          newUser = _context4.sent;
          res.status(201).json(newUser[0]);
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error("Error adding user:", _context4.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Get user by ID

app.get("/api/users/:id", function _callee5(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_db.db.select().from(_schema.userTable).where((0, _drizzleOrm.eq)(_schema.userTable.id, Number(id))));

        case 4:
          user = _context5.sent;

          if (user.length) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 7:
          res.status(200).json(user[0]);
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error("Error fetching user:", _context5.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Update user

app.put("/api/users/:id", function _callee6(req, res) {
  var id, _req$body3, username, usercontact, userbirth, updatedUser;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _req$body3 = req.body, username = _req$body3.username, usercontact = _req$body3.usercontact, userbirth = _req$body3.userbirth;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_db.db.update(_schema.userTable).set({
            username: username,
            usercontact: usercontact,
            userbirth: userbirth
          }).where((0, _drizzleOrm.eq)(_schema.userTable.id, Number(id))).returning());

        case 5:
          updatedUser = _context6.sent;
          res.status(200).json(updatedUser[0]);
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error("Error updating user:", _context6.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Delete user

app["delete"]("/api/users/:id", function _callee7(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_db.db["delete"](_schema.userTable).where((0, _drizzleOrm.eq)(_schema.userTable.id, Number(id))).execute());

        case 4:
          result = _context7.sent;
          res.status(200).json({
            message: "User deleted",
            result: result
          });
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error("Error deleting user:", _context7.t0);
          res.status(500).json({
            error: "Something went wrong"
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Start server

app.listen(PORT, function () {
  console.log("API running on PORT: ".concat(PORT));
});