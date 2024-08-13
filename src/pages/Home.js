import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import ViewData from './ViewData';

function Home() {
  const [showData, setShowData] = useState(false);

  const handleViewDataClick = () => {
    setShowData(true);
  };

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Company Search</div>
        <nav>
          <ul>
            <li>
              <button
                onClick={handleViewDataClick}
                className="block w-full px-4 py-2 hover:bg-gray-700 text-left"
              >
                View Data
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 hover:bg-gray-700 text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 overflow-auto bg-gray-100">
        {showData ? <ViewData /> : <p className="text-gray-600">Click "View Data" to see the company listings.</p>}
      </main>
    </div>
  );
}

export default Home;
