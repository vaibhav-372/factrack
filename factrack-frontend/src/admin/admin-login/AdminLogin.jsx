import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();


  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(`values: ${values}`)
      // const res = await axios.post('http://localhost:5000/api/admin/login', values);
      const res = await axios.post('http://localhost:5000/api/admin/login', values, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(`response:`,res)      
      alert('Login successful');
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors({ password: error.response.data.message });
      } else {
        console.error('Login error:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-300 to-teal-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-300"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-teal-700 mb-2"
        >
          Factrack
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 mb-6"
        >
          Welcome back! Please login to your account.
        </motion.p>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Username Required'),
            password: Yup.string().required('Password Required'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">  
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-teal-700 font-semibold">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full p-3 border border-teal-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-teal-700 font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border border-teal-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </motion.div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all duration-300 shadow-lg"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
