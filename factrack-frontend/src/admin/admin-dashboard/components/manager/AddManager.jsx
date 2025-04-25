import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addManager } from '../../../redux/adminManagerSlice';

const AddManager = ({ onManagerAdded = () => { } }) => {

  const dispatch = useDispatch();

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
      const resultAction = await dispatch(addManager(values));  
  
      if (addManager.fulfilled.match(resultAction)) {
        onManagerAdded(resultAction.payload);
        alert('Manager added successfully');
        resetForm();
      } else {
        const error = resultAction.payload || resultAction.error;
        const msg = error?.message || 'Something went wrong';
  
        // Handle specific error messages
        if (msg.includes('email')) {
          setErrors({ email: msg });
        } else if (msg.includes('Username')) {
          setErrors({ username: msg });
        } else {
          alert(msg);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred');
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
              { name: 'name', label: 'Name', placeholder: 'Enter manager name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter manager email address' },
              { name: 'phone', label: 'Phone', placeholder: 'Enter manager phone number' },
              { name: 'dept', label: 'Department', placeholder: 'Enter manager department name' },
              { name: 'DOJ', label: 'Date of Joining', type: 'date' },
              { name: 'managerID', label: 'Manager ID', placeholder: 'Enter unique manager ID' },
              { name: 'qualification', label: 'Qualification', placeholder: 'Enter manager qualification' },
              { name: 'salary', label: 'Salary', type: 'number', placeholder: 'Enter manager salary amount' },
              { name: 'username', label: 'Username', placeholder: 'Enter manager username' },
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
                  placeholder={placeholder}
                  className="w-full p-3 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-base"
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {/* Textarea for Remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="block text-base text-teal-700 font-semibold mb-1"
              >
                Remarks
              </label>
              <Field
                as="textarea"
                name="remarks"
                rows="4"
                placeholder='Additional comments or notes'
                className="w-full p-3 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-base resize-none"
              />
              <ErrorMessage
                name="remarks"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 text-lg"
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
