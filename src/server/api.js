const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  login(req, res, next) {
    let userName = req.query.userName;
    let password = req.query.password;
    pool.getConnection((err,connection) => {
        var sql = sqlMap.selectUser;
        connection.query(sql, [userName, password], (err,result) => {
          connection.release();
          res.json(result);
            // // res.json(result);    // 向前端返回json格式的数据
            // connection.release();
            // let state = {}
            // if(result.length > 0) {
            //   state.state = 1;
            //   res.json(state);
            // } else {
            //   state.state = 0;
            //   res.json(state);
            // }
        })
    })
  },
  createTable(req, res, next) {
    let sqlBody = req.query.sqlBody;
    let tableName = req.query.tableName;
    pool.getConnection((err,connection) => {
        //var sql = sqlMap.creatTable;
        var sql = "CREATE  TABLE" + " " + tableName + " (" + sqlBody + ")  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci"
        connection.query(sql, (err,result) => {
          connection.release();
          res.json(result);
            // // res.json(result);    // 向前端返回json格式的数据
            // connection.release();
            // let state = {}
            // if(result.length > 0) {
            //   state.state = 1;
            //   res.json(state);
            // } else {
            //   state.state = 0;
            //   res.json(state);
            // }
        })
    })
  },
  insertTable(req, res, next) {
    let sqlBodys = req.body.params.sqlBody;
    let tableName = req.body.params.tableName;
      pool.getConnection((err,connection) => {
        for (var sqlBody in sqlBodys) {
        //var sql = sqlMap.creatTable;
        var sql = "INSERT INTO " + " " + tableName + " " + " VALUES (" + "null,\'" + sqlBodys[sqlBody] + "\')"
        connection.query(sql, (err,result) => {})
        }
        connection.release();
        res.json("finish");
      })
  },
  historyTable(req, res, next) {
    pool.getConnection((err,connection) => {
        var sql = "SHOW TABLES"
        connection.query(sql, (err,result) => {
          connection.release();
          var tableNameList = [];
          for (var tableName in result) {
            tableNameList.push(result[tableName].Tables_in_gentry);
          }
          res.json(tableNameList);
      })
   })
  },
  showTable(req, res, next) {
    pool.getConnection((err,connection) => {
        let tableName = req.query.tableName;
        var sql = "select * from "+" "+tableName
        connection.query(sql, (err,result) => {
          connection.release();
          var tableList = [];
          for (var i=0 ; i < result.length ;i++) {
            tableList.push(result[i]);
          }
          res.json(tableList);
      })
   })
  },
  deleteTable(req, res, next) {
    pool.getConnection((err,connection) => {
        let tableName = req.query.tableName;
        let multipleSelection = req.query.multipleSelection;
        for (var i in multipleSelection){
          var sql = "DELETE FROM" + " " + tableName + " " + "WHERE id =" + multipleSelection[i]
          connection.query(sql, (err,result) => {})
        }
        connection.release();
        res.json("finish");
   })
  },
  addTable(req, res, next) {
    pool.getConnection((err,connection) => {
        let tableName = req.query.tableName;
        let addList = req.query.addList;
        var sqlBody = addList.join('\',\'');
        var sql = "INSERT INTO " + " " + tableName + " " + " VALUES (" + "null,\'" + sqlBody + "\')"
        connection.query(sql, (err,result) => {
          res.json(result);
        })
        connection.release();
   })
  },
  changeTable(req, res, next) {
    pool.getConnection((err,connection) => {
        let tableName = req.query.tableName;
        let addList = req.query.changeList;
        let id = req.query.id;
        var sqlBody = addList.join('\',\'');
        var sqldelete = "DELETE FROM" + " " + tableName + " " + "WHERE id =" + id
        connection.query(sqldelete, (err,result) => {})
        var sql = "INSERT INTO " + " " + tableName + " " + " VALUES (" + "\'" + sqlBody + "\')"
        connection.query(sql, (err,result) => {
          res.json(result);
        })
        connection.release();
   })
  },
  addMaster(req, res, next) {
    pool.getConnection((err,connection) => {
        let id = req.query.id;
        let name = req.query.name;
        let id_number = req.query.id_number;
        let work_unit = req.query.work_unit;
        let resume_state = req.query.resume_state;
        let start_time = req.query.start_time;
        let end_time = req.query.end_time;
        let subsidy_state = req.query.subsidy_state;
        let remark = req.query.remark;
        var sqlBody = '\'' + id + '\',\'' + name + '\',\'' + id_number + '\',\'' + work_unit + '\',' + resume_state + ',\'' + start_time + '\',\'' + end_time + '\',' + subsidy_state + ',\'' +remark + '\',';
        var sql = "INSERT INTO " + " " + "tb_master" + " " + " VALUES (" + sqlBody + "null)"
        connection.query(sql, (err,result) => {
          res.json(result);
        })
        connection.release();
   })
  },
  searchUser(req, res, next) {
    pool.getConnection((err,connection) => {
        let id = req.query.id;
        let name = req.query.name;
        let time = req.query.time;
        if ( id == '') {
          var sql = "SELECT * FROM tb_master WHERE name = " + name;
        }
        if( name == '') {
          var sql = "SELECT * FROM tb_master WHERE id = " + id;
        }
        connection.query(sql, (err,result) => {
          res.json(result);
        })
        connection.release();
   })
  },
  searchAllUser(req, res, next) {
    pool.getConnection((err,connection) => {
      var sql = "SELECT * FROM tb_master"
      connection.query(sql, (err,result) => {
        res.json(result);
      })
      connection.release();
    })
  }
}
