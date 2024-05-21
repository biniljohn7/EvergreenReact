import React, { useState, useEffect } from "react";
import Wrapper from "./common.style";
import { Modal } from "reactstrap";
import Input from "../../UI/input/InputWithSwitch";
import Textarea from "../../UI/textarea/TextareaWithSwitch";
import { store } from "../../redux/store";
import { PROFILE_OPTIONS, HEADER_COLOR } from "../../helper/constant";
import Select from "react-select";
import Switch from "react-switch";
import { editProfile as enhancer } from "./enhancer";
import MultiSelect from "react-multi-select-component";
import { FieldArray } from "formik";
import {
  getDropdown,
  getCity,
  getState,
  getChapter,
  createProfile,
  updateProfile,
  getNation,
  getRegion,
  getStateFromRegion,
} from "../../api/memberAPI";
import { ToastsStore } from "react-toasts";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthActions from "../../redux/auth/actions";
const { login } = AuthActions;

// const LEFT_CLASS = 'col-7 col-sm-7 col-md-9 col-lg-9 col-xl-9'

// const RIGHT_CLASS = 'col-5 col-sm-5 col-md-3 col-lg-3 col-xl-3'

const WIDTH_CLASS = window.innerWidth >= 1024 ? "wp-80" : "wp-100";

export const SELECT_CSS = {
  control: (value) => {
    return {
      ...value,
      minHeight: "44px",
      width: window.innerWidth >= 1024 ? "80%" : "100%",
    };
  },
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      paddingTop: "10px",
      paddingBottom: "10px",
      fontSize: "14px",
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: window.innerWidth >= 1024 ? "80%" : "100%",
  }),
};

