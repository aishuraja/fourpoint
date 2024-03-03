import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  const [semesters, setSemesters] = useState([]);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    const API_URL = "http://localhost:8080/api";
    const res = axios.get(API_URL + "/semester/all", {
      headers: {
        "x-access-token": user.accessToken,
      },})
    .then(res => {
      console.log(res.data);
      setSemesters(res.data);
      return res.data;
    });

  }, [])

   const parseCourses = (coursesString) => {
    try {
      return JSON.parse(coursesString);
    } catch (error) {
      console.error('Error parsing courses string:', error);
      return [];
    }
  };

  const getLetterGrade = (points) => {
    // Grade ranges with corresponding letter grades (in descending order)
    const gradeRanges = [
      { points: 4.0, grade: 'A' },
      { points: 3.7, grade: 'A-' },
      { points: 3.3, grade: 'B+' },
      { points: 3.0, grade: 'B' },
      { points: 2.7, grade: 'B-' },
      { points: 2.3, grade: 'C+' },
      { points: 2.0, grade: 'C' },
      { points: 1.7, grade: 'C-' },
      { points: 1.3, grade: 'D+' },
      { points: 1.0, grade: 'D' },
      { points: 0.0, grade: 'F' },
    ];
  
    // Iterate through grade ranges in descending order
    for (const range of gradeRanges) {
      if (points >= range.points) {
        return range.grade;
      }
    }
  
    // If no matching range is found, return 'Invalid'
    return 'Invalid';
  };

  const calculateSemesterStats = (semester) => {
    const courses = parseCourses(semester.courses);
    const totalCourses = courses.length;
    const totalCredits = courses.reduce((acc, course) => acc + Number(course.credits), 0);
    return { totalCourses, totalCredits };
  };

  const calculateGPA = () => {
      if (!semesters.length) return 0.00; // Handle empty data case
      const totalGPA = semesters.reduce((acc, semester) => acc + parseFloat(semester.semgpi), 0.00);
      return totalGPA / semesters.length;
  }
  const handleDelecteSem = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const API_URL = "http://localhost:8080/api";
    const res = axios.delete(API_URL + `/semester/delete/${id}`, {
      headers: {
        "x-access-token": user.accessToken,
      },})
    .then(res => {
      setSemesters(semesters.filter((item) => item.id !== id));
      return res.data;
    });
  }

  return (
    <div className="flex">

    <Sidebar />
    <div className="flex flex-col justify-between">
      <div className="mt-10 items-center">
        <h1 className="font-bold text-xl mb-8">Dashboard</h1>
      </div>
      <div class="mx-20 flex items-center justify-between flex-row flex-wrap space-y-4 py-4 bg-white">
        <Link to="/new">
          <button
            type="button"
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-gray-800"
          >
            add
          </button>
        </Link>
        <div className="flex justify-between">
          <span className="text-2xl">GPA:</span>
          <span className="ml-2 font-semibold text-3xl">{calculateGPA().toFixed(2)}</span>
        </div>
      </div>
      <main className="mx-20 justify-center items-center">
        <div className="shadow-lg rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="text-xs text-gray-700 uppercase justify-between">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Semester
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Grade Points
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Credits
                </th>

                <th scope="col" className="px-6 py-3">
                  Total No of Courses
                </th>
                <th scope="col" className="px-6 py-3">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
            {semesters.map((sem) => (
              <tr className="bg-white border-b text-black whitespace-nowrap" key={sem.id}>
                <th scope="row" className="px-6 py-4">
                  {sem.name}
                </th>
                <td className="px-6 py-4">{sem.semgpi}</td>
                <td className="px-6 py-4">{calculateSemesterStats(sem).totalCourses}</td>
                <td className="px-6 py-4">{calculateSemesterStats(sem).totalCredits}</td>
                <td className="px-6 py-4">{getLetterGrade(sem.semgpi)}</td>
                <td className="px-2 py-4">
                  <button href="/edit" className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </button>
                </td>
                <td className="px-2 py-4">
                  <button onClick={(id)=>{handleDelecteSem(sem.id)}}>
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
        </div>
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
