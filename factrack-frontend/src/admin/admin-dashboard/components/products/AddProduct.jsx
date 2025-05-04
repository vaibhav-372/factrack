import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { addProduct } from '../../../redux/adminProductSlice';
import { useDispatch } from 'react-redux';

const AddProduct = ({ onProductAdded = () => { } }) => {

    const dispatch = useDispatch();

    const initialValues = {
        productName: '',
        companyName: '',
        stock: '',
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required('Name is required'),
        companyName: Yup.string().required('Company name is required'),
        stock: Yup.number().typeError('stock must be a number').required('Amount of stock is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          const payload = {
            productName: values.productName,
            companyName: values.companyName,
            stock: values.stock,
          };
      
          const result = await dispatch(addProduct(payload)).unwrap();
      
          onProductAdded(result);
          alert('Product added successfully!');
          resetForm();
      
        } catch (error) {
          console.error('Add Product error:', error);
      
          const message = error?.message || error?.message || "Something went wrong.";
      
          if (
            error?.message === "This product already exists, you can directly update product" ||
            error?.message === "This product already exists, you can directly update the product"
          ) {
            alert(error.message);
          } else {
            alert(message);
          }
      
        } finally {
          setSubmitting(false);
        }
      };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-teal-700 mb-6 text-center"
            >
                Add New Product
            </motion.h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-5">
                        {[
                            { name: 'productName', label: 'Product Name', placeholder: 'Enter Product Name' },
                            { name: 'companyName', label: 'Product Company Name', placeholder: 'Enter Product Company Name' },
                            { name: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock in number' },

                        ].map(({ name, label, type = 'text', placeholder }) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-base text-teal-700 font-semibold mb-1"
                                >
                                    {label}
                                </label>
                                <Field
                                    name={name}
                                    type={type}
                                    id={name}
                                    placeholder={[placeholder]}
                                    className="w-full p-3 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
                                />
                                <ErrorMessage
                                    name={name}
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        ))}

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 text-lg"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </motion.button>
                    </Form>
                )}
            </Formik>
        </motion.div>
    );
};

export default AddProduct;