const EditProfile = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isValid,
  } = props;

  const isProfileCreated = store.getState().auth.isProfileCreated;

  const LEFT_CLASS = isProfileCreated
    ? "col-8 col-sm-10 col-md-9 col-lg-9 col-xl-9"
    : "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
  const RIGHT_CLASS =
    "col-4 col-sm-2 col-md-3 col-lg-3 col-xl-3" +
    (isProfileCreated ? "" : " d-none");

  const [dropdown, setDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [stateList, setState] = useState([]);
  const [organizationalStateList, setOrganizationalState] = useState([]);
  const [nationList, setNationList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [cityList, setCity] = useState([]);
  const [chapterList, setChapter] = useState([]);
  const [chapterOfIntiationList, setChapterOfIntiation] = useState([]);
  const [formValues, setFormValues] = useState({ ...values });
  const [ErrorList, setErrorList] = useState({});

  useEffect(() => {
    getDropdown()
      .then((res) => {
        setDropdown(res.data);
        let ndata = { ...formValues };

        if (props.profile.profile.expertises) {
          const exp = props.profile.profile.expertises.map((ex) => {
            return {
              label: ex.name,
              value: ex.id,
            };
          });
          ndata.expertise = exp;
        }
        if (props.profile.profile.certifications) {
          const cert = props.profile.profile.certifications.map((ex) => {
            return {
              label: ex.name,
              value: ex.id,
            };
          });
          ndata.certification = cert;
        }
        if (props.profile.profile.educations) {
          const edu = props.profile.profile.educations.map((ex) => {
            return {
              university: {
                profileOptionsId: ex.university.id,
                name: ex.university.name,
              },
              degree: {
                value: ex.degree.id,
                label: ex.degree.name,
              },
            };
          });
          ndata.education = edu;
        }
        if (props.profile.profile.yearOfInitiation) {
          const YOI = props.profile.profile.yearOfInitiation.split("/");

          ndata.yearOfIni = YOI[2] + "-" + YOI[1] + "-" + YOI[0];
        }
        if (props.profile.profile.country) {
          getState(props.profile.profile.country.id)
            .then((res) => {
              setState([...res.data]);
            })
            .catch((err) => {
              ToastsStore.error(
                "Failed to retrive State list. Please try again later!"
              );
            });
        }
        if (props.profile.profile.nation) {
          getRegion(props.profile.profile.nation.id)
            .then((res) => {
              setRegionList([...res.data]);
            })
            .catch((err) => {
              ToastsStore.error(
                "Failed to retrive Region list. Please try again later!"
              );
            });
        }
        if (props.profile.profile.region) {
          getStateFromRegion(props.profile.profile.region.id)
            .then((res) => {
              setOrganizationalState([...res.data]);
            })
            .catch((err) => {
              ToastsStore.error(
                "Failed to retrive State list. Please try again later!"
              );
            });
        }
        if (props.profile.profile.state) {
          getCity(props.profile.profile.state.id)
            .then((res) => {
              setCity(res.data.city);
            })
            .catch((err) => {
              ToastsStore.error(
                "Failed to retrive City list. Please try again later!"
              );
            });
        }
        if (props.profile.profile.organizationalState) {
          getChapter(props.profile.profile.organizationalState.id)
            .then((res) => {
              setChapter(res.data);
            })
            .catch((err) => {
              ToastsStore.error(
                "Failed to retrive Section list. Please try again later!"
              );
            });
        }

        setLoading(false);
        setFormValues(ndata);
      })
      .catch((err) => {
        ToastsStore.error("Something went wrong!");
        props.history.push("/home");
      });
  }, []);

  useEffect(() => {
    getNation()
      .then((res) => {
        setNationList([...res.data]);
      })
      .catch((err) => {
        ToastsStore.error(
          "Failed to retrive City list. Please try again later!"
        );
      });
    getChapter(0)
      .then((res) => {
        setChapterOfIntiation([...res.data]);
      })
      .catch((err) => {
        ToastsStore.error(
          "Failed to retrive Section list. Please try again later!"
        );
      });
  }, []);

  const Error = ({ field }) => {
    return ErrorList[field] ?
      <div className="text-danger">
        {ErrorList[field]}
      </div> :
      <></>;
  };

  const Error2 = (props) => {
    const field1 = props.field;
    if ("education") {
      if (errors["education"] && touched["education"]) {
        if (
          errors["education"][props.index] &&
          touched["education"][props.index]
        ) {
          if (
            (errors["education"][props.index][field1] &&
              touched["education"][props.index][field1]) ||
            submitCount > 0
          ) {
            return (
              <span className="text-danger">
                {errors["education"][props.index][field1]}
              </span>
            );
          } else {
            return <span />;
          }
        } else {
          return <span />;
        }
      } else {
        return <span />;
      }
    } else {
      return <span />;
    }
  };

  const handleForm = (e) => {
    function el(id) {
      return document.getElementById(id);
    }

    function validateEducation(education) {
      if (!education || !Array.isArray(education)) {
        return "This field is required!";
      }
      if (education.length < 1) {
        return "At least one education entry is required!";
      }
      for (let i = 0; i < education.length; i++) {
        const entry = education[i];
        if (typeof entry !== "object" || entry === null) {
          return `Education entry ${i + 1} must be an object`;
        }
        if (!entry.university || !entry.university.name || !entry.university.profileOptionsId) {
          return `University field is required in education entry ${i + 1}`;
        }
        if (!entry.degree || !entry.degree.label || !entry.degree.value) {
          return `Degree field is required in education entry ${i + 1}`;
        }
      }
      return null;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    let
      sErrs = {}

    if (!formValues.prefix.value) {
      sErrs['prefix'] = 'This field is required';
    }
    if (!el('firstName').value.trim()) {
      sErrs['firstName'] = 'This field is required';
    }
    if (!el('lastName').value.trim()) {
      sErrs['lastName'] = 'This field is required';
    }
    if (!formValues.country.profileOptionsId) {
      sErrs['country'] = 'This field is required';
    }
    if (!formValues.state.id) {
      sErrs['state'] = 'This field is required';
    }
    if (!formValues.city.id) {
      sErrs['city'] = 'This field is required';
    }
    if (!el('address').value.trim()) {
      sErrs['address'] = 'This field is required';
    }
    if (!el('zip').value.trim()) {
      sErrs['zip'] = 'This field is required';
    }
    if (!formValues.phoneCode.profileOptionsId) {
      sErrs['phoneCode'] = 'Phone code is required';
    }
    if (!el('phoneNumber').value) {
      sErrs['phoneNumber'] = 'Pnone number is required';
    } else if (!phoneRegex.test(el('phoneNumber').value.trim())) {
      sErrs['phoneNumber'] = 'Not a valid phone number';
    }
    if (!formValues.occupation.profileOptionsId) {
      sErrs['occupation'] = 'This field is required';
    }
    if (!formValues.industry.profileOptionsId) {
      sErrs['industry'] = 'This field is required';
    }
    if (!el('leadershipRole').value.trim()) {
      sErrs['leadershipRole'] = 'This field is required';
    }
    if (!formValues.household.value) {
      sErrs['household'] = 'This field is required';
    }
    if (!formValues.salaryRange.value) {
      sErrs['salaryRange'] = 'This field is required';
    }
    if (!formValues.expertise.map((ex) => ex.value).length) {
      sErrs['expertise'] = 'This field is required';
    }
    if (!formValues.nation.nationId) {
      sErrs['nation'] = 'This field is required';
    }
    if (!formValues.region.regionId) {
      sErrs['region'] = 'This field is required';
    }
    if (!formValues.organizationalState.id) {
      sErrs['organizationalState'] = 'This field is required';
    }
    if (!formValues.chapterOfInitiation.chapterId) {
      sErrs['chapterOfInitiation'] = 'This field is required';
    }
    if (!el('yearOfIni').value.trim()) {
      sErrs['yearOfIni'] = 'This field is required';
    }
    if (!formValues.currentChapter.chapterId) {
      sErrs['currentChapter'] = 'This field is required';
    }

    let res = validateEducation(formValues.education);
    if (res) {
      sErrs['education'] = res;
    }

    setErrorList(sErrs);

    if (Object.keys(sErrs).length < 1) {
      setLoader(true);
      let body = {
        statusUpdate: formValues.statusUpdate || null,
        prefixId: formValues.prefix.value,
        firstName: el('firstName').value.trim(),
        lastName: el('lastName').value.trim(),
        suffixId: formValues.suffix ? formValues.suffix.value : null,
        countryId: formValues.country.profileOptionsId,
        stateId: formValues.state.id,
        organizationalStateId: formValues.organizationalState.id,
        regionId: formValues.region.regionId,
        nationId: formValues.nation.nationId,
        cityId: formValues.city.id,
        address: el('address').value.trim(),
        zipcode: el('zip').value.trim(),
        phoneCodeId: formValues.phoneCode.profileOptionsId,
        phoneNumber: el('phoneNumber').value.trim(),
        biography: el('address').value.trim() || null,
        occupationId: formValues.occupation.profileOptionsId,
        industryId: formValues.industry.profileOptionsId,
        educations: formValues.education.map((edu) => {
          return {
            degreeId: edu.degree.value,
            universityId: edu.university.profileOptionsId,
          };
        }),
        certificationId: formValues.certification
          ? formValues.certification.map((cert) => cert.value)
          : [],
        chapterOfInitiation: formValues.chapterOfInitiation.chapterId,
        currentChapter: formValues.currentChapter.chapterId,
        leadershipRole: el('leadershipRole').value.trim(),
        householdId: formValues.household.value,
        salaryRangeId: formValues.salaryRange.value,
        expertiseIds: formValues.expertise.map((ex) => ex.value),
      };
      const YOI = el('yearOfIni').value.trim().split("-");
      body.yearOfInitiation = YOI[2] + "/" + YOI[1] + "/" + YOI[0];
      if (isProfileCreated) {
        const totalBody = {
          profileVisibility: {
            firstName: props.profile.visible.firstName || true,
            lastName: props.profile.visible.lastName || true,
            suffix: props.profile.visible.suffix || true,
            profileImage: props.profile.visible.profileImage || true,
            memberId: store.getState().auth.memberId,
            profileVisibilityId: 0,
            statusUpdate: formValues.statusUpdateSwitch || false,
            prefix: formValues.prefixSwitch || false,
            email: formValues.emailSwitch || false,
            memberCode: formValues.memberCodeSwitch || false,
            country: formValues.countrySwitch || false,
            state: formValues.stateSwitch || false,
            organizationalState: formValues.organizationalStateSwich || false,
            city: formValues.citySwitch || false,
            address: formValues.addressSwitch || false,
            zipcode: formValues.zipSwitch || false,
            biography: formValues.biographySwitch || false,
            certification: formValues.certificationSwitch || false,
            chapterOfInitiation: formValues.chapOfIniSwitch || false,
            currentChapter: formValues.currentChapSwitch || false,
            educations: formValues.educationSwitch || false,
            expertise: formValues.expertiseSwitch || false,
            household: formValues.householdSwitch || false,
            industry: formValues.industrySwitch || false,
            leadershipRole: formValues.roleSwitch || false,
            occupation: formValues.occupationSwitch || false,
            phoneCode: formValues.phoneNumberSwitch || false,
            phoneNumber: formValues.phoneNumberSwitch || false,
            salaryRange: formValues.salarySwitch || false,
            yearOfInitiation: formValues.yearOfIniSwitch || false,
            nation: formValues.nationSwitch || false,
            region: formValues.regionSwitch || false,
          },
          ...body,
        };
        console.log(totalBody);
        updateProfile(totalBody)
          .then((res) => {
            if (res.success === 1) {
              props.login({
                currentChapter: formValues.currentChapter.chapterId,
                isLogin: true,
              });
              ToastsStore.info(res.message);
              setLoader(false);
              props.updatePage();
            } else {
              ToastsStore.error(res.error);
              setLoader(false);
            }
          })
          .catch((err) => {
            ToastsStore.error("Something went wrong!");
            setLoader(false);
          });
      } else {
        createProfile(body)
          .then((res) => {
            if (res.success === 1) {
              if (!isProfileCreated) {
                props.login({
                  isProfileCreated: true,
                  currentChapter: formValues.currentChapter.chapterId,
                  isLogin: true,
                });
              }
              ToastsStore.info(res.message);
              setLoader(false);
              props.updatePage();
            } else {
              ToastsStore.error(res.error);
              setLoader(false);
            }
          })
          .catch((err) => {
            ToastsStore.error("Something went wrong!");
            setLoader(false);
          });
      }
    }
  };

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + "px" }}
      ></div>
      <Modal
        isOpen={props.show}
        toggle={props.toggle}
        centered
        size="lg"
        className="signin"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          {loading ? (
            <div className="text-center ptb-100">
              <div className="custom-spinner">
                <Spinner color="danger" />
              </div>
            </div>
          ) : (
            <div className="plr-30 ptb-50 position-relative">
              <div
                className="cursor-pointer text-bold close"
                onClick={(e) => {
                  if (isProfileCreated) {
                    props.toggle();
                  } else {
                    alert("Please create your profile first!");
                  }
                }}
              >
                X
              </div>
              <div className="row mb-20">
                <h4 className="col-9 mb-15 text-bold">Profile Update</h4>
                {/* <div className="col-3 text-right">
                  <span
                    className="cursor-pointer text-bold"
                    onClick={(e) => {
                      if (isProfileCreated) {
                        props.toggle()
                      } else {
                        alert('Please create your profile first!')
                      }
                    }}
                  >
                    X
                  </span>
                </div> */}
              </div>

              <form>
                <div className="row mb-20 text-bold">
                  <div className={LEFT_CLASS}>Profile Details</div>
                  <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                </div>
                <div className="mb-15">
                  <Textarea
                    id="statusUpdate"
                    label="Status Update"
                    subtext="Max 140 characters"
                    placeholder="Status"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize={"fs-14 " + WIDTH_CLASS}
                    maxLength={140}
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.statusUpdateSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.statusUpdateSwitch}
                    disabled={!formValues.statusUpdateSwitch}
                    defaultValue={formValues.statusUpdate || ""}
                  />
                  <Error field="statusUpdate" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Prefix</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.prefixSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.prefixSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="prefix"
                    placeholder="Select Prefix"
                    options={PROFILE_OPTIONS.prefix}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.prefix = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.prefix || ""}
                  />
                  <Error field="prefix" />
                </div>
                <div className="mb-15">
                  <Input
                    id="firstName"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize="fs-14"
                    className={WIDTH_CLASS}
                    defaultValue={formValues.firstName || ""}
                  />
                  <Error field="firstName" />
                </div>
                <div className="mb-15">
                  <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    defaultValue={formValues.lastName || ""}
                  />
                  <Error field="lastName" />
                </div>
                <div className="mb-15">
                  <label className="fs-16 mb-5 text-dark">Suffix</label>
                  <Select
                    id="suffix"
                    placeholder="Select Suffix"
                    options={PROFILE_OPTIONS.suffix}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.suffix = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.suffix || ""}
                  />
                  <Error field="suffix" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Country</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.countrySwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.countrySwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="country"
                    placeholder="Select Country"
                    options={dropdown.country || []}
                    styles={SELECT_CSS}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.profileOptionsId}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.country = selectedOp;
                      setFormValues(ndata);
                      getState(selectedOp.profileOptionsId)
                        .then((res) => {
                          setState([...res.data]);
                        })
                        .catch((err) => {
                          ToastsStore.error(
                            "Failed to retrive State list. Please try again later!"
                          );
                        });
                    }}
                    value={formValues.country || ""}
                  />
                  <Error field="country" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">State</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.stateSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.stateSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="state"
                    placeholder="Select State"
                    options={stateList}
                    styles={SELECT_CSS}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.id}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.state = selectedOp;
                      ndata.city = '';
                      setFormValues(ndata);
                      getCity(selectedOp.id)
                        .then((res) => {
                          setCity([...res.data.city]);
                        })
                        .catch((err) => {
                          ToastsStore.error(
                            "Failed to retrive City list. Please try again later!"
                          );
                        });
                    }}
                    value={formValues.state || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.country
                          ? "Select Country first"
                          : "No States Found"}
                      </>
                    )}
                  />
                  <Error field="state" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">City</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.citySwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.citySwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="city"
                    placeholder="Select City"
                    options={cityList}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.id}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.city = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.city || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.state ? "Select State first" : "No City Found"}
                      </>
                    )}
                  />
                  <Error field="city" />
                </div>
                <div className="mb-15">
                  <Input
                    id="address"
                    label="Street Address"
                    placeholder="Street Address"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.addressSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.addressSwitch || false}
                    defaultValue={formValues.address || ""}
                  />
                  <Error field="address" />
                </div>
                <div className="mb-15 position-relative">
                  <Input
                    id="zip"
                    label="Zip"
                    placeholder="Zip"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.zipSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.zipSwitch || false}
                    defaultValue={formValues.zip || ""}
                  />
                  <Error field="zip" />
                </div>
                <div className="row mb-15 mlr-0">
                  <div className="col-12 position-relative plr-0">
                    <label className="fs-16 mb-5 text-dark">Phone Number</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.phoneNumberSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.phoneNumberSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 pl-0">
                    <Select
                      id="phoneCode"
                      placeholder="Country Code"
                      options={dropdown.phoneCode || []}
                      getOptionLabel={(op) => op.name}
                      getOptionValue={(op) => op.profileOptionsId}
                      styles={{
                        control: (value) => {
                          return {
                            ...value,
                            minHeight: "44px",
                          };
                        },
                        placeholder: (defaultStyles) => {
                          return {
                            ...defaultStyles,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontSize: "14px",
                          };
                        },
                        menu: (provided, state) => ({
                          ...provided,
                        }),
                      }}
                      onChange={(selectedOp) => {
                        let ndata = { ...formValues };
                        ndata.phoneCode = selectedOp;
                        setFormValues(ndata);
                      }}
                      value={formValues.phoneCode || ""}
                    />
                  </div>
                  <div className="col-8 col-lg-9 col-sm-8 col-md-9 col-xl-9 plr-0">
                    <Input
                      id="phoneNumber"
                      placeholder="Phone Number"
                      type="number"
                      fontSize={"fs-16 text-dark"}
                      className={window.innerWidth >= 1024 ? "wp-73" : "wp-100"}
                      contentFontSize="fs-14"
                      switchPresent={false}
                      defaultValue={formValues.phoneNumber || ""}
                    />
                  </div>
                  {(ErrorList["phoneCode"] || ErrorList["phoneNumber"]) && (
                    <div className={"col-12"} style={{ color: '#e20000' }}>
                      {ErrorList["phoneCode"]
                        ? ErrorList["phoneCode"]
                        : ErrorList["phoneNumber"]}
                    </div>
                  )}
                </div>
                <div className="mb-15">
                  <Input
                    label="Email"
                    placeholder="Email"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.emailSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.emailSwitch || false}
                    defaultValue={props.profile.profile.email || ""}
                    disabled={true}
                  />
                </div>
                <div className="mb-15">
                  <Input
                    label="Member ID"
                    placeholder="Member ID"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.memberCodeSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.memberCodeSwitch || false}
                    disabled={true}
                    defaultValue={props.profile.profile.memberCode || ""}
                  />
                </div>
                <div className="mb-15">
                  <Textarea
                    id="biography"
                    label="Biography"
                    subtext="Max 1000 characters"
                    placeholder="Biography"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize={"fs-14 " + WIDTH_CLASS}
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.biographySwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.biographySwitch}
                    maxLength={1000}
                    defaultValue={formValues.biography || ""}
                  />
                  <Error field="biography" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Occupation</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.occupationSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.occupationSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="occupation"
                    placeholder="Select Occupation"
                    options={dropdown.occupation || []}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.profileOptionsId}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.occupation = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.occupation || ""}
                  />
                  <Error field="occupation" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Industry</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.industrySwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.industrySwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="industry"
                    placeholder="Select Industry"
                    options={dropdown.industry || []}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.profileOptionsId}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.industry = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.industry || ""}
                  />
                  <Error field="industry" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Education</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.educationSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.educationSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <FieldArray
                    name="education"
                    render={({ remove, push }) => (
                      <div>
                        {formValues.education &&
                          formValues.education.length > 0 &&
                          formValues.education.map((edu, index) => (
                            <div key={index} className="">
                              <div name={`education.${index}`}>
                                <div className="text-right">
                                  <span
                                    className="material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                      let array = formValues.education;
                                      array.splice(index, 1);

                                      let ndata = { ...formValues };
                                      ndata.education = array;
                                      setFormValues(ndata);
                                    }}
                                  >delete</span>
                                </div>
                                <div className="">
                                  <Select
                                    placeholder="Select University"
                                    options={dropdown.university || []}
                                    getOptionLabel={(op) => op.name}
                                    getOptionValue={(op) => op.profileOptionsId}
                                    styles={SELECT_CSS}
                                    onChange={(selectedOp) => {
                                      let ndata = { ...formValues };
                                      if (ndata.education[index]) {
                                        ndata.education[index].university = selectedOp;
                                      }
                                      setFormValues(ndata);
                                    }}
                                    name={`education.${index}.university`}
                                    value={formValues.education[index] ? (formValues.education[index].university || "") : ''}
                                  />
                                  <Error2 field="university" index={index} />
                                </div>
                                <div className="mt-10">
                                  <Select
                                    placeholder="Select Degree"
                                    options={PROFILE_OPTIONS.degree}
                                    styles={SELECT_CSS}
                                    onChange={(selectedOp) => {

                                      let ndata = { ...formValues };
                                      if (ndata.education[index]) {
                                        ndata.education[index].degree = selectedOp;
                                      }
                                      setFormValues(ndata);
                                    }}
                                    name={`education.${index}.degree`}
                                    value={formValues.education[index] ? (formValues.education[index].degree || "") : ''}
                                  />
                                  <Error2 field="degree" index={index} />
                                </div>
                              </div>
                            </div>
                          ))}
                        <div className="mt-10">
                          <button
                            className="c-btn c-info form-button"
                            type="button"
                            onClick={() => {
                              let ndata = { ...formValues }, edcn = formValues.education;
                              edcn.push({ university: "", degree: "" });
                              ndata.education = edcn;
                              setFormValues(ndata);
                            }}
                            style={{ width: "fit-content", marginTop: "10px" }}
                          >
                            + Add
                          </button>
                        </div>
                        <div className="reset mt-10">
                          <button
                            className="c-btn c-danger form-button"
                            type="button"
                            onClick={(event) => {
                              let ndata = { ...formValues };
                              ndata.education = [];
                              setFormValues(ndata);
                            }}
                            style={{ width: "fit-content" }}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  />
                  <Error field="education" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">
                      Certification
                    </label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.certificationSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.certificationSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <MultiSelect
                    id="certification"
                    options={dropdown.certification.map((el) => {
                      return {
                        label: el.name,
                        value: el.profileOptionsId,
                      };
                    })}
                    value={formValues.certification || []}
                    onChange={(value) => {
                      let ndata = { ...formValues };
                      ndata.certification = value;
                      setFormValues(ndata);
                    }}
                    className={WIDTH_CLASS}
                  />
                  <Error field="certification" />
                </div>
                <div className="mb-15">
                  <Input
                    id="leadershipRole"
                    label="Leadership Role"
                    placeholder="Leadership Role"
                    type="text"
                    fontSize={"fs-16 text-dark"}
                    className={WIDTH_CLASS}
                    contentFontSize="fs-14"
                    switchPresent={isProfileCreated}
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.roleSwitch = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.roleSwitch || false}
                    defaultValue={formValues.leadershipRole || ""}
                  />
                  <Error field="leadershipRole" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Household</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.householdSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.householdSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="household"
                    placeholder="Select Household"
                    options={PROFILE_OPTIONS.houseHold}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.household = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.household || ""}
                  />
                  <Error field="household" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Salary Range</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.salarySwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.salarySwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="salaryRange"
                    placeholder="Select Salary Range"
                    options={PROFILE_OPTIONS.salaryRange}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.salaryRange = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.salaryRange || ""}
                  />
                  <Error field="salaryRange" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Expertise</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.expertiseSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.expertiseSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <MultiSelect
                    id="expertise"
                    options={PROFILE_OPTIONS.expertise}
                    value={formValues.expertise || []}
                    onChange={(value) => {
                      let ndata = { ...formValues };
                      ndata.expertise = value;
                      setFormValues(ndata);
                    }}
                    className={WIDTH_CLASS}
                  />
                  <Error field="expertise" />
                </div>
                <div className="row mb-20 mt-30 text-bold">
                  <div className={LEFT_CLASS}>Organizational Data</div>
                  <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Nation</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.nationSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.nationSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="nation"
                    placeholder="Select Nation"
                    options={nationList}
                    getOptionLabel={(op) => op.nationName}
                    getOptionValue={(op) => op.nationId}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.nation = selectedOp;
                      ndata.region = '';
                      ndata.organizationalState = '';
                      ndata.currentChapter = '';
                      setFormValues(ndata);

                      setOrganizationalState([]);
                      setCity([]);
                      setChapter([]);
                      getRegion(selectedOp?.nationId)
                        .then((res) => {
                          setRegionList([...res.data]);
                        })
                        .catch((err) => {
                          ToastsStore.error(
                            "Failed to retrive Nation list. Please try again later!"
                          );
                        });
                    }}
                    value={formValues.nation || ""}
                  />
                  <Error field="nation" />
                </div>

                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Region</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.regionSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.regionSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="region"
                    placeholder="Select Region"
                    options={regionList}
                    getOptionLabel={(op) => op.regionName}
                    getOptionValue={(op) => op.regionId}
                    styles={SELECT_CSS}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.region = selectedOp;
                      ndata.organizationalState = '';
                      ndata.currentChapter = '';
                      setFormValues(ndata);
                      setCity([]);
                      setChapter([]);
                      getStateFromRegion(selectedOp?.regionId)
                        .then((res) => {
                          setOrganizationalState([...res.data]);
                        })
                        .catch((err) => {
                          ToastsStore.error(
                            "Failed to retrive Region list. Please try again later!"
                          );
                        });
                    }}
                    value={formValues.region || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.nation
                          ? "Select nation first"
                          : "No Region Found"}
                      </>
                    )}
                  />
                  <Error field="region" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">
                      Organizational State
                    </label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.organizationalStateSwich = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.organizationalStateSwich}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="organizationalState"
                    placeholder="Select Organizational State"
                    options={organizationalStateList}
                    styles={SELECT_CSS}
                    getOptionLabel={(op) => op.name}
                    getOptionValue={(op) => op.id}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.organizationalState = selectedOp;
                      ndata.currentChapter = '';
                      setFormValues(ndata);
                      getChapter(selectedOp.id)
                        .then((res) => {
                          setChapter([...res.data]);
                        })
                        .catch((err) => {
                          ToastsStore.error(
                            "Failed to retrive chapter list. Please try again later!"
                          );
                        });
                    }}
                    value={formValues.organizationalState || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.region
                          ? "Select Region first"
                          : "No States Found"}
                      </>
                    )}
                  />
                  <Error field="organizationalState" />
                </div>
                <div className="mb-15 position-relative">
                  <label className="fs-16 mb-5 text-dark">
                    Section of Initiation
                  </label>
                  {isProfileCreated && (
                    <Switch
                      onChange={(checked) => {
                        let ndata = { ...formValues };
                        ndata.chapOfIniSwitch = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.chapOfIniSwitch}
                      onColor="#EAEAEA"
                      onHandleColor={HEADER_COLOR}
                      handleDiameter={10}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={15}
                      width={40}
                      className="profile-switch"
                    />
                  )}
                  <Select
                    id="chapterOfInitiation"
                    placeholder="Select Section of Initiation"
                    options={chapterOfIntiationList}
                    styles={SELECT_CSS}
                    getOptionLabel={(op) => op.chapterName}
                    getOptionValue={(op) => op.chapterId}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.chapterOfInitiation = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.chapterOfInitiation || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.chapterOfInitiation
                          ? "Select Organizational State first"
                          : "No Section Found"}
                      </>
                    )}
                  />
                  <Error field="chapterOfInitiation" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">
                      Year of Initiation
                    </label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.yearOfIniSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.yearOfIniSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <input
                    type="date"
                    id="yearOfIni"
                    className={
                      WIDTH_CLASS + " date-picker text-dark pa-10 fs-14"
                    }
                    onChange={(e) => {
                      let ndata = { ...formValues };
                      ndata.yearOfIni = e.target.value;
                      setFormValues(ndata);
                    }}
                    value={formValues.yearOfIni || ""}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <Error field="yearOfIni" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">
                      Current Section
                    </label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          let ndata = { ...formValues };
                          ndata.currentChapSwitch = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.currentChapSwitch}
                        onColor="#EAEAEA"
                        onHandleColor={HEADER_COLOR}
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={40}
                        className="profile-switch"
                      />
                    )}
                  </div>
                  <Select
                    id="currentChapter"
                    placeholder="Select Current Section"
                    options={chapterList}
                    styles={SELECT_CSS}
                    getOptionLabel={(op) => op.chapterName}
                    getOptionValue={(op) => op.chapterId}
                    onChange={(selectedOp) => {
                      let ndata = { ...formValues };
                      ndata.currentChapter = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.currentChapter || ""}
                    noOptionsMessage={() => (
                      <>
                        {!formValues.organizationalStateSwich
                          ? "Select Organizational State first"
                          : "No Section Found"}
                      </>
                    )}
                  />
                  <Error field="currentChapter" />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-rounded button plr-50 ptb-10 mt-20"
                    onClick={(e) => handleForm(e)}
                    disabled={loader}
                  >
                    {loader ? "SAVING..." : "SAVE"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Wrapper>
      </Modal>
    </div>
  );
};

export default compose(enhancer, connect(null, { login }))(EditProfile);
