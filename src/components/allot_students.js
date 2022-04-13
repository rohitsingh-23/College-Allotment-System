function allot(stu, col) {
    console.log(stu, col)
  let students = [...stu]
    const colleges = [...col]
    
    students = students.sort((a, b) => {
        return a.rank-b.rank
    });

  // console.log("Hello")
  let allotedList = [];
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let pref1 = true
        let pref2 = true;
        let pref3 = true;
        if (pref1) {
            for (let j = 0; j < colleges.length; j++) {
              let college = colleges[j];
              if (
                student.college_preference1 == college.college_name &&
                college.noOfSeats > 0
              ) {
                allotedList.push({
                  id: student.id,
                  rank: student.rank,
                  student_name: student.student_name,
                  college_preference1: student.college_preference1,
                });
                colleges[j].noOfSeats = colleges[j].noOfSeats - 1;
                  pref1 = false;
                  pref2 = false;
                  pref3 = false;
                break;
              }
            }
        }
        
        if (pref2) {
            for (let j = 0; j < colleges.length; j++) {
              let college = colleges[j];
              if (
                student.college_preference2 == college.college_name &&
                college.noOfSeats > 0
              ) {
                allotedList.push({
                  id: student.id,
                  rank: student.rank,
                  student_name: student.student_name,
                  college_preference1: student.college_preference2,
                });
                colleges[j].noOfSeats = colleges[j].noOfSeats - 1;
                 pref1 = false;
                 pref2 = false;
                 pref3 = false;
                break;
              }
            }
        }
        if (pref3) {
          for (let j = 0; j < colleges.length; j++) {
            let college = colleges[j];
            if (
              student.college_preference3 == college.college_name &&
              college.noOfSeats > 0
            ) {
              allotedList.push({
                id: student.id,
                rank: student.rank,
                student_name: student.student_name,
                college_preference1: student.college_preference3,
              });
              colleges[j].noOfSeats = colleges[j].noOfSeats - 1;
              pref1 = false;
              pref2 = false;
              pref3 = false;
              break;
            }
          }
        }
    }
  return allotedList;
}

export {allot}