import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [constraints, setConstraints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedData = localStorage.getItem('timetable_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setDepartments(data.departments || []);
      setCourses(data.courses || []);
      setBatches(data.batches || []);
      setSubjects(data.subjects || []);
      setFaculties(data.faculties || []);
      setRooms(data.rooms || []);
      setTimetables(data.timetables || []);
      setConstraints(data.constraints || []);
    } else {
      initializeDefaultData();
    }
  };

  const saveData = () => {
    const data = {
      departments,
      courses,
      batches,
      subjects,
      faculties,
      rooms,
      timetables,
      constraints
    };
    localStorage.setItem('timetable_data', JSON.stringify(data));
  };

  const initializeDefaultData = () => {
    const defaultDepartments = [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Electronics' },
      { id: 3, name: 'Mechanical' }
    ];

    const defaultRooms = [
      { id: 1, name: 'Room 101', capacity: 60, type: 'classroom', features: ['projector'] },
      { id: 2, name: 'Lab A', capacity: 30, type: 'lab', features: ['computers'] },
      { id: 3, name: 'Room 201', capacity: 80, type: 'classroom', features: ['projector', 'audio'] }
    ];

    const defaultFaculties = [
      { id: 1, name: 'Dr. Smith', email: 'smith@college.edu', dept_id: 1, max_load_per_day: 6, max_load_per_week: 20 },
      { id: 2, name: 'Prof. Johnson', email: 'johnson@college.edu', dept_id: 1, max_load_per_day: 5, max_load_per_week: 18 },
      { id: 3, name: 'Dr. Brown', email: 'brown@college.edu', dept_id: 2, max_load_per_day: 6, max_load_per_week: 22 }
    ];

    setDepartments(defaultDepartments);
    setRooms(defaultRooms);
    setFaculties(defaultFaculties);
  };

  useEffect(() => {
    saveData();
  }, [departments, courses, batches, subjects, faculties, rooms, timetables, constraints]);

  const value = {
    departments, setDepartments,
    courses, setCourses,
    batches, setBatches,
    subjects, setSubjects,
    faculties, setFaculties,
    rooms, setRooms,
    timetables, setTimetables,
    constraints, setConstraints,
    saveData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
