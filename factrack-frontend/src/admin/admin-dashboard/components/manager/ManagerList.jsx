import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchManagers,
  // addManager,
  // deleteManager,
  // updateManager
} from '../../../redux/adminSlice';

const ManagersList = () => {
  const dispatch = useDispatch();
  const managers = useSelector(state => state.admin.list.data || []);  

  console.log(`managers list:-`, managers)

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);
   

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     dispatch(deleteManager(id));
  //   }
  // };

  // const handleUpdate = (manager) => {
  //   const updated = {
  //     ...manager,
  //     name: manager.name + ' (Updated)'
  //   };
  //   dispatch(updateManager(updated));
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-xl shadow-md mt-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold mb-4 text-teal-700"
      >
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
          {managers.length > 0 ? (
            managers.map((manager, index) => (
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
                    // onClick={() => handleUpdate(manager)}
                    className="text-blue-500 hover:underline transition duration-200"
                  >
                    Update
                  </button>
                  <button
                    // onClick={() => handleDelete(manager._id)}
                    className="text-red-500 hover:underline transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <td colSpan="6" className="py-4 text-center text-gray-500">
                No managers yet
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ManagersList;
