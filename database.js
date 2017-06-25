var mysql = require('promise-mysql');
var async = require('async');

var pool = mysql.createPool({
  host: "claremontmenu.com",
  user: "claremo7_klee",
  password: "Getoutofhere!369",
  database: "claremo7_claremontmenu",
  connectionLimit: 100
});

module.exports = {

    getDaily: function(school, meal) {
        return pool.getConnection().then(function(conn) {
            var sql = "SELECT * FROM daily WHERE school = ? AND meal = ?";
            return conn.query(sql, [school,meal]).then(function(rows) {
                if(rows.length != 0) {
                    var qMarks = "";
                    var foodNames = [school];
                    rows.forEach(function(item) {
                        foodNames.push(item.name);
                        qMarks += "?,";
                    });
                    qMarks = qMarks.substring(0, qMarks.length - 1);
                    var sql = "SELECT * FROM foods WHERE school = ? AND name IN (" + qMarks + ")";
                    return conn.query(sql, foodNames);
                } else {
                    return conn.query("SELECT * FROM daily WHERE school = 8");
                }
            })
        }).catch(function(err) {
            console.log(err);
            throw err;
        })
    },

    getReviews: function(foodID) {
        return pool.getConnection().then(function(conn) {
            var sql = "SELECT * FROM reviews WHERE food_id = ? AND NOT (review_text = '')";
            return conn.query(sql, [foodID]);
        })
    }
}