import React from 'react';
import Table from './CourseTable';
import List from './CourseChange';
import styles from './css/Course.module.css'

const Course = () => {
  return (
    <div className={styles.appContainer}>
      <Table />
      <List />
    </div>
  );
};

export default Course;
