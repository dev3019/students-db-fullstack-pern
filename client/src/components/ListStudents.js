import React, {Fragment, useEffect, useState } from 'react'

const ListStudents = ()=>{
  
  const [students, setStudents] = useState([])
  const [name, setName] = useState("Name")
  const [email, setEmail] = useState("Email")
  const [age, setAge] = useState("24")
  const [dob, setDOB] = useState("24 Jan,1996")

  const editStudent = async(id) => {
    try {
      const body = {name, email, age, dob}
      const editFetch = await fetch( `http://localhost:5020/api/v1/students/${id}`,{
        method:"PUT",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
      }).then((response)=>response.json()).then(async(responseJSON)=>{
        // console.log(responseJSON)
        setStudents(students.filter(student => student.id!== id))
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteStudent = async(id) =>{
     try {
      const deleteFetch = await fetch(`http://localhost:5020/api/v1/students/${id}`,{
        method: "DELETE"
      }).then((response)=>response.json()).then(async(responseJSON)=>{
        // console.log(responseJSON)
        setStudents(students.filter(student => student.id!== id))
      })
     } catch (error) {
      console.log(error.message)
      
     }
  }
  const getStudents = async() => {
    try {
      let studentDB 
      const studentDBFetch = await fetch("http://localhost:5020/api/v1/students/getList")
        .then((response) => response.json())
        .then(async(responseJSON) => {
          studentDB = responseJSON
        })
      setStudents(studentDB)
      console.log(studentDB)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getStudents()
  },[])

  // console.log(students)

  return(
    <Fragment>
      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th>Student</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>Edit</td>
              <td><button className='btn btn-danger' onClick={() => deleteStudent(student.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
        </table>
    </Fragment>
  )
}

export default ListStudents