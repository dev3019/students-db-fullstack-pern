import React,{Fragment, useState} from "react";

const AddStudent = ()=>{
    
    const [name, setName] = useState("Name")
    const [email, setEmail] = useState("Email")
    const [age, setAge] = useState("24")
    const [dob, setDOB] = useState("24 Jan,1996")
    
    const onSubmitForm = async(e)=>{
        e.preventDefault()
        try {
            const body = {name,email,age,dob}
            const response = await fetch(`http://localhost:5020/api/v1/students/add`,{
                method: "POST",
                body: JSON.stringify(body),
                headers: {"Content-Type": "application/json"}
            })
            setName(name)
            setEmail(email)
            setAge(age)
            setDOB(dob)
            window.location = "/"
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <Fragment>
            <h1 className="text-center mt-5">Student List</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <input type="text-box" label="name" value={name} onChange={e=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <div>
                    <input type={"text"} label="email" value={email} onChange={e=>{
                        setEmail(e.target.value)
                    }}/>
                </div>
                <div>
                    <input type={"text"} label="age" value={age} onChange={e=>{
                        setAge(e.target.value)
                    }}/>
                </div>
                <div>
                    <input type={"text"} label="dob" value={dob} onChange={e=>{
                        setDOB(e.target.value)
                    }}/>
                </div>
                <button className="btn btn-success mt-3" onSubmit={onSubmitForm}>Submit</button>
            </form>
        </Fragment>
    )
}
export default AddStudent