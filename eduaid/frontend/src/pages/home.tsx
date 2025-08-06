// import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to EduAid</h1>
      <p className="mb-6 text-center max-w-md">
        Decentralized Education Sponsorship on the Internet Computer Protocol. Sponsor a student and make a lasting impact.
      </p>
      <div className="flex space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
        <Link to="/login" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Login</Link>
      </div>
    </div>
  );
}
