import { withFormik } from 'formik'
import * as Yup from 'yup'

const LoginEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .trim()
      .required('This field is required'),
    password: Yup.string().trim().required('This field is required'),
}),

  handleSubmit: (values) => {},
  enableReinitialize: true,
  isInitialValid: false,
})

export { LoginEnhancer }
