import React from 'react';

function About() {
  return (
    <>
      <div className='h-[calc(100vh-5rem)] bg-sky-500 w-full'>
        <div className="p-32">
          <h1 className='text-white text-6xl font-bold mb-7'>About Us</h1>
          <p className='text-2xl text-white'>
          Our to-do app is designed to help you streamline your daily tasks and boost your productivity. Whether you're managing personal errands, work projects, or collaborative tasks, our app provides the tools you need to stay organized and efficient.
          Our mission is to empower individuals and teams to achieve their goals by providing a simple, intuitive, and powerful task management solution.
          </p>
          <p className='text-2xl text-white'>
          Founded by a group of productivity enthusiasts, our journey began with a simple idea: to create a task management tool that’s both powerful and easy to use. We understand the challenges of juggling multiple responsibilities, and our app is built to help you overcome them.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
