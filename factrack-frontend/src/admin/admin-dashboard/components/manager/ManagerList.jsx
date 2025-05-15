import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagers, deleteManager, updateManagerAttendance } from '../../../redux/adminManagerSlice';
import UpdateManager from './UpdateManager';
import ManagerAttendance from './ManagerAttendance';

const ManagersList = () => {
  const dispatch = useDispatch();
  const managers = useSelector(state => state.adminManager.list || []);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedUpdateManager, setSelectedUpdateManager] = useState(null);

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  const handleDelete = (manager) => {
    if (window.confirm(`Are you sure you want to delete manager: ${manager.name}?`)) {
      dispatch(deleteManager(manager._id))
        .unwrap()
        .then(() => {
          alert('Manager deleted successfully!');
          dispatch(fetchManagers());
        })
        .catch((error) => {
          console.error('Error deleting manager:', error);
          alert('Failed to delete manager.');
        });
    }
  };

  const handleUpdate = (manager) => {
    setSelectedUpdateManager(manager);
    setShowPopup(true);
  };

  const handleClose = () => {
    setSelectedManager(null);
    setShowPopup(false);
  };


  const handleAttendance = (manager) => {
    if (window.confirm(`Attendance of ${manager.name}`)) {
      setSelectedManager(manager);
      setShowPopup(true);    
    } else {
      console.log("Attendance cancelled.");
    }
  };

  return (
    <motion.div className="relative bg-white p-4 rounded-xl shadow-md mt-6">
      {/* Managers list gets dimmed when popup is active */}
      <div className={`${showPopup ? 'opacity-30 blur-sm pointer-events-none' : ''} transition-all duration-300`}>
        <motion.h2 className="text-xl font-semibold mb-4 text-teal-700">
          Managers List
        </motion.h2>

        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Department</th>
              <th className="py-2">ID no</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers
              .filter(manager => !manager.isDeleted)
              .map((manager, index) => (
                <motion.tr
                  key={manager._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="border-t"
                >
                  <td className="py-2">{manager.name}</td>
                  <td className="py-2">{manager.email}</td>
                  <td className="py-2">{manager.phone}</td>
                  <td className="py-2">{manager.dept}</td>
                  <td className="py-2">{manager.managerID}</td>
                  <td className="py-2 space-x-2">
                    <button
                      onClick={() => handleUpdate(manager)}
                      className="text-blue-500 hover:cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(manager)}
                      className="text-red-500 hover:cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleAttendance(manager)}
                      className="text-green-500 hover:cursor-pointer"
                    >
                      <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/attendance-mark.png" alt="attendance-mark" />
                    </button>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Popup overlays on top */}
      {showPopup && selectedUpdateManager && (
        <UpdateManager
          managerData={selectedUpdateManager}
          onClose={handleClose}
          onUpdated={() => dispatch(fetchManagers())}
        />
      )}

      {showPopup && selectedManager && (
        <ManagerAttendance
          managerData={selectedManager}
          onClose={handleClose}
          onUpdated={() => dispatch(updateManagerAttendance())}
        />
      )}
    </motion.div>
  );
};

export default ManagersList;
