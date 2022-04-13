import axios from "axios";
import { useEffect, useState } from "react";
import { AddStudentBox } from "./add_student_dialogbox";
import { AllotmentRow } from "./allotment_row";
import "./allotment.css"
import { Result } from "./result";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  MdOutlineArrowDropDownCircle,
  MdFormatAlignLeft,
} from "react-icons/md";
function AllotmentTable() {
    let [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [resultShow, setResultShow] = useState(false)
    useEffect(() => {
        axios
          .get("https://mockserver-recordbook.herokuapp.com/students")
          .then((response) => {
            setData(response.data);
          });
        
    }, [])
    function addData(item) {
        setData(item)
    }
    function handleShow() {
        setShow(!show)
    }
    function handleResultShow() {
        setResultShow(!resultShow)
    }
    return (
      <div className="main_container">
        <table>
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
              <th className="col_title">
                <MdOutlineArrowDropDownCircle className="circle" />
                &nbsp; College Preference 2
                <MdKeyboardArrowDown className="right" />
              </th>
              <th className="col_title">
                <MdOutlineArrowDropDownCircle className="circle" />
                &nbsp; College Preference 3
                <MdKeyboardArrowDown className="right" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => {
              return (
                <AllotmentRow
                  key={e.id}
                  data={data}
                  addData={addData}
                  {...e}
                />
              );
            })}
          </tbody>
        </table>

        <div className="add_get">
          <button className="add_student" onClick={handleShow}>
            {show ? "Cancel" : "Add New Student"}
          </button>
          <button className="delete_student" onClick={handleResultShow}>
            {resultShow ? "Hide Result" : "Show Result"}
          </button>
        </div>

        <div className="add_student_div">
          {show ? (
            <AddStudentBox
              data={data}
              addData={addData}
              handleShow={handleShow}
            />
          ) : null}
        </div>
        <div>{resultShow ? <Result /> : null}</div>
      </div>
    );
}
export {AllotmentTable}