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

  useEffect(() => {
    getDropdown()
      .then((res) => {
        setDropdown(res.data);
        if (props.profile.profile.expertises) {
          const exp = props.profile.profile.expertises.map((ex) => {
            return {
              label: ex.name,
              value: ex.id,
            };
          });          
          setFieldValue("expertise", exp);
        }
        if (props.profile.profile.certifications) {
          const cert = props.profile.profile.certifications.map((ex) => {
            return {
              label: ex.name,
              value: ex.id,
            };
          });
          //setFieldValue("certification", cert);
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
          //setFieldValue("education", edu);
        }
        if (props.profile.profile.yearOfInitiation) {
          const YOI = props.profile.profile.yearOfInitiation.split("/");
          //setFieldValue("yearOfIni", YOI[2] + "-" + YOI[1] + "-" + YOI[0]);
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

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return <div className="text-danger">{errors[field1]}</div>;
    } else {
      return <div />;
    }
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
    e.preventDefault();
    handleSubmit();
    if (isValid) {
      setLoader(true);
      let body = {
        statusUpdate: values.statusUpdate || null,
        prefixId: values.prefix.value,
        firstName: values.firstName,
        lastName: values.lastName,
        suffixId: values.suffix ? values.suffix.value : null,
        countryId: values.country.profileOptionsId,
        stateId: values.state.id,
        organizationalStateId: values.organizationalState.id,
        regionId: values.region.regionId,
        nationId: values.nation.nationId,
        cityId: values.city.id,
        address: values.address,
        zipcode: values.zip,
        phoneCodeId: values.phoneCode.profileOptionsId,
        phoneNumber: values.phoneNumber,
        biography: values.biography || null,
        occupationId: values.occupation.profileOptionsId,
        industryId: values.industry.profileOptionsId,
        educations: values.education.map((edu) => {
          return {
            degreeId: edu.degree.value,
            universityId: edu.university.profileOptionsId,
          };
        }),
        certificationId: values.certification
          ? values.certification.map((cert) => cert.value)
          : [],
        chapterOfInitiation: values.chapterOfInitiation.chapterId,
        // yearOfInitiation: values.yearOfIni,
        currentChapter: values.currentChapter.chapterId,
        leadershipRole: values.leadershipRole,
        householdId: values.household.value,
        salaryRangeId: values.salaryRange.value,
        expertiseIds: values.expertise.map((ex) => ex.value),
      };
      const YOI = values.yearOfIni.split("-");
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
            statusUpdate: values.statusUpdateSwitch || false,
            prefix: values.prefixSwitch || false,
            email: values.emailSwitch || false,
            memberCode: values.memberCodeSwitch || false,
            country: values.countrySwitch || false,
            state: values.stateSwitch || false,
            organizationalState: values.organizationalStateSwich || false,
            city: values.citySwitch || false,
            address: values.addressSwitch || false,
            zipcode: values.zipSwitch || false,
            biography: values.biographySwitch || false,
            certification: values.certificationSwitch || false,
            chapterOfInitiation: values.chapOfIniSwitch || false,
            currentChapter: values.currentChapSwitch || false,
            educations: values.educationSwitch || false,
            expertise: values.expertiseSwitch || false,
            household: values.householdSwitch || false,
            industry: values.industrySwitch || false,
            leadershipRole: values.roleSwitch || false,
            occupation: values.occupationSwitch || false,
            phoneCode: values.phoneNumberSwitch || false,
            phoneNumber: values.phoneNumberSwitch || false,
            salaryRange: values.salarySwitch || false,
            yearOfInitiation: values.yearOfIniSwitch || false,
            nation: values.nationSwitch || false,
            region: values.regionSwitch || false,
          },
          ...body,
        };
        updateProfile(totalBody)
          .then((res) => {
            if (res.success === 1) {
              props.login({
                currentChapter: values.currentChapter.chapterId,
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
                  currentChapter: values.currentChapter.chapterId,
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
                    switchChange={(checked) =>
                      setFieldValue("statusUpdateSwitch", checked)
                    }
                    checked={values.statusUpdateSwitch || false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.statusUpdate || ""}
                  />
                  <Error field="statusUpdate" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Prefix</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("prefixSwitch", checked);
                        }}
                        checked={values.prefixSwitch}
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
                      setFieldTouched("prefix", true, true);
                      setFieldValue("prefix", selectedOp);
                    }}
                    value={values.prefix || ""}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName || ""}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName || ""}
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
                      props.setFieldTouched("suffix", true, true);
                      props.setFieldValue("suffix", selectedOp);
                    }}
                    value={values.suffix || ""}
                  />
                  <Error field="suffix" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Country</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("countrySwitch", checked);
                        }}
                        checked={values.countrySwitch}
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
                      setFieldTouched("country", true, true);
                      setFieldValue("country", selectedOp);
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
                    value={values.country || ""}
                  />
                  <Error field="country" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">State</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("stateSwitch", checked);
                        }}
                        checked={values.stateSwitch}
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
                      setFieldTouched("state", true, true);
                      setFieldValue("state", selectedOp);
                      setFieldValue("city", "");
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
                    value={values.state || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.country
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
                          setFieldValue("citySwitch", checked);
                        }}
                        checked={values.citySwitch}
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
                      setFieldTouched("city", true, true);
                      setFieldValue("city", selectedOp);
                    }}
                    value={values.city || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.state ? "Select State first" : "No City Found"}
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
                    switchChange={(checked) =>
                      setFieldValue("addressSwitch", checked)
                    }
                    checked={values.addressSwitch || false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address || ""}
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
                    switchChange={(checked) =>
                      setFieldValue("zipSwitch", checked)
                    }
                    checked={values.zipSwitch || false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zip || ""}
                  />
                  <Error field="zip" />
                </div>
                <div className="row mb-15 mlr-0">
                  <div className="col-12 position-relative plr-0">
                    <label className="fs-16 mb-5 text-dark">Phone Number</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("phoneNumberSwitch", checked);
                        }}
                        checked={values.phoneNumberSwitch}
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
                        setFieldTouched("phoneCode", true, true);
                        setFieldValue("phoneCode", selectedOp);
                      }}
                      value={values.phoneCode || ""}
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber || ""}
                    />
                  </div>
                  {(errors["phoneCode"] || errors["phoneNumber"]) && (
                    <div className={"red--text col-12"}>
                      {errors["phoneCode"]
                        ? errors["phoneCode"]
                        : errors["phoneNumber"]}
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
                    switchChange={(checked) =>
                      setFieldValue("emailSwitch", checked)
                    }
                    checked={values.emailSwitch || false}
                    value={props.profile.profile.email || ""}
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
                    switchChange={(checked) =>
                      setFieldValue("memberCodeSwitch", checked)
                    }
                    checked={values.memberCodeSwitch || false}
                    disabled={true}
                    value={props.profile.profile.memberCode || ""}
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
                    switchChange={(checked) =>
                      setFieldValue("biographySwitch", checked)
                    }
                    checked={values.biographySwitch || false}
                    maxLength={1000}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.biography || ""}
                  />
                  <Error field="biography" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Occupation</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("occupationSwitch", checked);
                        }}
                        checked={values.occupationSwitch}
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
                      setFieldTouched("occupation", true, true);
                      setFieldValue("occupation", selectedOp);
                    }}
                    value={values.occupation || ""}
                  />
                  <Error field="occupation" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Industry</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("industrySwitch", checked);
                        }}
                        checked={values.industrySwitch}
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
                      setFieldTouched("industry", true, true);
                      setFieldValue("industry", selectedOp);
                    }}
                    value={values.industry || ""}
                  />
                  <Error field="industry" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Education</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("educationSwitch", checked);
                        }}
                        checked={values.educationSwitch}
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
                        {values.education &&
                          values.education.length > 0 &&
                          values.education.map((edu, index) => (
                            <div key={index} className="">
                              <div name={`education.${index}`}>
                                <div className="text-right">
                                  <i
                                    className="fa fa-trash-o cursor-pointer"
                                    aria-hidden="true"
                                    onClick={() => {
                                      let array = values.education;
                                      array.splice(index, 1);
                                      setFieldValue("education", array);
                                    }}
                                  ></i>
                                </div>

                                <div className="">
                                  <Select
                                    placeholder="Select University"
                                    options={dropdown.university || []}
                                    getOptionLabel={(op) => op.name}
                                    getOptionValue={(op) => op.profileOptionsId}
                                    styles={SELECT_CSS}
                                    onChange={(selectedOp) => {
                                      setFieldTouched(`education`, true, true);
                                      setFieldValue(
                                        `education.${index}.university`,
                                        selectedOp
                                      );
                                    }}
                                    name={`education.${index}.university`}
                                    value={edu.university || ""}
                                  />
                                  <Error2 field="university" index={index} />
                                </div>
                                <div className="mt-10">
                                  <Select
                                    placeholder="Select Degree"
                                    options={PROFILE_OPTIONS.degree}
                                    styles={SELECT_CSS}
                                    onChange={(selectedOp) => {
                                      setFieldTouched(`education`, true, true);
                                      setFieldValue(
                                        `education.${index}.degree`,
                                        selectedOp
                                      );
                                    }}
                                    name={`education.${index}.degree`}
                                    value={edu.degree || ""}
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
                              push({ university: "", degree: "" });
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
                              setFieldTouched("education", true, true);
                              setFieldValue("education", []);
                            }}
                            style={{ width: "fit-content" }}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  />
                  {((errors["education"] &&
                    touched["education"] &&
                    errors["education"].length <= 0) ||
                    (submitCount > 0 && errors["education"])) && (
                    <div className="text-danger">This field is required!</div>
                  )}
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">
                      Certification
                    </label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("certificationSwitch", checked);
                        }}
                        checked={values.certificationSwitch}
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
                    value={values.certification || []}
                    onChange={(value) => {
                      setFieldTouched("certification", true, true);
                      setFieldValue("certification", value);
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
                    switchChange={(checked) =>
                      setFieldValue("roleSwitch", checked)
                    }
                    checked={values.roleSwitch || false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.leadershipRole || ""}
                  />
                  <Error field="leadershipRole" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Household</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("householdSwitch", checked);
                        }}
                        checked={values.householdSwitch}
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
                      setFieldTouched("household", true, true);
                      setFieldValue("household", selectedOp);
                    }}
                    value={values.household || ""}
                  />
                  <Error field="household" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Salary Range</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("salarySwitch", checked);
                        }}
                        checked={values.salarySwitch}
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
                      setFieldTouched("salaryRange", true, true);
                      setFieldValue("salaryRange", selectedOp);
                    }}
                    value={values.salaryRange || ""}
                  />
                  <Error field="salaryRange" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Expertise</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("expertiseSwitch", checked);
                        }}
                        checked={values.expertiseSwitch}
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
                    value={values.expertise || []}
                    onChange={(value) => {
                      setFieldTouched("expertise", true, true);
                      setFieldValue("expertise", value);
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
                          setFieldValue("nationSwitch", checked);
                        }}
                        checked={values.nationSwitch}
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
                      setFieldTouched("nation", true, true);
                      setFieldValue("nation", selectedOp);
                      setFieldValue("region", "");
                      setFieldValue("organizationalState", "");
                      setFieldValue("currentChapter", "");
                      // setState([]);
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
                    value={values.nation || ""}
                  />
                  <Error field="nation" />
                </div>

                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Region</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          setFieldValue("regionSwitch", checked);
                        }}
                        checked={values.regionSwitch}
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
                      setFieldTouched("region", true, true);
                      setFieldValue("region", selectedOp);
                      setFieldValue("organizationalState", "");
                      setFieldValue("currentChapter", "");
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
                    value={values.region || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.nation
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
                          setFieldValue("organizationalStateSwich", checked);
                        }}
                        checked={values.organizationalStateSwich}
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
                      setFieldTouched("organizationalState", true, true);
                      setFieldValue("organizationalState", selectedOp);
                      setFieldValue("currentChapter", "");
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
                    value={values.organizationalState || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.region
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
                        setFieldValue("chapOfIniSwitch", checked);
                      }}
                      checked={values.chapOfIniSwitch}
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
                      setFieldTouched("chapterOfInitiation", true, true);
                      setFieldValue("chapterOfInitiation", selectedOp);
                    }}
                    value={values.chapterOfInitiation || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.organizationalStateSwich
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
                          setFieldValue("yearOfIniSwitch", checked);
                        }}
                        checked={values.yearOfIniSwitch}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.yearOfIni || ""}
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
                          setFieldValue("currentChapSwitch", checked);
                        }}
                        checked={values.currentChapSwitch}
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
                      setFieldTouched("currentChapter", true, true);
                      setFieldValue("currentChapter", selectedOp);
                    }}
                    value={values.currentChapter || ""}
                    noOptionsMessage={() => (
                      <>
                        {!values.organizationalStateSwich
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
