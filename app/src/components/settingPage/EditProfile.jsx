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
  const [formValues, setFormValues] = useState(props.profile);

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
          let ndata = { ...formValues };
          ndata.profile.expertises = exp;
          setFormValues(ndata);
        }
        if (props.profile.profile.certifications) {
          const cert = props.profile.profile.certifications.map((ex) => {
            return {
              label: ex.name,
              value: ex.id,
            };
          });
          let ndata = { ...formValues };
          ndata.profile.certifications = cert;
          setFormValues(ndata);
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
          let ndata = { ...formValues };
          ndata.profile.educations = edu;
          setFormValues(ndata);
        }
        if (props.profile.profile.yearOfInitiation) {
          const YOI = props.profile.profile.yearOfInitiation.split("/");

          let ndata = { ...formValues };
          ndata.profile.yearOfInitiation = YOI[2] + "-" + YOI[1] + "-" + YOI[0];
          setFormValues(ndata);
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
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.visible.statusUpdate = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.statusUpdate}
                    disabled={!formValues.visible.statusUpdate}
                    defaultValue={formValues.profile.statusUpdate || ""}
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
                          ndata.visible.prefix = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.prefix}
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
                      ndata.profile.prefix = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.prefix || ""}
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
                    defaultValue={formValues.profile.firstName || ""}
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
                    defaultValue={formValues.profile.lastName || ""}
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
                      ndata.profile.suffix = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.suffix || ""}
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
                          ndata.visible.country = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.country}
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
                      ndata.profile.country = selectedOp;
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
                    value={formValues.profile.country || ""}
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
                          ndata.visible.state = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.state}
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
                      ndata.profile.state = selectedOp;
                      ndata.profile.city = '';
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
                    value={formValues.profile.state || ""}
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
                          let ndata = { ...formValues };
                          ndata.visible.city = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.city}
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
                      ndata.profile.city = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.city || ""}
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
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.visible.address = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.address || false}
                    defaultValue={formValues.profile.address || ""}
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
                      ndata.visible.zipcode = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.zipcode || false}
                    defaultValue={formValues.profile.zipcode || ""}
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
                          ndata.visible.phoneNumber = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.phoneNumber}
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
                        ndata.profile.phoneCode = selectedOp;
                        setFormValues(ndata);
                      }}
                      value={formValues.profile.phoneCode || ""}
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
                      defaultValue={formValues.profile.phoneNumber || ""}
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
                    switchChange={(checked) => {
                      let ndata = { ...formValues };
                      ndata.visible.email = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.email || false}
                    defaultValue={formValues.profile.email || ""}
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
                      ndata.visible.memberCode = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.memberCode || false}
                    disabled={true}
                    defaultValue={formValues.profile.memberCode || ""}
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
                      ndata.visible.biography = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.biography}
                    maxLength={1000}
                    defaultValue={formValues.profile.biography || ""}
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
                          ndata.visible.occupation = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.occupation}
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
                      ndata.profile.occupation = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.occupation || ""}
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
                          ndata.visible.industry = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.industry}
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
                      ndata.profile.industry = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.industry || ""}
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
                          ndata.visible.educations = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.educations}
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
                                      let ndata = { ...formValues };
                                      ndata.profile.educations[index] = array;
                                      setFormValues(ndata);
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
                                      //setFieldTouched(`education`, true, true);
                                      // setFieldValue(
                                      //   `education.${index}.university`,
                                      //   selectedOp
                                      // );
                                      let ndata = { ...formValues };
                                      if (ndata.profile.educations[index]) {
                                        ndata.profile.educations[index].university = selectedOp;
                                      }
                                      setFormValues(ndata);
                                    }}
                                    name={`education.${index}.university`}
                                    //value={edu.university || ""}
                                    value={formValues.profile.educations[index] ? (formValues.profile.educations[index].university || "") : ''}
                                  />
                                  <Error2 field="university" index={index} />
                                </div>
                                <div className="mt-10">
                                  <Select
                                    placeholder="Select Degree"
                                    options={PROFILE_OPTIONS.degree}
                                    styles={SELECT_CSS}
                                    onChange={(selectedOp) => {
                                      // setFieldTouched(`education`, true, true);
                                      // setFieldValue(
                                      //   `education.${index}.degree`,
                                      //   selectedOp
                                      // );
                                      let ndata = { ...formValues };
                                      if (ndata.profile.educations[index]) {
                                        ndata.profile.educations[index].degree = selectedOp;
                                      }
                                      setFormValues(ndata);
                                    }}
                                    name={`education.${index}.degree`}
                                    //value={edu.degree || ""}
                                    value={formValues.profile.educations[index] ? (formValues.profile.educations[index].degree || "") : ''}
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
                              //setFieldTouched("education", true, true);
                              //setFieldValue("education", []);
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
                          let ndata = { ...formValues };
                          ndata.visible.certification = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.certification}
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
                    value={formValues.profile.certifications || []}
                    onChange={(value) => {
                      let ndata = { ...formValues };
                      ndata.profile.certifications = value;
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
                      ndata.visible.leadershipRole = checked;
                      setFormValues(ndata);
                    }}
                    checked={formValues.visible.leadershipRole || false}
                    defaultValue={formValues.profile.leadershipRole || ""}
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
                          ndata.visible.household = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.household}
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
                      ndata.profile.household = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.household || ""}
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
                          ndata.visible.salaryRange = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.salaryRange}
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
                      ndata.profile.salaryRange = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.salaryRange || ""}
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
                          ndata.visible.expertise = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.expertise}
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
                      let ndata = { ...formValues };
                      ndata.profile.expertises = value;
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
                          ndata.visible.nation = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.nation}
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
                      // setFieldTouched("nation", true, true);
                      // setFieldValue("nation", selectedOp);
                      // setFieldValue("region", "");
                      // setFieldValue("organizationalState", "");
                      // setFieldValue("currentChapter", "");
                      let ndata = { ...formValues };
                      ndata.profile.nation = selectedOp;
                      ndata.profile.region = '';
                      ndata.profile.organizationalState = '';
                      ndata.profile.currentChapter = '';
                      setFormValues(ndata);
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
                    //value={values.nation || ""}
                    value={formValues.profile.nation || ""}
                  />
                  <Error field="nation" />
                </div>

                <div className="mb-15">
                  <div className="position-relative">
                    <label className="fs-16 mb-5 text-dark">Region</label>
                    {isProfileCreated && (
                      <Switch
                        onChange={(checked) => {
                          //setFieldValue("regionSwitch", checked);
                          let ndata = { ...formValues };
                          ndata.visible.region = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.region}
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
                      // setFieldTouched("region", true, true);
                      // setFieldValue("region", selectedOp);
                      // setFieldValue("organizationalState", "");
                      // setFieldValue("currentChapter", "");
                      let ndata = { ...formValues };
                      ndata.profile.region = selectedOp;
                      ndata.profile.organizationalState = '';
                      ndata.profile.currentChapter = '';
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
                    //value={values.region || ""}
                    value={formValues.profile.region || ""}
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
                          //setFieldValue("organizationalStateSwich", checked);
                          let ndata = { ...formValues };
                          ndata.visible.organizationalState = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.organizationalState}
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
                      // setFieldTouched("organizationalState", true, true);
                      // setFieldValue("organizationalState", selectedOp);
                      // setFieldValue("currentChapter", "");
                      let ndata = { ...formValues };
                      ndata.profile.organizationalState = selectedOp;
                      ndata.profile.currentChapter = '';
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
                    //value={values.organizationalState || ""}
                    value={formValues.profile.organizationalState || ""}
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
                        //setFieldValue("chapOfIniSwitch", checked);
                        let ndata = { ...formValues };
                        ndata.visible.chapterOfInitiation = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.visible.chapterOfInitiation}
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
                      // setFieldTouched("chapterOfInitiation", true, true);
                      // setFieldValue("chapterOfInitiation", selectedOp);
                      let ndata = { ...formValues };
                      ndata.profile.chapterOfInitiation = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.chapterOfInitiation || ""}
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
                          //setFieldValue("yearOfIniSwitch", checked);
                          let ndata = { ...formValues };
                          ndata.visible.yearOfInitiation = checked;
                          setFormValues(ndata);
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
                    //onChange={handleChange}
                    //onBlur={handleBlur}
                    //value={values.yearOfIni || ""}
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
                          //setFieldValue("currentChapSwitch", checked);
                          let ndata = { ...formValues };
                          ndata.visible.currentChapter = checked;
                          setFormValues(ndata);
                        }}
                        checked={formValues.visible.currentChapter}
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
                      // setFieldTouched("currentChapter", true, true);
                      // setFieldValue("currentChapter", selectedOp);
                      let ndata = { ...formValues };
                      ndata.profile.currentChapter = selectedOp;
                      setFormValues(ndata);
                    }}
                    value={formValues.profile.currentChapter || ""}
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
