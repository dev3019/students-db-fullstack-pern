const e = require("express");
const pool = require("../../database/db");
const queries = require("../../queries/v1/students");

const getStudents = (req, res) => {
  try {
    pool.query(queries.getStudents, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message.toString());
  }
};

const getStudentById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStudentByID, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message.toString());
  }
};

const addStudent = (req, res) => {
  try {
    const { name, email, age, dob } = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (error) throw error;
      if (results.rows.length) {
        res.status(200).send("User exists");
      } else {
        pool.query(
          queries.addStudent,
          [name, email, age, dob],
          (error, results) => {
            if (error) throw error;
            res.status(201).send(`Data for ${name} added.`);
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message.toString());
  }
};

const deleteStudentById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getStudentByID, [id], (error, results) => {
      if (error) throw error;
      console.log(results.rows.length);
      if (!results.rows.length) {
        return res.status(400).send("Student not found");
      } else {
        pool.query(queries.deleteStudentByID, [id], (error, results) => {
          if (error) throw error;
          return res.status(201).send(`Student with id: ${id} deleted.`);
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message.toString());
  }
};

const updateStudentById = (req, res) => {
  try {
    const id = req.params.id;
    const student = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      dob: req.body.dob,
    };

    pool.query(queries.getStudentByID, [id], (error, results) => {
      if (error) throw error;
      if (!results.rows.length) {
        return res.status(400).send("Student not found");
      } else {
        const newData = setData(student, results.rows[0]);
        pool.query(
          queries.updateStudentByID,
          [newData.name, newData.email, newData.age, newData.dob, id],
          (error, results) => {
            if (error) throw error;
            res
              .status(202)
              .send(`Student ${newData.name} details updated.`);
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message.toString());
  }
};

function setData(newData, oldData) {
  if (!newData.name) newData.name = oldData.name;
  if (!newData.email) newData.email = oldData.email;
  if (!newData.age) newData.age = oldData.age;
  if (!newData.dob) newData.dob = oldData.dob;
  return newData;
}

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentById,
};
