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

const runEmpMan = () => {
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
          viewFunction();
        break;
        case 'Add':
          addFunction();
        break;
        case 'Update':
          updateFunction();
        break;
        case 'Delete':
          deleteFunction();
        break;
    
        default:
          console.log('Goodbye')
          connection.end();
      }
    })
}






connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome to Employee Manager App");
  runEmpMan();
})

