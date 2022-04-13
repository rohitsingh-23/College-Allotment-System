import { useState } from "react";
import "./allotment_row.css"
import {v4 as uuid} from "uuid"
import axios from "axios";

function AllotmentRow({
  college_preference1,
  college_preference2,
    college_preference3,
    rank,
  student_name,
  addData,
  id,
  data
}) {
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({
    id: id,
    student_name: student_name,
    rank: rank,
    college_preference1: college_preference1,
    college_preference2: college_preference2,
    college_preference3: college_preference3,
  });
    function colorOption(name) {
        if (name == "IIT Kanpur") {
          return "clg iit_kanpur";
        } else if (name == "IIT Madras") {
          return "clg iit_madras";
        } else if (name == "IIT Bombay") {
          return "clg iit_bombay";
        } else if (name == "IIT Roorkee" ) {
          return "clg iit_roorkee";
        } else if (name == "IIT Hyderabad") {
          return "clg iit_hyderabad";
        } else if (name == "IIM Ahmedabad") {
          return "clg iim_ahmedabad";
        }
    }
  
  function handleUpdate(e) {
    setUpdate({ ...update, [e.target.name]: e.target.value });
    // console.log(update.college_preference1, )
    }
  
  function handleEdit() {
    setEdit(!edit)
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      setEdit(!edit)
      axios.patch(
        `https://mockserver-recordbook.herokuapp.com/students/${id}`,
        update
      );
      data = data.map((e) => {
        if(e.id == update.id){
          return update
        } else {
          return e
        }
      })
      addData(data)
      alert("Updated successfully")
    }
  }

  function display() {
    if (edit) {
      return (
        <>
          <tr
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          >
            <td>
              <input
                type="text"
                name="student_name"
                value={update.student_name}
                onChange={(e) => {
                  handleUpdate(e);
                }}
              />
            </td>
            <td>
              <input
                type="number"
                name="rank"
                value={update.rank}
                onChange={(e) => {
                  handleUpdate(e);
                }}
              />
            </td>
            <td>
              <span>
                <input
                  list="datalist"
                  name="college_preference1"
                  value={update.college_preference1}
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
              </span>
            </td>
            <td>
              <span>
                <input
                  list="datalist"
                  name="college_preference2"
                  value={update.college_preference2}
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
              </span>
            </td>
            <td>
              <span>
                <input
                  list="datalist"
                  name="college_preference3"
                  value={update.college_preference3}
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
              </span>
            </td>
          </tr>
        </>
      );
    } else {
      return  <>
      <tr onClick={handleEdit}>
        <td>{student_name}</td>
        <td>{rank}</td>
        <td className={colorOption(college_preference1)}>
          <span>{college_preference1} </span>
        </td>
        <td className={colorOption(college_preference2)}>
          <span>{college_preference2}</span>
        </td>
        <td className={colorOption(college_preference3)}>
          <span>{college_preference3}</span>
        </td>
      </tr>
    </>
    }
  }
  return (
    <>
    {display()}
    </>
  )
}

export {AllotmentRow}