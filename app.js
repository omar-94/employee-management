const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const runEmployeeManager = () => {
  inquirer
    .prompt({
      name: 'main',
      type: 'list',
      message: 'What do you want to do?',
      choices: ['View', 'Add', 'Update', 'Delete', 'End']
    })
    .then((chosen) => {
      switch(chosen.main) {
        case 'View':
          viewFunction()
        break;
        case 'Add':
          addFunction()
        break;
        case 'Update':
          updateFunction()
        break;
        case 'Delete':
          deleteFunction()
        break;
    
        default:
          console.log('Goodbye')
          connection.end();
      }
    })
}

const viewFunction = () => {
  inquirer
    .prompt({
      name: 'view',
      type: 'list',
      message: 'What data do you want to view?',
      choices: ['Department', 'Role', 'Employee', 'Back']
    })
    .then((chosen) => {
      switch(chosen.view) {
        case 'Department':
          viewDepartment()
        break;
        case 'Role':
          viewRole()
        break;
        case 'Employee':
          viewEmployee()
        break;

        default:
          runEmployeeManager()
      }
    })
}

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    runEmployeeManager();
  })
}

const viewRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    runEmployeeManager();
  })
}
const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    runEmployeeManager();
  })
}

const addFunction = () => {
  inquirer
    .prompt({
      name: 'view',
      type: 'list',
      message: 'What data do you want to add?',
      choices: ['Department', 'Role', 'Employee', 'Back']
    })
    .then((chosen) => {
      switch(chosen.view) {
        case 'Department':
          addDepartment()
        break;
        case 'Role':
          addRole()
        break;
        case 'Employee':
          addEmployee()
        break;

        default:
          runEmployeeManager()
      }
    })
}

const addDepartment = () => {
  inquirer
    .prompt(
      {
        name: 'name',
        type: 'input',
        message: "What department would you like to add?"
      })
    .then((answer) => {
      const query = 'INSERT INTO department SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log(`${answer.name} was added to departments.`);
        runEmployeeManager();
      })  
    })
}

const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "What is the new role title?"
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the new role salary?"
      },
      {
        name: 'department_id',
        type: 'input',
        message: "What is the new role's department ID?"
      }
    ])
    .then((answer) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log(`${answer.title} was added to roles.`); 
        runEmployeeManager(); 
      })
    })
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "What is the employee's first name?"
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's role ID?"
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager ID?"
      }
    ])
    .then((answer) => {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log(`${answer.first_name} was added to employees.`);
        runEmployeeManager();
      })
    })
}

connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome to Employee Manager App");
  runEmployeeManager();
})

