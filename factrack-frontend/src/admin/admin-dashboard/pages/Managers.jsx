import { useState } from 'react';
import ManagersList from '../components/manager/ManagerList.jsx';
import AddManager from '../components/manager/AddManager.jsx';

const Manager = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [managers, setManagers] = useState([]);

  const handleAdd = (newManager) => {
    setManagers([...managers, newManager]);
    setActiveTab('list');
  };

  const handleDelete = (index) => {
    const filtered = managers.filter((_, i) => i !== index);
    setManagers(filtered);
  };

  return (
    <div className="p-4 sm:p-6 ">
      {/* Top Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded text-sm sm:text-base font-semibold ${
            activeTab === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Managers List
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded text-sm sm:text-base font-semibold ${
            activeTab === 'add' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Add Manager
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'add' && <AddManager onManagerAdded={handleAdd} />}
      {activeTab === 'list' && (
        <ManagersList managers={managers} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Manager;
