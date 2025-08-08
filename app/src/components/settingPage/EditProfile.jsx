import React, { useState, useEffect } from "react";
import Wrapper from "./common.style";
import { Modal } from "reactstrap";
import Input from "../../UI/input/InputWithSwitch";
import Checkbox from "../../UI/checkbox/checkbox";
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
  getState,
  getChapter,
  createProfile,
  updateProfile,
  getNation,
  getRegion,
  getStateFromRegion,
} from "../../api/memberAPI";
import { connect } from "react-redux";
import { compose } from "redux";
import AuthActions from "../../redux/auth/actions";
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
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
  const { values, errors, touched, submitCount } = props;

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
  const [chapterList, setChapter] = useState([]);
  const [chapterOfIntiationList, setChapterOfIntiation] = useState([]);
  const [formValues, setFormValues] = useState({ ...values });
  const [ErrorList, setErrorList] = useState({});
  const [isMinorCheck, setIsMinorCheck] = useState(false);
    
  let Tst = Toast();
  let Spn = Spinner();

  useEffect(() => {
    Spn.Show();
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
        if (props.profile.profile.volunteers) {
          const volInt = props.profile.profile.volunteers.map((vl) => {
            return {
              label: vl.name,
              value: vl.id,
            };
          });
          ndata.volunteerInterest = volInt;
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
        if (props.profile.profile.affilateOrgzn) {
          const affln = props.profile.profile.affilateOrgzn.map((aff) => {
            return {
              label: aff.name,
              value: aff.id,
            };
          });
          ndata.affilateOrgzn = affln;
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
        if (props.profile.profile.dob) {
          const DOB = props.profile.profile.dob.split("/");

          ndata.dob = DOB[2] + "-" + DOB[1] + "-" + DOB[0];
        }
        if (props.profile.profile.country) {
          getState(props.profile.profile.country.id)
            .then((res) => {
              setState([...res.data]);
            })
            .catch((err) => {
              Tst.Error(
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
              Tst.Error(
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
              Tst.Error(
                "Failed to retrive State list. Please try again later!"
              );
            });
        }

        if (props.profile.profile.organizationalState) {
          getChapter(props.profile.profile.organizationalState.id)
            .then((res) => {
              setChapter([
                { chapterId: 0, chapterName: "National Member" },
                ...res.data,
              ]);
            })
            .catch((err) => {
              Tst.Error(
                "Failed to retrive Section list. Please try again later!"
              );
            });
        }

        setLoading(false);
        Spn.Hide();
        setFormValues(ndata);
      })
      .catch((err) => {
        Tst.Error("Something went wrong!");
        props.history.push("/home");
      });
  }, []);

  useEffect(() => {
    getNation()
      .then((res) => {
        setNationList([...res.data]);
      })
      .catch((err) => {
        Tst.Error("Failed to retrive City list. Please try again later!");
      });
    getChapter(0)
      .then((res) => {
        setChapterOfIntiation([...res.data]);
      })
      .catch((err) => {
        Tst.Error("Failed to retrive Section list. Please try again later!");
      });
    setIsMinorCheck(props.profile.profile.gpConsent == 'Y');
  }, []);

  const Error = ({ field }) => {
    return ErrorList[field] ? (
      <div className="text-danger">{ErrorList[field]}</div>
    ) : (
      <></>
    );
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

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let sErrs = {};

    if (!el("firstName").value.trim()) {
        sErrs["firstName"] = "This field is required";
    }
    if (!el("lastName").value.trim()) {
        sErrs["lastName"] = "This field is required";
    }
    if (!el("phoneNumber").value) {
        sErrs["phoneNumber"] = "Pnone number is required";
    } else if (!phoneRegex.test(el("phoneNumber").value.trim())) {
        sErrs["phoneNumber"] = "Not a valid phone number";
    }
    if (!el("regVotWrdDist").value.trim()) {
        sErrs["regVotWrdDist"] = "This field is required";
    }
    const bEmailValue = el("bEmail").value.trim();
    if (bEmailValue && !emailRegex.test(bEmailValue)) {
        sErrs["bEmail"] = "Not a valid email address";
    }
    if(isMinorCheck) {
        const gpPhoneValue = el("gpPhone").value.trim();
        if (gpPhoneValue && !phoneRegex.test(gpPhoneValue)) {
            sErrs["gpPhone"] = "Not a valid phone number";
        }
        const gpEmailValue = el("gpEmail").value.trim();
        if (gpEmailValue && !emailRegex.test(gpEmailValue)) {
            sErrs["gpEmail"] = "Not a valid email address";
        }
    }

    setErrorList(sErrs);

    if (Object.keys(sErrs).length < 1) {
        setLoader(true);
        Spn.Show();
        let body = {
            prefixId:formValues.prefix ? formValues.prefix.value : null,
            firstName: el("firstName").value.trim(),
            middleName: el("middleName").value.trim() || null,
            lastName: el("lastName").value.trim(),
            suffixId: formValues.suffix ? formValues.suffix.value : null,
            racialIdentityId: formValues.racialIdentity ? formValues.racialIdentity.value : null,
            householdId: formValues.household ? formValues.household.value : null,
            biography: el("biography").value.trim() || null,

            phoneNumber: el("phoneNumber").value.trim(),
            bEmail: el("bEmail").value.trim() || null,
            address: el("address").value.trim() || null,
            address2: el("address2").value.trim() || null,
            cityId: el("city").value.trim() || null,
            stateId: formValues.state ? formValues.state.id : null,
            countryId: formValues.country ? formValues.country.profileOptionsId : null,
            zipcode: el("zip").value.trim() || null,

            employerName: el("employerName").value.trim() || null,
            occupationId: formValues.occupation ? formValues.occupation.profileOptionsId : null,
            employmentStatusId: formValues.employmentStatus ? formValues.employmentStatus.value : null,
            volunteerInterestId: formValues.volunteerInterest 
                ? formValues.volunteerInterest.map((vlInt) => vlInt.value) 
                : [],
            industryId: formValues.industry ? formValues.industry.profileOptionsId : null,
            educations: formValues.education
                ? formValues.education.map((edu) => {
                    return {
                        degreeId: edu?.degree?.value ?? null,
                        universityId: edu?.university?.profileOptionsId ?? null,
                    };
                    })
                : [],
            certificationId: formValues.certification
                ? formValues.certification.map((cert) => cert.value)
                : [],
            expertiseIds: formValues.expertise 
                ? formValues.expertise.map((ex) => ex.value) 
                : [],
            salaryRangeId: formValues.salaryRange ? formValues.salaryRange.value : null,

            affilateOrgznId: formValues.affilateOrgzn
                ? formValues.affilateOrgzn.map((affln) => affln.value)
                : [],
            nationId: formValues.nation ? formValues.nation.nationId : null,
            regionId: formValues.region ? formValues.region.regionId : null,
            organizationalStateId: formValues.organizationalState ? formValues.organizationalState.id : null,
            chapterOfInitiation: formValues.chapterOfInitiation ? formValues.chapterOfInitiation.chapterId : null,
            currentChapter: formValues.currentChapter ? formValues.currentChapter.chapterId : null,
            registeredVoting: el("regVotWrdDist").value.trim(),

            gpConsent: isMinorCheck,
            gpFirstName: isMinorCheck ? (el("gpFirstName").value.trim() || null) : null,
            gpLastName: isMinorCheck ? (el("gpLastName").value.trim() || null) : null,
            gpPhone: isMinorCheck ? (el("gpPhone").value.trim() || null) : null,
            gpEmail: isMinorCheck ? (el("gpEmail").value.trim() || null) : null,
      };
      const YOI = el("yearOfIni").value.trim().split("-");
      body.yearOfInitiation = YOI[2] + "/" + YOI[1] + "/" + YOI[0];
      const DOB = el("dob").value.trim().split("-");
      body.dob = DOB[2] + "/" + DOB[1] + "/" + DOB[0];
      if (isProfileCreated) {
        const totalBody = {
          profileVisibility: {
            prefix: formValues.prefixSwitch || false,
            firstName: props.profile.visible.firstName || true,
            middleName: props.profile.visible.middleName || true,
            lastName: props.profile.visible.lastName || true,
            suffix: props.profile.visible.suffix || true,
            dob: formValues.dobSwitch || false,
            racialIdentity: formValues.racialIdentitySwitch || false,
            household: formValues.householdSwitch || false,
            biography: formValues.biographySwitch || false,

            phoneNumber: formValues.phoneNumberSwitch || false,
            email: formValues.emailSwitch || false,
            businessEmailAddress: formValues.businessEmailSwitch || false,
            address: formValues.addressSwitch || false,
            address2: formValues.address2Switch || false,
            city: formValues.citySwitch || false,
            state: formValues.stateSwitch || false,
            country: formValues.countrySwitch || false,
            zipcode: formValues.zipSwitch || false,

            employerName: formValues.employerNameSwitch || false,
            occupation: formValues.occupationSwitch || false,
            employmentStatus: formValues.employmentStatusSwitch || false,
            volunteerInterest: formValues.volunteerInterestSwitch || false,
            industry: formValues.industrySwitch || false,
            educations: formValues.educationSwitch || false,
            certification: formValues.certificationSwitch || false,
            expertise: formValues.expertiseSwitch || false,
            salaryRange: formValues.salarySwitch || false,

            affilateOrgzn: formValues.affilateOrgznSwitch || false,
            nation: formValues.nationSwitch || false,
            region: formValues.regionSwitch || false,
            organizationalState: formValues.organizationalStateSwich || false,
            chapterOfInitiation: formValues.chapOfIniSwitch || false,
            yearOfInitiation: formValues.yearOfIniSwitch || false,
            currentChapter: formValues.currentChapSwitch || false,
            registeredVoting: formValues.regVotWrdDistSwitch || false,

            gpFirstName: formValues.gpFirstNameSwitch || false,
            gpLastName: formValues.gpLastNameSwitch || false,
            gpPhone: formValues.gpPhoneSwitch || false,
            gpEmail: formValues.gpEmailSwitch || false,

            profileImage: props.profile.visible.profileImage || true,
            memberId: store.getState().auth.memberId,
            profileVisibilityId: 0,
            
          },
          ...body,
        };

        updateProfile(totalBody)
            .then((res) => {
                if (res.success === 1) {
                    props.login({
                        currentChapter: formValues.currentChapter.chapterId,
                        isLogin: true,
                    });
                    Tst.Success(res.message);
                    setLoader(false);
                    Spn.Hide();
                    props.updatePage();
                } else {
                    Tst.Error(res.message || res.error);
                    setLoader(false);
                    Spn.Hide();
                }
            })
            .catch((err) => {
                Tst.Error("Something went wrong!");
                setLoader(false);
                Spn.Hide();
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
              Tst.Success(res.message);
              setLoader(false);
              Spn.Hide();
              props.updatePage();
            } else {
              Tst.Error(res.error);
              setLoader(false);
              Spn.Hide();
            }
          })
          .catch((err) => {
            Tst.Error("Something went wrong!");
            setLoader(false);
            Spn.Hide();
          });
      }
    }
  };

  return (
    <>
      {Tst.Obj}
      {Spn.Obj}
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
              <></>
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
                </div>

                <form>

                  <div className="row mb-20 text-bold">
                    <div className={LEFT_CLASS}>Personal Information</div>
                    <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
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
                      id="middleName"
                      label="Middle Name"
                      placeholder="Middle Name"
                      type="text"
                      fontSize={"fs-16 text-dark"}
                      contentFontSize="fs-14"
                      className={WIDTH_CLASS}
                      defaultValue={formValues.middleName || ""}
                    />
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
                  </div>
                  <div className="mb-15">
                    <div className="position-relative">
                      <label className="fs-16 mb-5 text-dark">
                        Date Of Birth
                      </label>
                      {isProfileCreated && (
                        <Switch
                          onChange={(checked) => {
                            let ndata = { ...formValues };
                            ndata.dobSwitch = checked;
                            setFormValues(ndata);
                          }}
                          checked={formValues.dobSwitch}
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
                      id="dob"
                      className={
                        WIDTH_CLASS + " date-picker text-dark pa-10 fs-14"
                      }
                      onChange={(e) => {
                        let ndata = { ...formValues };
                        ndata.dob = e.target.value;
                        setFormValues(ndata);
                      }}
                      value={formValues.dob || ""}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="mb-15">
                    <div className="position-relative">
                      <label className="fs-16 mb-5 text-dark">
                        Racial Identity
                      </label>
                      {isProfileCreated && (
                        <Switch
                          onChange={(checked) => {
                            let ndata = { ...formValues };
                            ndata.racialIdentitySwitch = checked;
                            setFormValues(ndata);
                          }}
                          checked={formValues.racialIdentitySwitch}
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
                      id="racialIdentity"
                      placeholder="Select Racial Identity"
                      options={PROFILE_OPTIONS.racialIdentity}
                      styles={SELECT_CSS}
                      onChange={(selectedOp) => {
                        let ndata = { ...formValues };
                        ndata.racialIdentity = selectedOp;
                        setFormValues(ndata);
                      }}
                      value={formValues.racialIdentity || ""}
                    />
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
                  </div>

                  <div className="row mb-20 text-bold">
                    <div className={LEFT_CLASS}>Contact Information</div>
                    <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                  </div>

                  <div className="mb-15 position-relative">
                    <Input
                      id="phoneNumber"
                      label="Phone Number"
                      placeholder="Phone Number"
                      type="text"
                      fontSize={"fs-16 text-dark"}
                      className={WIDTH_CLASS}
                      contentFontSize="fs-14"
                      switchPresent={isProfileCreated}
                      switchChange={(checked) => {
                        let ndata = { ...formValues };
                        ndata.phoneNumberSwitch = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.phoneNumberSwitch || false}
                      defaultValue={formValues.phoneNumber || ""}
                    />
                    <Error field="phoneNumber" />
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
                      id="bEmail"
                      label="Business Email Address"
                      placeholder="Business Email Address"
                      type="text"
                      fontSize={"fs-16 text-dark"}
                      className={WIDTH_CLASS}
                      contentFontSize="fs-14"
                      switchPresent={isProfileCreated}
                      switchChange={(checked) => {
                        let ndata = { ...formValues };
                        ndata.businessEmailSwitch = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.businessEmailSwitch || false}
                      defaultValue={formValues.businessEmail || ""}
                    />
                    <Error field="bEmail" />
                  </div>
                  <div className="mb-15">
                    <Input
                      id="address"
                      label="Address 1"
                      placeholder="Address 1"
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
                  </div>
                  <div className="mb-15">
                    <Input
                      id="address2"
                      label="Address 2"
                      placeholder="Address 2"
                      type="text"
                      fontSize={"fs-16 text-dark"}
                      className={WIDTH_CLASS}
                      contentFontSize="fs-14"
                      switchPresent={isProfileCreated}
                      switchChange={(checked) => {
                        let ndata = { ...formValues };
                        ndata.address2Switch = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.address2Switch || false}
                      defaultValue={formValues.address2 || ""}
                    />
                  </div>
                  <div className="mb-15">
                    <Input
                      id="city"
                      label="City"
                      placeholder="City"
                      type="text"
                      fontSize={"fs-16 text-dark"}
                      className={WIDTH_CLASS}
                      contentFontSize="fs-14"
                      switchPresent={isProfileCreated}
                      switchChange={(checked) => {
                        let ndata = { ...formValues };
                        ndata.citySwitch = checked;
                        setFormValues(ndata);
                      }}
                      checked={formValues.citySwitch || false}
                      defaultValue={formValues.city || ""}
                    />
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
                        ndata.state = "";
                        setFormValues(ndata);
                        getState(selectedOp.profileOptionsId)
                          .then((res) => {
                            setState([...res.data]);
                          })
                          .catch((err) => {
                            Tst.Error(
                              "Failed to retrive State list. Please try again later!"
                            );
                          });
                      }}
                      value={formValues.country || ""}
                    />
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
                        ndata.city = "";
                        setFormValues(ndata);
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
                  </div>

                    <div className="row mb-20 text-bold">
                        <div className={LEFT_CLASS}>Professional Information</div>
                        <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                    </div>
                    <div className="mb-15">
                        <Input
                            id="employerName"
                            label="Employer Name"
                            placeholder="Employer Name"
                            type="text"
                            fontSize={"fs-16 text-dark"}
                            className={WIDTH_CLASS}
                            contentFontSize="fs-14"
                            switchPresent={isProfileCreated}
                            switchChange={(checked) => {
                                let ndata = { ...formValues };
                                ndata.employerNameSwitch = checked;
                                setFormValues(ndata);
                            }}
                            checked={formValues.employerNameSwitch || false}
                            defaultValue={formValues.employerName || ""}
                        />
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
                    </div>
                    <div className="mb-15">
                        <div className="position-relative">
                        <label className="fs-16 mb-5 text-dark">
                            Employment Status
                        </label>
                        {isProfileCreated && (
                            <Switch
                            onChange={(checked) => {
                                let ndata = { ...formValues };
                                ndata.employmentStatusSwitch = checked;
                                setFormValues(ndata);
                            }}
                            checked={formValues.employmentStatusSwitch}
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
                        id="employmentStatus"
                        placeholder="Select Employment Status"
                        options={PROFILE_OPTIONS.employmentStatus}
                        styles={SELECT_CSS}
                        onChange={(selectedOp) => {
                            let ndata = { ...formValues };
                            ndata.employmentStatus = selectedOp;
                            setFormValues(ndata);
                        }}
                        value={formValues.employmentStatus || ""}
                        />
                    </div>
                    <div className="mb-15">
                        <div className="position-relative">
                        <label className="fs-16 mb-5 text-dark">
                            Volunteer/My Interest
                        </label>
                        {isProfileCreated && (
                            <Switch
                            onChange={(checked) => {
                                let ndata = { ...formValues };
                                ndata.volunteerInterestSwitch = checked;
                                setFormValues(ndata);
                            }}
                            checked={formValues.volunteerInterestSwitch}
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
                            id="volunteerInterest"
                            options={PROFILE_OPTIONS.volunteerInterest}
                            value={formValues.volunteerInterest.length > 0 ? formValues.volunteerInterest : []}
                            onChange={(value) => {
                                let ndata = { ...formValues };
                                ndata.volunteerInterest = value;
                                setFormValues(ndata);
                            }}
                            className={WIDTH_CLASS}
                        />
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
                                        >
                                        delete
                                        </span>
                                    </div>
                                    <div className="">
                                        <Select
                                        placeholder="Select University"
                                        options={dropdown.university || []}
                                        getOptionLabel={(op) => op.name}
                                        getOptionValue={(op) =>
                                            op.profileOptionsId
                                        }
                                        styles={SELECT_CSS}
                                        onChange={(selectedOp) => {
                                            let ndata = { ...formValues };
                                            if (ndata.education[index]) {
                                            ndata.education[index].university =
                                                selectedOp;
                                            }
                                            setFormValues(ndata);
                                        }}
                                        name={`education.${index}.university`}
                                        value={
                                            formValues.education[index]
                                            ? formValues.education[index]
                                                .university || ""
                                            : ""
                                        }
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
                                            ndata.education[index].degree =
                                                selectedOp;
                                            }
                                            setFormValues(ndata);
                                        }}
                                        name={`education.${index}.degree`}
                                        value={
                                            formValues.education[index]
                                            ? formValues.education[index]
                                                .degree || ""
                                            : ""
                                        }
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
                                    let ndata = { ...formValues },
                                    edcn = formValues.education;
                                    edcn.push({ university: "", degree: "" });
                                    ndata.education = edcn;
                                    setFormValues(ndata);
                                }}
                                style={{
                                    width: "fit-content",
                                    marginTop: "10px",
                                }}
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
                    </div>
                    <div className="mb-15">
                        <div className="position-relative">
                        <label className="fs-16 mb-5 text-dark">
                            Salary Range
                        </label>
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
                    </div>

                    <div className="row mb-20 text-bold">
                        <div className={LEFT_CLASS}>Organizational Information</div>
                        <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                    </div>

                    <div className="mb-15">
                        <div className="position-relative">
                        <label className="fs-16 mb-5 text-dark">
                            Affiliate Organization
                        </label>
                        {isProfileCreated && (
                            <Switch
                            onChange={(checked) => {
                                let ndata = { ...formValues };
                                ndata.affilateOrgznSwitch = checked;
                                setFormValues(ndata);
                            }}
                            checked={formValues.affilateOrgznSwitch}
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
                            id="affilateOrgzn"
                            options={dropdown.affiliation.map((el) => {
                                return {
                                label: el.name,
                                value: el.profileOptionsId,
                                };
                            })}
                            value={formValues.affilateOrgzn.length > 0 ? formValues.affilateOrgzn : []}
                            onChange={(value) => {
                                let ndata = { ...formValues };
                                ndata.affilateOrgzn = value;
                                setFormValues(ndata);
                            }}
                            className={WIDTH_CLASS}
                        />
                    </div>
                    <div className="mb-5">
                        <div className="position-relative">
                        <label className="fs-16 mb-5 text-dark">Organizational Section</label><br />
                        <label className="fs-13 mb-5 text-dark org-sub-ttl">Country</label>
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
                        placeholder="Select Country"
                        options={nationList}
                        getOptionLabel={(op) => op.nationName}
                        getOptionValue={(op) => op.nationId}
                        styles={SELECT_CSS}
                        onChange={(selectedOp) => {
                            let ndata = { ...formValues };
                            ndata.nation = selectedOp;
                            ndata.region = "";
                            ndata.organizationalState = "";
                            ndata.currentChapter = "";
                            setFormValues(ndata);

                            setOrganizationalState([]);
                            setChapter([]);
                            getRegion(selectedOp?.nationId)
                            .then((res) => {
                                setRegionList([...res.data]);
                            })
                            .catch((err) => {
                                Tst.Error(
                                "Failed to retrieve the country list. Please try again later!"
                                );
                            });
                        }}
                        value={formValues.nation || ""}
                        />
                    </div>

                    <div className="mb-5">
                        <div className="position-relative">
                        <label className="fs-13 mb-5 text-dark org-sub-ttl">Region</label>
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
                            ndata.organizationalState = "";
                            ndata.currentChapter = "";
                            setFormValues(ndata);
                            setChapter([]);
                            getStateFromRegion(selectedOp?.regionId)
                            .then((res) => {
                                setOrganizationalState([...res.data]);
                            })
                            .catch((err) => {
                                Tst.Error(
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
                    </div>

                    <div className="mb-5">
                        <div className="position-relative">
                        <label className="fs-13 mb-5 text-dark org-sub-ttl">
                            State
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
                        placeholder="Select State"
                        options={organizationalStateList}
                        styles={SELECT_CSS}
                        getOptionLabel={(op) => op.name}
                        getOptionValue={(op) => op.id}
                        onChange={(selectedOp) => {
                            let ndata = { ...formValues };
                            ndata.organizationalState = selectedOp;
                            ndata.currentChapter = "";
                            setFormValues(ndata);
                            getChapter(selectedOp.id)
                            .then((res) => {
                                setChapter([...res.data]);
                            })
                            .catch((err) => {
                                Tst.Error(
                                "Failed to retrive section list. Please try again later!"
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
                    </div>
                    <div className="mb-15">
                        <div className="position-relative">
                        <label className="fs-13 mb-5 text-dark org-sub-ttl">
                            Section
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
                        placeholder="Select Section"
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
                    </div>
                    <div className="mb-15">
                        <Input
                        id="regVotWrdDist"
                        label="Registered Voting Precinct / Ward / District"
                        placeholder="Registered Voting Precinct / Ward / District"
                        type="text"
                        fontSize={"fs-16 text-dark"}
                        className={WIDTH_CLASS}
                        contentFontSize="fs-14"
                        switchPresent={isProfileCreated}
                        switchChange={(checked) => {
                            let ndata = { ...formValues };
                            ndata.regVotWrdDistSwitch = checked;
                            setFormValues(ndata);
                        }}
                        checked={formValues.regVotWrdDistSwitch || false}
                        defaultValue={formValues.regVotWrdDist || ""}
                        />
                        <Error field="regVotWrdDist" />
                    </div>
                    

                    <div className="row mb-20 text-bold">
                        <Checkbox
                            id="isMinor"
                            name="isMinor"
                            label="I consent that I am the Guardian or Parent completing this Youth’s Profile"
                            checked={isMinorCheck}
                            onChange={(e) => {
                                setIsMinorCheck(!isMinorCheck);                                
                            }}
                        />
                    </div>
                    {isMinorCheck && (
                        <>
                            <div className="row mb-20 text-bold">
                                <div className={LEFT_CLASS}>Guardian / Parental information</div>
                                <div className={RIGHT_CLASS + " text-right"}>Hide/Show</div>
                            </div>
                            <div className="mb-15">
                                <Input
                                    id="gpFirstName"
                                    label="First Name"
                                    placeholder="First Name"
                                    type="text"
                                    fontSize={"fs-16 text-dark"}
                                    className={WIDTH_CLASS}
                                    contentFontSize="fs-14"
                                    switchPresent={isProfileCreated}
                                    switchChange={(checked) => {
                                    let ndata = { ...formValues };
                                    ndata.gpFirstNameSwitch = checked;
                                    setFormValues(ndata);
                                    }}
                                    checked={formValues.gpFirstNameSwitch || false}
                                    defaultValue={formValues.gpFirstName || ""}
                                />
                            </div>
                            <div className="mb-15">
                                <Input
                                    id="gpLastName"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    type="text"
                                    fontSize={"fs-16 text-dark"}
                                    className={WIDTH_CLASS}
                                    contentFontSize="fs-14"
                                    switchPresent={isProfileCreated}
                                    switchChange={(checked) => {
                                    let ndata = { ...formValues };
                                    ndata.gpLastNameSwitch = checked;
                                    setFormValues(ndata);
                                    }}
                                    checked={formValues.gpLastNameSwitch || false}
                                    defaultValue={formValues.gpLastName || ""}
                                />
                            </div>
                            <div className="mb-15">
                                <Input
                                    id="gpPhone"
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    type="text"
                                    fontSize={"fs-16 text-dark"}
                                    className={WIDTH_CLASS}
                                    contentFontSize="fs-14"
                                    switchPresent={isProfileCreated}
                                    switchChange={(checked) => {
                                    let ndata = { ...formValues };
                                    ndata.gpPhoneSwitch = checked;
                                    setFormValues(ndata);
                                    }}
                                    checked={formValues.gpPhoneSwitch || false}
                                    defaultValue={formValues.gpPhone || ""}
                                />
                                <Error field="gpPhone" />
                            </div>
                            <div className="mb-15">
                                <Input
                                    id="gpEmail"
                                    label="Email"
                                    placeholder="Email"
                                    type="text"
                                    fontSize={"fs-16 text-dark"}
                                    className={WIDTH_CLASS}
                                    contentFontSize="fs-14"
                                    switchPresent={isProfileCreated}
                                    switchChange={(checked) => {
                                    let ndata = { ...formValues };
                                    ndata.gpEmailSwitch = checked;
                                    setFormValues(ndata);
                                    }}
                                    checked={formValues.gpEmailSwitch || false}
                                    defaultValue={formValues.gpEmail || ""}
                                />
                                <Error field="gpEmail" />
                            </div>
                        </>
                    )}
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
    </>
  );
};

export default compose(enhancer, connect(null, { login }))(EditProfile);
