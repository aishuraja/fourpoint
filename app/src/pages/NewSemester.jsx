import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import { getGradePoints } from "../lib/gradToPointConverter";

import apiClient from '../lib/http-common';

const NewSemester = () => {
  const [gpa, setGpa] = useState(0.00);
  const [userName, setUserName] = useState("");
  const [semName, setSemName] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    setUserName(user.full_name)
  },[userName])

  const calculateGPA = () => {
    let totalGradePoints = 0.00;
    let totalCredits = 0.00;

    courses.forEach((course) => {
      let gradePoint = getGradePoints(course.grade);
      totalGradePoints += gradePoint * parseFloat(course.credits);
      totalCredits += parseFloat(course.credits);
    });
    setGpa((totalGradePoints / totalCredits).toFixed(2));
    return totalGradePoints / totalCredits;
  };

  const addCourse = (event) => {
    event.preventDefault();
    const newCourse = {
      name: event.target.elements.name.value,
      grade: event.target.elements.grade.value,
      credits: event.target.elements.credits.value,
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (index) => {
    setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
  };

  const saveSemester = async () => {
    const post_data = {
      name: semName,
      semgpi: gpa.toString(),
      courses: JSON.stringify(courses)
    }

    try {
      const res = await apiClient.post("/semester/create", post_data, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setCourses([]);
      setSemName("");
      setGpa(0.00.toFixed(2))
    } catch (err) {
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="mt-10 mx-auto justify-center items-center">
        <div className="container px-4 py-6 rounded-lg shadow">
          <h1 className="font-bold text-3xl text-center mb-8">
            Semester Record
          </h1>

          <div className="flex flex-col p-4 mx-20">
            {/* Student and Semester Details */}
            <div className="flex justify-start items-center mb-4 gap-2">
              <h2 className="font-semibold">Student:</h2>
              <p className="text-base">{userName}</p>
            </div>
            <div className="flex justify-start items-center mb-4 gap-2">
              <h2 className="font-semibold">Semester:</h2>
              <input
                type="text"
                id="Semester"
                name="semester"
                className="border p-1 rounded-md"
                required
                onChange={(e) => {
                  setSemName(e.target.value);
                }}
              />
            </div>

            {/* Showing course details */}
            <table className="text-left mx-10 justify-between items-center">
              <thead>
                <tr>
                  <th className="px-1 py-2">Course</th>
                  <th className="px-1 py-2">Grade</th>
                  <th className="px-1 py-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="px-1 py-2">{course.name}</td>
                    <td className="px-1 py-2">{course.grade}</td>
                    <td className="px-1 py-2">
                      {course.grade === "A" && 4.0}
                      {course.grade === "A-" && 3.7}
                      {course.grade === "B+" && 3.3}
                      {course.grade === "B" && 3.0}
                      {course.grade === "B-" && 2.7}
                      {course.grade === "C+" && 2.3}
                      {course.grade === "C" && 2.0}
                      {course.grade === "C-" && 1.7}
                      {course.grade === "D+" && 1.3}
                      {course.grade === "D" && 1.0}
                      {course.grade === "F" && 0.0}
                    </td>
                    <td className="px-1 py-2">
                      <button className="" onClick={(e) => removeCourse(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add couse form */}

            <form
              onSubmit={addCourse}
              className="flex flex-row justify-between items-center mt-10 mx-10 gap-2"
            >
              <div className="flex flex-col space-y-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="cs 50"
                  className="border p-1 rounded-md text-sm"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <select
                  id="grade"
                  name="grade"
                  className="border p-1 rounded-md text-sm"
                  required
                >
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1">
                <input
                  type="text"
                  id="credits"
                  name="credits"
                  placeholder="4"
                  className="border p-1 rounded-md text-sm"
                  required
                />
              </div>
              <button type="submit" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
          {/* Footer */}
          <div className="mt-10 flex justify-between items-center mx-20">
            <div className="flex flex-row justify-start items-center">
              <p className="text-right mr-4 text-xl font-semibold">GPA: </p>
              <p className="text-left text-3xl font-bold">{gpa}</p>
            </div>
            <div className="justify-between">
              <button
                type="button"
                onClick={calculateGPA}
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-gray-800 mr-4"
              >
                Calculate GPI
              </button>
              <button
                type="button"
                onClick={saveSemester}
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSemester;
