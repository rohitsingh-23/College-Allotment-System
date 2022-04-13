import { useState } from "react";
import "./add_student_dialogbox.css"
import {v4 as uuid} from "uuid"
import axios from "axios";

function AddStudentBox({handleShow, data, addData }) {
  const [userDetails, setUserDetails] = useState({
    id: uuid(),
    student_name: "",
    rank: "",
    college_preference1: "",
    college_preference2: "",
    college_preference3: ""
  })
  function handleUpdate(e) {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }
  function handlePost() {
    axios.post(
      "https://mockserver-recordbook.herokuapp.com/students",
      userDetails
    );
    handleClear()
    addData([...data, userDetails])
    alert("Student is added")
  }
  function handleClear() {
    setUserDetails({
      id: uuid(),
      student_name: "",
      rank: "",
      college_preference1: "",
      college_preference2: "",
      college_preference3: ""
    })
  }
    return (
      <div className="container">
        <div className="head">
          <p>Add row</p>
        </div>
        <div className="input_form">
          <div>
            <div>Student Name</div>
            <input
              type="text"
              name="student_name"
              value={userDetails.student_name}
              onChange={(e) => {
                handleUpdate(e);
              }}
            />
          </div>
          <div>
            <div>Rank</div>
            <input
              type="text"
              placeholder="Enter Number"
              name="rank"
              value={userDetails.rank}
              onChange={(e) => {
                handleUpdate(e);
              }}
            />
          </div>
          <div>
            <div>College Preference 1</div>
            <input
              // type="text"
              list="datalist"
              name="college_preference1"
              value={userDetails.college_preference1}
              onChange={(e) => {
                handleUpdate(e);
              }}
            />
            <datalist id="datalist">
              <option value="IIT Kanpur"></option>
              <option value="IIT Roorkee"></option>
              <option value="IIT Hyderabad"></option>
              <option value="IIT Bombay"></option>
              <option value="IIT Madras"></option>
              <option value="IIM Ahmedabad"></option>
            </datalist>
          </div>
          <div>
            <div>College Preference 2</div>
            <input
              // type="text"
              list="datalist"
              name="college_preference2"
              value={userDetails.college_preference2}
              onChange={(e) => {
                handleUpdate(e);
              }}
            />
          </div>
          <div>
            <div>College Preference 3</div>
            <input
              list="datalist"
              name="college_preference3"
              value={userDetails.college_preference3}
              onChange={(e) => {
                handleUpdate(e);
              }}
            />
          </div>
        </div>
        <div className="add_button_div">
          <button
            onClick={() => {
              handleClear();
              handleShow();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handlePost();
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
}

export {AddStudentBox}