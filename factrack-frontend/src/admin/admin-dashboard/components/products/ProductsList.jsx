import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../redux/adminProductSlice.js';
import UpdateProduct from './UpdateProduct.jsx';

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProduct.list || []);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (Product) => {
    if (window.confirm(`Are you sure you want to delete Product: ${Product.productName}?`)) {
      dispatch(deleteProduct(Product._id))
        .unwrap()
        .then(() => {
          alert('Product deleted successfully!');
          dispatch(fetchProducts());
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product.');
        });
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowPopup(false);
  };

  return (
    <motion.div className="relative bg-white p-4 rounded-xl shadow-md mt-6">
      {/* Products list gets dimmed when popup is active */}
      <div className={`${showPopup ? 'opacity-30 blur-sm pointer-events-none' : ''} transition-all duration-300`}>
        <motion.h2 className="text-xl font-semibold mb-4 text-teal-700">
          Products List
        </motion.h2>

        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Product Name</th>
              <th className="py-2">Company Name</th>
              <th className="py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(product => !product.isDeleted)
              .map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="border-t"
                >
                  <td className="py-2">{product.productName}</td>
                  <td className="py-2">{product.companyName}</td>
                  <td className="py-2">{product.stock}</td>
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
        <UpdateProduct
          managerData={selectedManager}
          onClose={handleClose}
          onUpdated={() => dispatch(fetchProducts())}
        />
      )}
    </motion.div>
  );
};

export default ProductsList;
