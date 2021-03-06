const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/login', (req, res, next) => {
  api.login(req, res, next);
});
router.get('/createTable', (req, res, next) => {
  api.createTable(req, res, next);
});
router.get('/historyTable', (req, res, next) => {
  api.historyTable(req, res, next);
});
router.post('/insertTable', (req, res, next) => {
  api.insertTable(req, res, next);
});
router.get('/showTable', (req, res, next) => {
  api.showTable(req, res, next);
});
router.get('/deleteTable', (req, res, next) => {
  api.deleteTable(req, res, next);
});
router.get('/addTable', (req, res, next) => {
  api.addTable(req, res, next);
});
router.get('/changeTable', (req, res, next) => {
  api.changeTable(req, res, next);
});
router.get('/addMaster', (req, res, next) => {
  api.addMaster(req, res, next);
});
router.get('/searchUser', (req, res, next) => {
  api.searchUser(req, res, next);
});
router.get('/searchAllUser', (req, res, next) => {
  api.searchAllUser(req, res, next);
});

module.exports = router;
