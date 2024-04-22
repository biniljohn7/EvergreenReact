import { withFormik } from 'formik'
import * as Yup from 'yup'

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().trim().required('This field is required'),
    lastName: Yup.string().trim().required('This field is required'),
    email: Yup.string()
      .email('Invalid Email')
      .trim()
      .required('This field is required'),
    addressLine1: Yup.string()
      .trim()
      .notRequired()
      .matches(/^[A-Za-z0-9'\.\-\s\,]{3,}$/, 'Invalid address'),
    city: Yup.string()
      .trim()
      .notRequired()
      .matches(
        /^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*([1-9a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
        'Invalid city name',
      ),
    state: Yup.string()
      .trim()
      .notRequired()
      .matches(
        /^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*([1-9a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
        'Invalid state name',
      ),
    phoneCode: Yup.string().notRequired(),
    postalCode: Yup.string().required('This field is required'),
    phoneNumber: Yup.string()
      .notRequired()
      .matches(/^[1-9]\d{9}$/, 'Not a valid phone number'),

    countryCode: Yup.string().required('This field is required'),
    saveCard: Yup.boolean().notRequired().default(false),
  }),
  handleSubmit: (values) => {},

  mapPropsToValues: (props) => ({
    firstName: '',
    lastName: '',
    email: '',
    addressLine1: '',
    city: '',
    state: '',
    phoneCode: '',
    postalCode: '',
    phoneNumber: '',
    countryCode: '',
    saveCard: false,
  }),
  enableReinitialize: true,
  isInitialValid: false,
})

export default formikEnhancer
