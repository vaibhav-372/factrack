import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagers, deleteManager } from '../../../redux/adminSlice';
import UpdateManager from './UpdateManager';

const ManagersList = () => {
  const dispatch = useDispatch();
  const managers = useSelector(state => state.admin.list || []);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

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
    setSelectedManager(manager);
    setShowPopup(true);
  };

  const handleClose = () => {
    setSelectedManager(null);
    setShowPopup(false);
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
                      className="text-blue-500 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(manager)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Popup overlays on top */}
      {showPopup && selectedManager && (
        <UpdateManager
          managerData={selectedManager}
          onClose={handleClose}
          onUpdated={() => dispatch(fetchManagers())}
        />
      )}
    </motion.div>
  );
};

export default ManagersList;
