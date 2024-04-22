import { withFormik } from 'formik'
import * as Yup from 'yup'

const forgotPwdValidation = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
  }),
  handleSubmit: (values) => {},
  mapPropsToValues: (props) => ({
    email: '',
  }),
  enableReinitialize: true,
  isInitialValid: false,
})

const otpValidation = withFormik({
  validationSchema: Yup.object().shape({
    otp: Yup.string().required('This field is required'),
  }),

  handleSubmit: (values) => {},
  enableReinitialize: true,
  isInitialValid: false,
})

const resetPwdValidation = withFormik({
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .trim()
      .required('This field is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirmPwd: Yup.string()
      .required('This field is required')
      .oneOf([Yup.ref('password'), null], "Password didn't match"),
  }),

  handleSubmit: (values) => {},
  enableReinitialize: true,
  isInitialValid: false,
})

export { forgotPwdValidation, resetPwdValidation, otpValidation }
