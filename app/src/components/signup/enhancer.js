import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().trim().required("This field is required"),
    lastName: Yup.string().trim().required("This field is required"),
    // memberId: Yup.string().trim().required("This field is required"),
    email: Yup.string()
      .email("Invalid Email")
      .trim()
      .required("This field is required"),
    password: Yup.string()
      .trim()
      .required("This field is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPwd: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password didn't match")
      .required("This field is required"),
    section: Yup.string().trim().required("Please choose section"),
    affiliation: Yup.string().trim().required("Please choose affiliation"),
  }),

  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
  isInitialValid: false,
});

export default formikEnhancer;
