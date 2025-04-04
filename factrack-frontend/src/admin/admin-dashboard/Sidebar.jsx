import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkStyle = 'p-2 rounded hover:bg-teal-100';
    const activeStyle = 'bg-teal-200 font-semibold';

    return (
        <aside className="w-64 bg-white shadow-lg">
            <div className="p-4 text-2xl font-bold text-teal-600 border-b">Admin Panel</div>
            <nav className="flex flex-col p-4 space-y-2 text-gray-700">
                <NavLink to="/admin/dashboard" end className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Overview</NavLink>
                <NavLink to="/admin/dashboard/managers" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Managers</NavLink>
                <NavLink to="/admin/dashboard/employees" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Employees</NavLink>
                <NavLink to="/admin/dashboard/products" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Products</NavLink>
                <NavLink to="/admin/dashboard/reports" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Reports</NavLink>
                <NavLink to="/admin/dashboard/settings" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Settings</NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
