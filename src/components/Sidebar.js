// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-5">
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/view-data" className="text-lg font-semibold hover:text-gray-400">
                            View Data
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
