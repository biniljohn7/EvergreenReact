import { withFormik } from 'formik'
import * as Yup from 'yup'

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    contact_email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    contact_name: Yup.string().trim().required('This field is required'),
    contact_msg: Yup.string().trim().required('This field is required'),
  }),
  handleSubmit: (values) => {},
  isInitialValid: false,
  enableReinitialize: true,
})

export default formikEnhancer
