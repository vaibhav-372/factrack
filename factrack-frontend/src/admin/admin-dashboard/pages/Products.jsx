import { useState } from 'react';
import ProductsList from '../components/products/ProductsList.jsx';
import AddProduct from '../components/products/AddProduct.jsx';

const Products = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);

  const handleAdd = (newProduct) => {
    setProducts([...products, newProduct]);
    setActiveTab('list');
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
          Products List
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded text-sm sm:text-base font-semibold ${
            activeTab === 'add' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Add Product
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'add' && <AddProduct onManagerAdded={handleAdd} />}
      {activeTab === 'list' && (
        <ProductsList />
      )}
    </div>
  );
};

export default Products;