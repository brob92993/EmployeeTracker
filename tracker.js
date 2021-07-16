// add departments, roles, employees
// view departments, roles, employees
// update employee roles

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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





const addDepartment = () => {
    connection.query(
        'INSERT INTO department SET ?',
    {
        name: '',
    },  
    (err, res) => {if (err) throw err;
    console.table(`${res.affectedRows} Department Inserted!\n`);}
    )
};


const addRoles = () => {
    connection.query(
        'INSERT INTO role SET ?',
    {
        title: '',
        salary: '',
        department_id: '',
    },  
    (err, res) => {if (err) throw err;
    console.table(`${res.affectedRows} Role Inserted!\n`);}
    )
};

const addEmployee = () => {
    connection.query(
        'INSERT INTO employee SET ?',
    {
        first_name: '',
        last_name: '',
        role_id: '',
        manager_id: '',
    },  
    (err, res) => {if (err) throw err;
    console.table(`${res.affectedRows} employee Inserted!\n`);}
    )
};

