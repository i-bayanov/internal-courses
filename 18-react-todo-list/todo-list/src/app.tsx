import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './header/header';
import Main from './main/main';
import { RootState } from './store';

export default function App() {
  const todos = useSelector((state: RootState) => state);

  return (
    <section className="todoapp">
      <Header />
      {!!todos.length && <Routes>
        <Route path='/' element={<Main filter={0}/>}/>
        <Route path='/active' element={<Main filter={1}/>}/>
        <Route path='/completed' element={<Main filter={2}/>}/>
      </Routes>}
    </section>
  );
}
