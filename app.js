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





connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome to Employee Manager App");
  runEmployeeManager();
})

