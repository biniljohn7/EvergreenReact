import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import { getAllMembers, duesNewMember } from "../../api/duesAPI";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/input/input";
import Select from "../../UI/select/select";
import { getSection, getAffiliation } from "../../api/commonAPI";
import Toast from "../../UI/Toast/Toast";

const WIDTH_CLASS = window.innerWidth >= 1024 ? "wp-80" : "wp-100";

function SelectMember(props) {
  const [mbrData, setMbrData] = useState(null);
  const [popupView, setPopupView] = useState(false);
  const [selectedOption, setSelectedOption] = useState("exist");
  const [passwordType, setPasswordType] = useState("password");
  const [ErrorList, setErrorList] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [affiliationList, setAffiliationList] = useState([]);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    section: "",
    affilation: "",
    password: "",
    cpassword: "",
  });

  let Spn = Spinner();
  const Tst = Toast();
  let pgn = 1;

  useEffect(() => {
    Spn.Show();
    getSection()
      .then((res) => {
        setSectionList([...res.data]);
      })
      .catch((err) => {
        Tst.Error("Failed to retrive Section list. Please try again later!");
      });
    getAffiliation()
      .then((res) => {
        setAffiliationList([...res.data]);
      })
      .catch((err) => {
        "Failed to retrive Affiliation list. Please try again later!";
      });
    getAllMembers(pgn, "")
      .then((res) => {
        if (res.success === 1) {
          setMbrData(res.data);
        } else {
        }
        Spn.Hide();
      })
      .catch((err) => {});
  }, []);

  const storeData = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const showMembers = (e, flg = false) => {
    Spn.Show();
    getAllMembers(pgn, document.getElementById("srchKey").value)
      .then((res) => {
        if (res.success === 1) {
          if (flg == true) {
            setMbrData((prevData) => ({
              ...prevData,
              list: [...prevData.list, ...res.data.list],
              currentPageNo: res.data.currentPageNo,
              totalPages: res.data.totalPages,
            }));
          } else {
            setMbrData(res.data);
          }
        } else {
        }
      })
      .catch((err) => {
        //
      })
      .finally(() => {
        Spn.Hide();
      });

    e.preventDefault();
    return false;
  };

  const showMore = (e, cp, apndFlg) => {
    pgn = cp + 1;
    showMembers(e, apndFlg);
  };

  const handleClick = (event) => {
    const personDetails = {
      id: event.target.getAttribute("data-id"),
      name: event.target.getAttribute("data-name"),
      avatarUrl: event.target.getAttribute("data-avatar"),
      section: event.target.getAttribute("data-section"),
      affiliation: event.target.getAttribute("data-affiliation"),
      city: event.target.getAttribute("data-city"),
      zipcode: event.target.getAttribute("data-zipcode"),
      memberid: event.target.getAttribute("data-memberid"),
    };
    props.addContent(personDetails);
  };

  const showPopupOptns = (e) => {
    if (e.target.value == "new") {
      setPopupView(true);
    } else {
      setPopupView(false);
    }
  };

  const Error = ({ field }) => {
    return ErrorList[field] ? (
      <div className="text-danger">{ErrorList[field]}</div>
    ) : (
      <></>
    );
  };

  const handleForm = () => {
    function el(id) {
      return document.getElementById(id);
    }

    let sErrs = {};
    const password = el("password").value.trim();
    const confirmPwd = el("confirmPwd").value.trim();
    const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/;

    if (!el("firstName").value.trim()) {
      sErrs["firstName"] = "This field is required";
    }
    if (!el("lastName").value.trim()) {
      sErrs["lastName"] = "This field is required";
    }
    if (!el("email").value.trim()) {
      sErrs["email"] = "This field is required";
    }
    if (!formValues.section) {
      sErrs["section"] = "This field is required";
    }
    if (!formValues.affilation) {
      sErrs["affilation"] = "This field is required";
    }
    if (!password) {
      sErrs["password"] = "This field is required";
    } else if (!pwdRegex.test(password)) {
      sErrs["password"] =
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character";
    }
    if (!confirmPwd) {
      sErrs["confirmPwd"] = "This field is required";
    } else if (password && password !== confirmPwd) {
      sErrs["confirmPwd"] = "Password didn't match";
    }

    setErrorList(sErrs);

    if (Object.keys(sErrs).length < 1) {
      Spn.Show();

      const data = {
        method: "dues-add-new-member",
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        section: formValues.section,
        affilation: formValues.affilation,
      };

      duesNewMember(data)
        .then((res) => {
          if (res.success === 1) {
            const newMemberDetails = {
              id: res.data.id,
              name: res.data.name,
              avatarUrl: res.data.avatarUrl,
            };
            props.addContent(newMemberDetails);
          } else {
            Tst.Error(res.message);
            sErrs["email"] = res.message;
          }
        })
        .catch((err) => {
          Tst.Error("Something went wrong!");
        })
        .finally(() => {
          Spn.Hide();
        });
    }
  };

  return (
    <div>
      {Spn.Obj}
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="lg"
        className="signin"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          <div className="plr-30 ptb-50 position-relative">
            <div className="popup-title">Choose Member</div>
            <div
              className="cursor-pointer text-bold close"
              onClick={(e) => {
                props.toggle();
              }}
            >
              X
            </div>
            <div className="radion-ops">
              <label className="rd-ops">
                <input
                  type="radio"
                  name="giftto"
                  value="exist"
                  checked={selectedOption === "exist"}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    showPopupOptns(e);
                  }}
                />
                Existing
              </label>
              <label className="rd-ops">
                <input
                  type="radio"
                  name="giftto"
                  value="new"
                  checked={selectedOption === "new"}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    showPopupOptns(e);
                  }}
                />
                New
              </label>
            </div>
            {!popupView && (
              <div className="containers">
                <div className="mbr-srch">
                  <div className="srch-bar">
                    <form onSubmit={(e) => showMembers(e)}>
                      <input
                        type="text"
                        name="key"
                        className="key-inp"
                        id="srchKey"
                      />
                      <button
                        type="button"
                        className="srch-btn"
                        onClick={(e) => showMembers(e)}
                      >
                        <span class="material-symbols-outlined">search</span>
                      </button>
                    </form>
                  </div>
                  {mbrData && mbrData.totalPages ? (
                    mbrData.list && mbrData.list.length > 0 ? (
                      <>
                        {mbrData.list.map((mbr) => {
                          return (
                            <div className="each-mbr" key={mbr.id}>
                              <div className="avatar-sec">
                                {mbr.avatar ? (
                                  <div className="mbr-img">
                                    <img src={mbr.avatar} alt="" />
                                  </div>
                                ) : (
                                  <div className="no-img">
                                    <span class="material-symbols-outlined icn">
                                      person
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="nam-sec">{mbr.name}</div>
                              <div className="actn">
                                <span
                                  className="btn add-btn"
                                  onClick={handleClick}
                                  data-id={mbr.id}
                                  data-name={mbr.name}
                                  data-avatar={mbr.avatar}
                                  data-section={mbr.secName}
                                  data-affiliation={mbr.affName}
                                  data-city={mbr.city}
                                  data-zipcode={mbr.zipcode}
                                  data-memberid={mbr.memberId}
                                >
                                  Add
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {mbrData.totalPages &&
                        mbrData.currentPageNo &&
                        mbrData.totalPages > mbrData.currentPageNo ? (
                          <div className="show-more">
                            <span
                              className="btn"
                              onClick={(e) =>
                                showMore(e, mbrData.currentPageNo, true)
                              }
                            >
                              Show more
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    <div className="text-center">No members found!</div>
                  )}
                </div>
              </div>
            )}
            {popupView && (
              <form action="">
                <div className="mb-15">
                  <Input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize="fs-14"
                    type="text"
                    onChange={storeData}
                  />
                  <Error field="firstName" />
                </div>
                <div className="mb-15">
                  <Input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize="fs-14"
                    type="text"
                    onChange={storeData}
                  />
                  <Error field="lastName" />
                </div>
                <div className="mb-15">
                  <Input
                    id="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize="fs-14"
                    type="text"
                    onChange={storeData}
                  />
                  <Error field="email" />
                </div>
                <div className="mb-15 member">
                  <Select
                    label="Section"
                    name="section"
                    placeholder="Choose Section"
                    id="section"
                    options={sectionList}
                    onChange={storeData}
                    value={formValues.section}
                  />
                  <Error field="section" />
                </div>
                <div className="mb-15 member">
                  <Select
                    label="Affiliates"
                    name="affilation"
                    placeholder="Choose Affiliate"
                    id="affilation"
                    options={affiliationList}
                    onChange={storeData}
                    value={formValues.affilation}
                  />
                  <Error field="affilation" />
                </div>
                <div className="mb-15">
                  <div className="position-relative">
                    <Input
                      id="password"
                      label="Password"
                      name="password"
                      placeholder="Password"
                      fontSize={"fs-16 text-dark"}
                      contentFontSize="fs-14"
                      type={passwordType}
                      onChange={storeData}
                    />
                    {passwordType === "password" ? (
                      <span
                        className="material-symbols-outlined psw-view"
                        onClick={() => {
                          setPasswordType("text");
                        }}
                      >
                        visibility
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined psw-view"
                        onClick={() => {
                          setPasswordType("password");
                        }}
                      >
                        visibility_off
                      </span>
                    )}
                  </div>
                  <Error field="password" />
                </div>
                <div className="mb-15">
                  <Input
                    id="confirmPwd"
                    name="cpassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    fontSize={"fs-16 text-dark"}
                    contentFontSize="fs-14"
                    type="password"
                    onChange={storeData}
                  />
                  <Error field="confirmPwd" />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-rounded button plr-50 ptb-10 mt-20"
                    type="button"
                    onClick={(e) => handleForm(e)}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default SelectMember;
