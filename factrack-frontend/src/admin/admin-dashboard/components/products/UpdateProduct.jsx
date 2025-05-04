import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../../redux/adminProductSlice';

const UpdateProduct = ({ productData, onClose, onUpdated }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.adminProduct.list);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validationSchema = Yup.object({
    productName: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company name is required'),
    stock: Yup.number().typeError('stock must be a number').required('Amount of stock is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {      
      const isDuplicate = allProducts.some((product) =>
        product._id !== productData._id &&
        product.productName.toLowerCase() === values.productName.toLowerCase().trim() &&
        product.companyName.toLowerCase() === values.companyName.toLowerCase().trim()
      );

      if (isDuplicate) {
        alert("This product already exists, you can directly update it.");
        setSubmitting(false);
        return;
      }
      
      const resultAction = await dispatch(updateProduct({ id: productData._id, updatedData: values }));

      if (updateProduct.fulfilled.match(resultAction)) {
        alert('Product updated successfully');
        onUpdated();
        onClose();
      } else {
        const msg = resultAction.payload?.message || 'Update failed';
        alert(msg);
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating the product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-40">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Update Product</h2>
        <Formik
          initialValues={{
            ...productData,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {[
                { name: 'productName', label: 'Product Name', placeholder: 'Enter Product Name' },
                { name: 'companyName', label: 'Product Company Name', placeholder: 'Enter Product Company Name' },
                { name: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock in number' },
              ].map(({ name, label, type = 'text' }) => (
                <div key={name}>
                  <label className="block text-teal-700 font-semibold mb-1">{label}</label>
                  <Field
                    type={type}
                    name={name}
                    className="w-full p-3 border border-teal-300 rounded-xl"
                  />
                  <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}

              <div className="flex gap-4 justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default UpdateProduct;
