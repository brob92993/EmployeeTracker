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


//starting prompt

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});
//================== Initial Prompt =======================//
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Emplyees By Deparments", 
              "Update Employee",
              "Add Employee?",
              "Add Role?",
              "Add Department?"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
              viewAllEmployees();
            break;
    
          case "View All Employee's By Roles?":
              viewAllRoles();
            break;
          case "View all Emplyees By Deparments":
              viewAllDepartments();
            break;
          
          case "Add Employee?":
                addEmployee();
              break;

          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role?":
                addRole();
              break;
      
            case "Add Department?":
                addDepartment();
              break;
    
            }
    })
}
//============= View All Employees ==========================//
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}
//============= View All Roles ==========================//
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
  })
}
//============= View All Employees By Departments ==========================//
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}


//Add Employee

function addEmployee() { 
      inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the employee's first name",
              name: "firstName"
            },
            {
              type: "input",
              message: "Enter the employee's last name",
              name: "lastName"
            },
            {
              type: "input",
              message: "Enter the employee's role ID",
              name: "addEmployRole"
            },
            {
              type: "input",
              message: "Enter the employee's manager ID",
              name: "addManager"
            }
          ])
          .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            const employRoleID = res.addEmployRole;
            const employManID = res.addManager;
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
            connection.query(query, function (err, res) {
              if (err) {
                throw err;
              }
          console.table(res);
          startPrompt()
      })

  })
}
// Update Employee 

  function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
     inquirer
     .prompt([
       {
         type: "input",
         message: "Enter the employee's ID you want to be updated",
         name: "updateEmploy"
       },
       {
         type: "input",
         message: "Enter the new role ID for that employee",
         name: "newRole"
       }
     ])
     .then(function (res) {
         const updateEmploy = res.updateEmploy;
         const newRole = res.newRole;
         const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
         connection.query(queryUpdate, function (err, res) {
           if (err) {
             throw err;
           }
           console.table(res);
            startPrompt()
        })
  
    });
  });

  }
//============= Add Employee Role ==========================//
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )

    });
  });
  }
//============= Add Department ==========================//
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
  }

