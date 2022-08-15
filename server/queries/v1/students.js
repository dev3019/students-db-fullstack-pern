const getStudents = "SELECT * FROM students";

const getStudentByID = "SELECT * FROM students WHERE id = $1";

const addStudent =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";

const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";

const deleteStudentByID = "DELETE FROM students WHERE id = $1";

const updateStudentByID =
  "UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5";

module.exports = {
  getStudents,
  getStudentByID,
  addStudent,
  checkEmailExists,
  deleteStudentByID,
  updateStudentByID,
};
