DROP DATABASE IF EXISTS  managerDB;

CREATE DATABASE managerDB;

USE managerDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("DevOps"), ("IT"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Developer", 30.00, 1 ),  ("Intermediate Developer", 40.00, 2), ("Senior Developer", 50.00, 3),  ("Computer Technicion", 45.00, 4), ("HR Assistant", 35.00, 5),
("HR Manager", 50.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John","Doe", 1, NULL), ("John","Smith", 1, NULL), ("Joe","Doe", 2, NULL), ("Jeff","Jefferson", 3, 1), ("John","Lewis", 4, NULL), ("Brad","Light", 4, 2), ("Jill","Smith", 5, NULL), ("Mike","Jones", 6, 3);