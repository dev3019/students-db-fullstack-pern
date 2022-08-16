import React,{Fragment, useState} from "react";

const EditStudent = ({student}) => {

  const [name, setName] = useState(student.name)
  const [email, setEmail] = useState(student.email)
  const [age, setAge] = useState(student.age)
  const [dob, setDOB] = useState(student.dob)

  const editStudent = async(e) => {
    e.preventDefault()
    try {
      const body = {name, email, age, dob}
      const editFetch = await fetch( `http://localhost:5020/api/v1/students/${student.id}`,{
        method:"PUT",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
      }).then((response)=>response.json()).then(async(responseJSON)=>{
        // console.log(responseJSON)
        // setStudents(students.filter(student => student.id!== id))
      })
      window.location = "/"

    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${student.id}`}>
        Edit
      </button>
      {/* <!-- The Modal --> */}
      <div className="modal" id={`id${student.id}`} onClick={() =>{
        setName(student.name)
        setEmail(student.email)
        setAge(student.age)
        setDOB(student.dob)
      }}>
        <div className="modal-dialog" color="#000000">
          <div className="modal-content">
          
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Student</h4>
              <button type="button" className="btn-close" data-dismiss="modal" onClick={() =>{
                setName(student.name)
                setEmail(student.email)
                setAge(student.age)
                setDOB(student.dob)
              }}>&times;</button>
            </div>
            
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <div color="#000000">Name:</div>
              <input type={"text"} className="form-control" value={name} onChange={e=>{
                        setName(e.target.value)
                    }}/>
              <input type={"text"} className="form-control" value={email} onChange={e=>{
                        setEmail(e.target.value)
                    }}/>
              <input type={"text"} className="form-control" value={age} onChange={e=>{
                        setAge(e.target.value)
                    }}/>
              <input type={"text"} className="form-control" value={dob} onChange={e=>{
                        setDOB(e.target.value)
                    }}/>
            </div>
            
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => {
                editStudent(e)
                setName(student.name)
                setEmail(student.email)
                setAge(student.age)
                setDOB(student.dob)
                }}>Edit</button>
            </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditStudent