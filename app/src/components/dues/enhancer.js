import { withFormik } from 'formik'
import * as Yup from 'yup'

const chooseMembership = withFormik({
  validationSchema: Yup.object().shape({
    service: Yup.string().required('This field is required'),
    plan: Yup.string().required('This field is required'),
    subPlan: Yup.string().required('This field is required'),
  }),

  handleSubmit: (values) => {},
  mapPropsToValues: (props) => ({
    service: {
      label: 'Not Applicable',
      value: 'NotApplicable',
    },
    plan: '',
    subPlan: '',
  }),
  enableReinitialize: true,
  isInitialValid: false,
})

const payment = withFormik({
  validationSchema: Yup.object().shape({
    isNational: Yup.boolean().notRequired().default(false),
    isLocal: Yup.boolean().notRequired().default(false),
    localAmount: Yup.number()
      .notRequired()
      .when('isLocal', {
        is: (isLocal) => isLocal === true,
        then: Yup.number()
          .required('This field is required')
          .positive('Please enter valid amount'),
      }),
    nationalAmount: Yup.number()
      .notRequired()
      .when('isNational', {
        is: (isNational) => isNational === true,
        then: Yup.number()
          .required('This field is required')
          .positive('Please enter valid amount'),
      }),
  }),

  handleSubmit: (values) => {},
  mapPropsToValues: (props) => ({
    isNational: false,
    isLocal: false,
    nationalAmount: '',
    localAmount: '',
  }),
  enableReinitialize: true,
  isInitialValid: true,
})

export { chooseMembership, payment }
