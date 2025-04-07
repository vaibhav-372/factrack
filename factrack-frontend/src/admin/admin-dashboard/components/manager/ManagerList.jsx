// admin-dashboard/components/Manager/ManagersList.jsx
import { motion } from 'framer-motion';

const ManagersList = ({ managers, onDelete }) => {
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
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.length > 0 ? (
            managers.map((manager, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="border-t"
              >
                <td className="py-2">{manager.name}</td>
                <td className="py-2">{manager.email}</td>
                <td className="py-2">{manager.phone}</td>
                <td className="py-2">
                  <button
                    onClick={() => onDelete(index)}
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
              <td colSpan="4" className="py-4 text-center text-gray-500">
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
