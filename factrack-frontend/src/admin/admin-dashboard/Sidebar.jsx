import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Package,
  BarChart,
  Settings as SettingsIcon,
} from 'lucide-react';

import banner from './Factrack-banner.png';
import icon from './Factrack-logo.png';

const Sidebar = () => {
  const navLinks = [
    { to: '/admin/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} />, exact: true },
    { to: '/admin/dashboard/managers', label: 'Managers', icon: <Users size={20} /> },
    { to: '/admin/dashboard/employees', label: 'Employees', icon: <UserCheck size={20} /> },
    { to: '/admin/dashboard/products', label: 'Products', icon: <Package size={20} /> },
    { to: '/admin/dashboard/reports', label: 'Reports', icon: <BarChart size={20} /> },
    { to: '/admin/dashboard/settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ];

  const linkBase =
    'flex items-center gap-3 px-4 py-2 rounded-lg relative group transition-all duration-200';
  const activeStyle = 'bg-teal-100 text-black font-bold shadow';
  const inactiveStyle = 'text-white hover:bg-teal-200 hover:text-black hover:font-bold';

  return (
    <aside className="bg-teal-500 shadow-md border-r  flex flex-col w-64 max-[800px]:w-20 transition-all duration-300">
      <div className="p-4 border-b flex items-center justify-center">
        <img src={banner} alt="Banner" className="w-full h-auto rounded max-[800px]:hidden" />
        <img src={icon} alt="Icon" className="hidden max-[800px]:block w-10 h-10 rounded" />
      </div>

      <nav className="flex-1 p-4 space-y-2 font-medium max-[800px]:p-2 max-[800px]:space-y-1 text-sm md:text-base lg:text-[15px] xl:text-[16px]">
        {navLinks.map(({ to, label, icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle} max-[800px]:justify-center`
            }
          >
            {icon}
            <span className="max-[800px]:hidden">{label}</span>

            {/* Tooltip for collapsed sidebar */}
            <span className="absolute left-full ml-2 hidden max-[800px]:group-hover:block whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow z-50">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>      
    </aside>
  );
};

export default Sidebar;
