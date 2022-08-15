import React, {Fragment} from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import ListStudents from './components/ListStudents';


function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddStudent />
        <ListStudents />
      </div>
    </Fragment>
  );
}

export default App;
