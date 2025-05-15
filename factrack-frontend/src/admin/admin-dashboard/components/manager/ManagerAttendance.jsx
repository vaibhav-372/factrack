import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateManagerAttendance } from '../../../redux/adminManagerSlice';

const ManagerAttendance = ({ managerData, onClose, onUpdated }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const validationSchema = Yup.object({
        status: Yup.string()
            .oneOf(['On Duty(on sight)', 'On Duty(on remote)', 'Off Duty', 'Leave', 'Inspection', 'In Meeting', 'Suspended', 'Training class'], 'Invalid status')
            .required('Status is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {

            console.log(`work status submitted:-`, values)
            console.log(`manager ID for attendance`, managerData._id)
            const result = await dispatch(updateManagerAttendance({ id: managerData._id, status: values.status }));

            if (!managerData._id) {
                console.warn("managerID is undefined");
            }

            if (updateManagerAttendance.fulfilled.match(result)) {
                alert('Attendance marked successfully');
                onUpdated();
                onClose();
            } else {
                alert(result.payload?.message || 'Failed to mark attendance');
            }
        } catch (err) {
            console.error('Error marking attendance:', err);
            alert('Something went wrong...');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-70">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Mark Attendance</h2>
                <Formik
                    initialValues={{
                        status: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-teal-700 font-semibold mb-1">Status</label>
                                <Field
                                    as="select"
                                    name="status"
                                    className="w-full p-3 border border-teal-300 rounded-xl"
                                >
                                    <option value="">-- Select Attendance Status --</option>
                                    <option value="On Duty(on sight)">On Duty(on sight)</option>
                                    <option value="On Duty(on remote)">On Duty(on remote)</option>
                                    <option value="Off Duty">Off Duty</option>
                                    <option value="Leave">Leave</option>
                                    <option value="Inspection">Inspection</option>
                                    <option value="In Meeting">In Meeting</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Training Class">Training Class</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex gap-4 justify-between">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
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

export default ManagerAttendance;
