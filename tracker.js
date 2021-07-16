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








// functions for viewing

const viewDepartment = () => {
    connection.query ('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
      
    })
};

const viewRoles = () => {
    connection.query ('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
      
    })
};

const viewEmployees = () => {
    connection.query ('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        //connection.end();
    })
};


// functions for adding 

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

//update employee roles

const updateRole = () => {
    connection.query( 'UPDATE employee SET ? WHERE ?',
    
    [
        {
            role_id: ''
    },
    {
            last_name: '' //matching last name
    },
],
(err, res) => {if (err) throw err;
console.table(`${res.affectedRows} updated!\n`)})
};
