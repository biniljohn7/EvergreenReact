import { withFormik } from "formik";
import * as Yup from "yup";

const contactUs = withFormik({
  validationSchema: Yup.object().shape({
    question: Yup.string().required("This field is required"),
    name: Yup.string().trim().required("This field is required"),
    subject: Yup.string().trim().required("This field is required"),
    message: Yup.string().trim().required("This field is required"),
  }),
  handleSubmit: (values) => {},
  isInitialValid: false,
  enableReinitialize: true,
});

const changePwd = withFormik({
  validationSchema: Yup.object().shape({
    oldPassword: Yup.string().trim().required("This field is required"),
    newPassword: Yup.string()
      .trim()
      .required("This field is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPwd: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("newPassword"), null], "Password didn't match"),
  }),

  handleSubmit: (values) => {},
  enableReinitialize: true,
  isInitialValid: false,
});

const editProfile = withFormik({
  validationSchema: Yup.object().shape({
    statusUpdate: Yup.string().notRequired().nullable(),
    prefix: Yup.string().required("This field is required"),
    firstName: Yup.string().trim().required("This field is required"),
    lastName: Yup.string().trim().required("This field is required"),
    suffix: Yup.string().notRequired().nullable(),
    country: Yup.string().required("This field is required"),
    nation: Yup.string().required("This field is required"),
    organizationalState: Yup.string().required("This field is required"),
    region: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    address: Yup.string().trim().required("This field is required"),
    zip: Yup.string().trim().required("This field is required"),
    //phoneCode: Yup.string().required("This field is required"),
    phoneNumber: Yup.string()
      .required("This field is required")
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Not a valid phone number"
      ),
    biography: Yup.string().notRequired().nullable(),
    occupation: Yup.string().required("This field is required"),
    industry: Yup.string().required("This field is required"),
    education: Yup.array()
      .required("This field is required!")
      .min(1)
      .of(
        Yup.object().shape({
          university: Yup.string().required("This field is required"),
          degree: Yup.string().required("This field is required"),
        })
      ),
    certification: Yup.array().notRequired().nullable(),
    //chapterOfInitiation: Yup.string().trim().required("This field is required"),
    yearOfIni: Yup.date().required("This field is required"),
    dob: Yup.date().required("This field is required"),
    currentChapter: Yup.string().required("This field is required"),
    leadershipRole: Yup.string().trim().required("This field is required"),
    household: Yup.string().required("This field is required"),
    racialIdentity: Yup.string().required("This field is required"),
    employmentStatus: Yup.string().required("This field is required"),
    volunteerInterest: Yup.string().required("This field is required"),
    salaryRange: Yup.string().required("This field is required"),
    expertise: Yup.array().required("This field is required").min(1),

    statusUpdateSwitch: Yup.bool().notRequired().default(true),
    prefixSwitch: Yup.bool().notRequired().default(true),
    countrySwitch: Yup.bool().notRequired().default(true),
    stateSwitch: Yup.bool().notRequired().default(true),
    citySwitch: Yup.bool().notRequired().default(true),
    addressSwitch: Yup.bool().notRequired().default(true),
    address2Switch: Yup.bool().notRequired().default(true),
    zipSwitch: Yup.bool().notRequired().default(true),
    phoneNumberSwitch: Yup.bool().notRequired().default(true),
    biographySwitch: Yup.bool().notRequired().default(true),
    occupationSwitch: Yup.bool().notRequired().default(true),
    industrySwitch: Yup.bool().notRequired().default(true),
    educationSwitch: Yup.bool().notRequired().default(true),
    certificationSwitch: Yup.bool().notRequired().default(true),
    chapOfIniSwitch: Yup.bool().notRequired().default(true),
    yearOfIniSwitch: Yup.bool().notRequired().default(true),
    dobSwitch: Yup.bool().notRequired().default(true),
    currentChapSwitch: Yup.bool().notRequired().default(true),
    roleSwitch: Yup.bool().notRequired().default(true),
    householdSwitch: Yup.bool().notRequired().default(true),
    racialIdentitySwitch: Yup.bool().notRequired().default(true),
    employmentStatusSwitch: Yup.bool().notRequired().default(true),
    volunteerInterestSwitch: Yup.bool().notRequired().default(true),
    salarySwitch: Yup.bool().notRequired().default(true),
    expertiseSwitch: Yup.bool().notRequired().default(true),
    nationSwitch: Yup.bool().notRequired().default(true),
    regionSwitch: Yup.bool().notRequired().default(true),
    organizationalStateSwich: Yup.bool().notRequired().default(true),
    affilateOrgznSwitch: Yup.bool().notRequired().default(true),
  }),

  mapPropsToValues: (props) => ({
    statusUpdate: props.profile.profile.statusUpdate || "",
    prefix: props.profile.profile.prefix
      ? {
          label: props.profile.profile.prefix.name,
          value: props.profile.profile.prefix.id,
        }
      : "",
    suffix: props.profile.profile.suffix
      ? {
          label: props.profile.profile.suffix.name,
          value: props.profile.profile.suffix.id,
        }
      : "",
    firstName: props.profile.profile.firstName || "",
    lastName: props.profile.profile.lastName || "",
    country: props.profile.profile.country
      ? {
          name: props.profile.profile.country.name,
          profileOptionsId: props.profile.profile.country.id,
        }
      : "",
    nation: props.profile.profile.nation
      ? {
          nationName: props.profile.profile.nation.name,
          nationId: props.profile.profile.nation.id,
        }
      : "",
    organizationalState: props.profile.profile.organizationalState
      ? {
          name: props.profile.profile.organizationalState.name,
          id: props.profile.profile.organizationalState.id,
        }
      : "",
    region: props.profile.profile.region
      ? {
          regionName: props.profile.profile.region.name,
          regionId: props.profile.profile.region.id,
        }
      : "",
    state: props.profile.profile.state
      ? {
          name: props.profile.profile.state.name,
          id: props.profile.profile.state.id,
        }
      : "",
    city: props.profile.profile.city || "",
    address: props.profile.profile.address || "",
    address2: props.profile.profile.address2 || "",
    zip: props.profile.profile.zipcode || "",
    // phoneCode: props.profile.profile.phoneCode
    //   ? {
    //     name: props.profile.profile.phoneCode.name,
    //     profileOptionsId: props.profile.profile.phoneCode.id,
    //   }
    //   : "",
    phoneNumber: props.profile.profile.phoneNumber || "",
    // affilateOrgzn: props.profile.profile.affilateOrgzn || "",
    biography: props.profile.profile.biography || "",
    occupation: props.profile.profile.occupation
      ? {
          name: props.profile.profile.occupation.name,
          profileOptionsId: props.profile.profile.occupation.id,
        }
      : "",
    industry: props.profile.profile.industry
      ? {
          name: props.profile.profile.industry.name,
          profileOptionsId: props.profile.profile.industry.id,
        }
      : "",
    chapterOfInitiation: props.profile.profile.chapterOfInitiation
      ? {
          chapterName: props.profile.profile.chapterOfInitiation.name,
          chapterId: props.profile.profile.chapterOfInitiation.id,
        }
      : "",
    affilateOrgzn: props.profile.profile.affilateOrgzn
      ? {
          name: props.profile.profile.affilateOrgzn.name,
          profileOptionsId: props.profile.profile.affilateOrgzn.id,
        }
      : "",
    yearOfIni: props.profile.profile.yearOfInitiation || "",
    dob: props.profile.profile.dob || "",
    currentChapter: props.profile.profile.currentChapter
      ? {
          chapterName: props.profile.profile.currentChapter.name,
          chapterId: props.profile.profile.currentChapter.id,
        }
      : "",
    leadershipRole: props.profile.profile.leadershipRole || "",
    household: props.profile.profile.household
      ? {
          label: props.profile.profile.household.name,
          value: props.profile.profile.household.id,
        }
      : "",
    racialIdentity: props.profile.profile.racialIdentity
      ? {
          label: props.profile.profile.racialIdentity.name,
          value: props.profile.profile.racialIdentity.id,
        }
      : "",
    employmentStatus: props.profile.profile.employmentStatus
      ? {
          label: props.profile.profile.employmentStatus.name,
          value: props.profile.profile.employmentStatus.id,
        }
      : "",
    volunteerInterest: props.profile.profile.volunteerInterest
      ? {
          label: props.profile.profile.volunteerInterest.name,
          value: props.profile.profile.volunteerInterest.id,
        }
      : "",
    salaryRange: props.profile.profile.salaryRange
      ? {
          label: props.profile.profile.salaryRange.name,
          value: props.profile.profile.salaryRange.id,
        }
      : "",
    education: [{ university: "", degree: "" }],
    certification: "",
    expertise: "",

    emailSwitch: props.profile.visible
      ? props.profile.visible.email || false
      : false,
    memberCodeSwitch: props.profile.visible
      ? props.profile.visible.memberCode || false
      : false,
    statusUpdateSwitch: props.profile.visible
      ? props.profile.visible.statusUpdate || false
      : false,
    prefixSwitch: props.profile.visible
      ? props.profile.visible.prefix || false
      : false,
    countrySwitch: props.profile.visible
      ? props.profile.visible.country || false
      : false,
    stateSwitch: props.profile.visible
      ? props.profile.visible.state || false
      : false,
    citySwitch: props.profile.visible
      ? props.profile.visible.city || false
      : false,
    addressSwitch: props.profile.visible
      ? props.profile.visible.address || false
      : false,
    address2Switch: props.profile.visible
      ? props.profile.visible.address2 || false
      : false,
    zipSwitch: props.profile.visible
      ? props.profile.visible.zipcode || false
      : false,
    phoneNumberSwitch: props.profile.visible
      ? props.profile.visible.phoneNumber || false
      : false,
    affilateOrgznSwitch: props.profile.visible
      ? props.profile.visible.affilateOrgzn || false
      : false,
    biographySwitch: props.profile.visible
      ? props.profile.visible.biography || false
      : false,
    occupationSwitch: props.profile.visible
      ? props.profile.visible.occupation || false
      : false,
    industrySwitch: props.profile.visible
      ? props.profile.visible.industry || false
      : false,
    educationSwitch: props.profile.visible
      ? props.profile.visible.educations || false
      : false,
    certificationSwitch: props.profile.visible
      ? props.profile.visible.certification || false
      : false,
    chapOfIniSwitch: props.profile.visible
      ? props.profile.visible.chapterOfInitiation || false
      : false,
    yearOfIniSwitch: props.profile.visible
      ? props.profile.visible.yearOfInitiation || false
      : false,
    dobSwitch: props.profile.visible
      ? props.profile.visible.dob || false
      : false,
    currentChapSwitch: props.profile.visible
      ? props.profile.visible.currentChapter || false
      : false,
    roleSwitch: props.profile.visible
      ? props.profile.visible.leadershipRole || false
      : false,
    householdSwitch: props.profile.visible
      ? props.profile.visible.household || false
      : false,
    racialIdentitySwitch: props.profile.visible
      ? props.profile.visible.racialIdentity || false
      : false,
    employmentStatusSwitch: props.profile.visible
      ? props.profile.visible.employmentStatus || false
      : false,
    volunteerInterestSwitch: props.profile.visible
      ? props.profile.visible.volunteerInterest || false
      : false,
    salarySwitch: props.profile.visible
      ? props.profile.visible.salaryRange || false
      : false,
    expertiseSwitch: props.profile.visible
      ? props.profile.visible.expertise || false
      : false,
    nationSwitch: props.profile.visible
      ? props.profile.visible.nation || false
      : false,
    regionSwitch: props.profile.visible
      ? props.profile.visible.region || false
      : false,
    organizationalStateSwich: props.profile.visible
      ? props.profile.visible.organizationalState || false
      : false,
  }),

  handleSubmit: (values) => {},
  enableReinitialize: true,
  isInitialValid: false,
});

export { contactUs, changePwd, editProfile };
