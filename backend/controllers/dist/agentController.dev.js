"use strict";

var User = require('../models/User'); // Get all agents


exports.getAllAgents = function _callee(req, res) {
  var agents;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: 'agent'
          }).select('-password'));

        case 3:
          agents = _context.sent;
          // Fetch only agents
          res.json(agents);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Server error',
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Add a new agent


exports.addAgent = function _callee2(req, res) {
  var _req$body, name, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Agent already exists'
          }));

        case 7:
          user = new User({
            name: name,
            email: email,
            password: password,
            // Ensure password is hashed (should use a middleware or controller function to hash)
            role: 'agent'
          });
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(201).json({
            message: 'Agent created successfully',
            user: user
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: 'Server error',
            error: _context2.t0
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; // Remove an agent


exports.removeAgent = function _callee3(req, res) {
  var agentId, agent;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          agentId = req.params.agentId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(agentId));

        case 4:
          agent = _context3.sent;

          if (agent) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Agent not found'
          }));

        case 7:
          res.json({
            message: 'Agent removed successfully'
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            message: 'Server error',
            error: _context3.t0
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
};