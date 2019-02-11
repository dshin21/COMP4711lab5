let http = require("http");
let mysql = require("mysql");
let questionSet = require("./questions");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

let port = process.env.PORT || 8080;

questionSet = questionSet.questionSet;
const answersKeys = [2, 0, 3, 2, 1];
let questions = [];
let answers = [];

for (i = 0; i < 5; i++) {
  questions[i] = questionSet[i].question;
  answers[i] = questionSet[i].answers;
}

function main() {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql_create_db =
      "CREATE DATABASE IF NOT EXISTS mydb (question VARCHAR(255), answer VARCHAR(255), correct VARCHAR(255))";
    con.query(sql_create_db, function(err, res) {
      console.log("Database created");
    });

    var sql_create_table =
      "CREATE TABLE IF NOT EXISTS questions (question VARCHAR(255), answer VARCHAR(255), correct VARCHAR(255))";
    con.query(sql_create_table, function(err, res) {
      console.log("Table created");
    });

    for (i = 0; i < 5; i++) {
      question = JSON.stringify(questions[i]);
      answer = JSON.stringify(answers[i]);
      answers_key = JSON.stringify(answersKeys[i]);

      var sql_insert =
        "INSERT INTO questions (question, answer, correct) VALUES ('" +
        question +
        "','" +
        answer +
        "','" +
        answers_key +
        "')";

      con.query(sql_insert, function(err, result) {
        if (err) throw err;
        console.log("Question inserted");
      });
    }
  });
}
main();
