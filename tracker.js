// add departments, roles, employees
// view departments, roles, employees
// update employee roles

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  //port
  port: 3306,

  //username
  user: 'root',

  //password and database used
  password: 'berian27',
  database: 'managerDB',
});