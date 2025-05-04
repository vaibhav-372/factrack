import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateManager } from '../../../redux/adminManagerSlice';

const UpdateManager = ({ managerData, onClose, onUpdated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const resultAction = await dispatch(updateManager({ id: managerData._id, updatedData: values }));

      if (updateManager.fulfilled.match(resultAction)) {
        alert('Manager updated successfully');
        onUpdated();
        onClose();
      } else {
        const msg = resultAction.payload?.message || 'Update failed';
        if (msg.includes('email')) setErrors({ email: msg });
        else if (msg.includes('Username')) setErrors({ username: msg });
        else alert(msg);
      }
    } catch (err) {
      alert('Something went wrong....', err);
      console.log(`some error..... ${err}`)
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
        <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Update Manager</h2>
        <Formik
          initialValues={{
            ...managerData,
            DOJ: managerData.DOJ?.split('T')[0], // Extract only the date part
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                  <label className="block text-teal-700 font-semibold mb-1">{label}</label>
                  <Field
                    type={type}
                    name={name}
                    className="w-full p-3 border border-teal-300 rounded-xl"
                  />
                  <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}

              <div>
                <label className="block text-teal-700 font-semibold mb-1">Remarks</label>
                <Field
                  as="textarea"
                  name="remarks"
                  rows="3"
                  className="w-full p-3 border border-teal-300 rounded-xl"
                />
              </div>

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

export default UpdateManager;
