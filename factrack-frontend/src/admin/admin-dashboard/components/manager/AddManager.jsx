import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddManager = ({ onManagerAdded }) => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    dept: '',
    DOJ: '',
    managerID: '',
    qualification: '',
    salary: '',
    username: '',
    remarks: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    dept: Yup.string().required('Department is required'),
    DOJ: Yup.string().required('Date of Joining is required'),
    managerID: Yup.string().required('Manager ID is required'),
    qualification: Yup.string().required('Qualification is required'),
    salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
    username: Yup.string().required('Username is required'),
    remarks: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/managers', values, {
        headers: { 'Content-Type': 'application/json' },
      });
      onManagerAdded(res.data);
      alert('Manager added successfully');
      resetForm();
    } catch (error) {
      console.error('Add manager error:', error);
      if (error.response?.data?.message) {
        setErrors({ email: error.response.data.message });
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
        className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700 mb-6 text-center"
      >
        Add New Manager
      </motion.h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            {[
              { name: 'name', label: 'Name' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone', label: 'Phone' },
              { name: 'dept', label: 'Department' },
              { name: 'DOJ', label: 'Date of Joining', type: 'date' },
              { name: 'managerID', label: 'Manager ID' },
              { name: 'qualification', label: 'Qualification' },
              { name: 'salary', label: 'Salary', type: 'number' },
              { name: 'username', label: 'Username' },
            ].map(({ name, label, type = 'text' }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm sm:text-base md:text-lg text-teal-700 font-semibold mb-1"
                >
                  {label}
                </label>
                <Field
                  name={name}
                  type={type}
                  id={name}
                  className="w-full p-2 sm:p-3 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-xs sm:text-sm mt-1"
                />
              </div>
            ))}

            {/* Textarea for Remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="block text-sm sm:text-base md:text-lg text-teal-700 font-semibold mb-1"
              >
                Remarks
              </label>
              <Field
                as="textarea"
                name="remarks"
                rows="4"
                className="w-full p-2 sm:p-3 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base resize-none"
              />
              <ErrorMessage
                name="remarks"
                component="div"
                className="text-red-500 text-xs sm:text-sm mt-1"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 text-sm sm:text-base md:text-lg"
            >
              {isSubmitting ? 'Adding...' : 'Add Manager'}
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddManager;
