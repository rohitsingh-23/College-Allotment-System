import axios from "axios";
import { useEffect, useState } from "react"
import "./result.css"
import { allot } from "./allot_students";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  MdOutlineArrowDropDownCircle,
  MdFormatAlignLeft,
} from "react-icons/md";

function Result() {
  let [list, setList] = useState([]);
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    axios.get("https://mockserver-recordbook.herokuapp.com/collegelist").then((response) => {
      setList(response.data);
    });
      getData();
      
  }, []);

  /* -------------------------- Allotment ----------------------------- */

  function getData() {
    axios
      .get("https://mockserver-recordbook.herokuapp.com/students")
      .then((response) => {
        setStudents(response.data);
        let temp = response.data;
        axios
          .get("https://mockserver-recordbook.herokuapp.com/collegelist")
          .then((response) => {
            setColleges(response.data);
            setList(allot(temp, response.data));
            //   console.log("dfndahfnb[uiodasf eoiurfhveartbeup",allot(temp, response.data));
          });
      });
  }

  function allotStudents() {
    let student = list.sort((a, b) => {
      return a.rank < b.rank ? -1 : 1;
    });
    console.log("sorted", student, list);
    console.log("sorted after", student, list);
  }

  /* -------------------------- Allotment ----------------------------- */

  function colorOption(name) {
    if (name == "IIT Kanpur") {
      return "clg iit_kanpur";
    } else if (name == "IIT Madras") {
      return "clg iit_madras";
    } else if (name == "IIT Bombay") {
      return "clg iit_bombay";
    } else if (name == "IIT Roorkee") {
      return "clg iit_roorkee";
    } else if (name == "IIT Hyderabad") {
      return "clg iit_hyderabad";
    } else if (name == "IIM Ahmedabad") {
      return "clg iim_ahmedabad";
    }
  }

  return (
    <div className="result_container">
      <h2 className="result_div_title">Results</h2>
      <table className="result_table">
        <thead>
          <tr className="tr">
              <th className="col_title">
                <MdFormatAlignLeft className="circle" /> &nbsp;Student Name
              </th>
              <th className="col_title">
                <span>#</span> Rank
              </th>
              <th className="col_title">
                <MdOutlineArrowDropDownCircle className="circle" />
                &nbsp; College Preference 1
                <MdKeyboardArrowDown className="right" />
            </th>
            </tr>
        </thead>
        <tbody>
          {list.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.student_name}</td>
                <td>{e.rank}</td>
                <td className={colorOption(e.college_preference1)}>
                  <span>{e.college_preference1} </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export {Result}