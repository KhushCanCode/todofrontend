import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className='h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center'>
        <h1 className='text-8xl font-bold text-gray-800 text-center'>Organize Your Life,</h1>
        <h1 className='text-8xl font-bold text-gray-800 mb-8 text-center'><span className='text-sky-500'>One Task</span> At A Time</h1>
        <p className='text-3xl text-gray-600 text-center'>Boost your productivity, quickly add and organize tasks with ease,  </p>
        <p className='text-3xl text-gray-600 mb-7 text-center'>stay focused and manage your daily tasks seamlessly.</p>
        <Link to='/todo' className="text-gray-100  bg-sky-500 text-3xl p-3 rounded-lg transition hover:bg-gray-300" href="#">Get Started </Link>
      </div>
    </>
  );
}

export default Home;
