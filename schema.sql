DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id),
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER
);

INSERT INTO department (name) VALUES ("Design"), ("Development"), ("Marketing"), ("Sales");
INSERT INTO role (title, salary, department_id) VALUES ("Graphic Designer", 40000, 1), ("Senior Graphic Designer", 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Web Developer", 45000, 2), ("Senior Web Developer", 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 40000, 3), ("Analyst", 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Sales", 40000, 4), ("Senior Sales", 75000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Omar", "Nava", 1, 1), ("Miguel", "Rodriguez", 2, 2), ("Brandon", "Smith", 3, NULL), ("Jessica", "Jones", 1, NULL);