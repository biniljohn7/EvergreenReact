import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Select from "react-select";
import Input from "../../UI/input/input";
import {
  getMembershipType,
  getMembershipPlans,
  getInstallments,
  getAttachment,
  getMembership,
  duesSearchSections,
  duesSearchAffiliate,
} from "../../api/duesAPI";
import { connect } from "react-redux";
import AuthActions from "../../redux/auth/actions";
import { ToastsStore } from "react-toasts";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { chooseMembership as enhancer } from "./enhancer";
import Modal from "./Payment";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";
import Pix from "../../helper/Pix";

import "../../assets/css/style2.css";
import MemberModal from "./ChooseMember";
import { store } from "../../redux/store";
import { MEMBERSHIP_FOR } from "../../helper/constant";
import SelectMember from "./SelectMember";

const { logout } = AuthActions;

function Membership(props) {
  const [showForm, setShowForm] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [secSuggestions, setSecSuggestions] = useState([]);
  const [affSuggestions, setAffSuggestions] = useState([]);
  const [subDropItems, setSubDrop] = useState({});
  const [isMbrOpen, setMbrOpen] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [members, setMembers] = useState([]);
  const [content, setContent] = useState([]);
  const [ErrorList, setErrorList] = useState({});
  const [membData, setMembData] = useState({
    membershipPlan: "",
    installment: 1,
    section: "",
    affiliate: "",
    membshipFor: "",
    sectionLabel: "",
    affiliateLabel: "",
  });
  const [membId, setMembId] = useState([]);

  const lgMbr = store.getState().auth.memberId;
  let mbrExist = false;

  let Spn = Spinner();
  let Tst = Toast();

  useEffect(() => {
    getMembershipPlans()
      .then((res) => {
        setDropdown(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            props.logout();
            ToastsStore.error("Session Expire! Please login again.");
            setTimeout(() => props.history.replace("/signin"), 800);
          } else {
            ToastsStore.error("Something went wrong!");
          }
        } else if (err.request) {
          ToastsStore.error("Unable to connect to server!");
        } else {
          ToastsStore.error("Something went wrong!");
        }
      });
  }, []);

  document.title = "Membership - " + window.seoTagLine;

  const addMbr = (mbrId, mbrNam) => {
    setMembId((prev) => {
      const exstMbrIndx = prev.findIndex((member) => member === mbrId);

      if (exstMbrIndx !== -1) {
        mbrExist = true;
        return prev;
      } else {
        return [...new Set([...prev, mbrId])];
      }
    });
  };

  const handleAddContent = (person) => {
    addMbr(person.id, person.name);
    if (!mbrExist) {
      setContent([...content, person]);
    } else {
      Tst.Error("Member already added!");
    }
    setMbrOpen(false);
  };

  const removeMbr = (mbrId) => {
    setMembId((prev) => prev.filter((id) => id !== mbrId));
    setContent(content.filter((cnt) => cnt.id !== mbrId));
  };

  const Error = ({ field }) => {
    return ErrorList[field] ? (
      <div className="text-danger">{ErrorList[field]}</div>
    ) : (
      <></>
    );
  };

  const handleMembershipForm = (e) => {
    function el(id) {
      return document.getElementById(id);
    }

    let sErrs = {};

    if (!membData.membershipPlan) {
      sErrs["plan"] = "This field is required";
    }
    if (!membData.membshipFor) {
      sErrs["membshipFor"] = "This field is required";
    }
    if (isGift && content.length < 1) {
      sErrs["memberGift"] = "At least one member is required!";
    }
    if (!membData.section) {
      sErrs["section"] = "This field is required";
    }
    if (!membData.affiliate) {
      sErrs["affiliation"] = "This field is required";
    }

    setErrorList(sErrs);
    if (Object.keys(sErrs).length < 1) {
      // Spn.Show();

      const formattedMembers = membId.map((id) => ({
        memberId: parseInt(id),
        membershipPlan: membData.membershipPlan,
        installment: membData.installment,
        sectionId: membData.section,
        affiliate: membData.affiliate,
      }));

      // setShowForm(false);
      console.log(formattedMembers);
    }
  };

  const sectionSuggestion = (e, type) => {
    const value = e.target.value;

    if (type == "section") {
      setMembData((prev) => ({ ...prev, sectionLabel: value }));

      if (value) {
        duesSearchSections(value)
          .then((res) => {
            if (res.success === 1) {
              setSecSuggestions(res.data);
            }
          })
          .catch(() => {})
          .finally(() => {
            Spn.Hide();
          });

        Spn.Show();
      } else {
        setSecSuggestions([]);
        setMembData({
          ...membData,
          section: "",
          sectionLabel: "",
        });
      }
    }

    if (type == "affiliate") {
      setMembData((prev) => ({ ...prev, affiliateLabel: value }));

      if (value) {
        duesSearchAffiliate(value)
          .then((res) => {
            if (res.success === 1) {
              setAffSuggestions(res.data);
            }
          })
          .catch(() => {})
          .finally(() => {
            Spn.Hide();
          });

        Spn.Show();
      } else {
        setAffSuggestions([]);
        setMembData({
          ...membData,
          affiliate: "",
          affiliateLabel: "",
        });
      }
    }
  };

  return (
    <Wrapper>
      {Spn.Obj}
      {Tst.Obj}
      <div className="red pt-20 bread-nav">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dues" className="text-white">
                Dues
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="text-white">
              Memberships
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
      <div className="container">
        <div className="ptb-50">
          {!showForm && (
            <div className="text-left">
              <button
                className="btn btn-rounded button plr-20 ptb-10"
                type="button"
                onClick={() => {
                  setShowForm(true);
                  setContent([]);
                }}
              >
                ADD MEMBERSHIP
              </button>
            </div>
          )}

          {showForm && (
            <>
              <h4 className="mb-15">Choose Membership</h4>
              <form>
                <div className="mbrship-sec">
                  <div className="mbrs-col">
                    <div id="ownMembership">
                      <div className="form-row">
                        <div className="form-col sugg">
                          <Input
                            id="section"
                            name="section"
                            label="Section"
                            placeholder="Section"
                            fontSize={"fs-16 text-dark"}
                            contentFontSize="fs-14"
                            type="text"
                            value={membData.sectionLabel || ""}
                            onChange={(e) => sectionSuggestion(e, "section")}
                            onBlur={() => {
                              setTimeout(() => setSecSuggestions([]), 1000);
                            }}
                          />
                          <Error field="section" />
                          <div
                            className="suggestion-box"
                            style={{
                              display:
                                secSuggestions.length > 0 ? "block" : "none",
                            }}
                          >
                            {secSuggestions.map((item) => (
                              <div
                                className="suggestions"
                                key={item.sectionId}
                                onClick={() => {
                                  setMembData({
                                    ...membData,
                                    section: item.sectionId,
                                    sectionLabel: item.sectionName,
                                  });
                                  setSecSuggestions([]);
                                }}
                              >
                                {item.sectionName}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-col sugg">
                          <Input
                            id="affiliation"
                            name="affiliation"
                            label="Affiliation"
                            placeholder="Affiliation"
                            fontSize={"fs-16 text-dark"}
                            contentFontSize="fs-14"
                            type="text"
                            value={membData.affiliateLabel || ""}
                            onChange={(e) => sectionSuggestion(e, "affiliate")}
                            onBlur={() => {
                              setTimeout(() => setAffSuggestions([]), 1000);
                            }}
                          />
                          <Error field="affiliation" />
                          <div
                            className="suggestion-box"
                            style={{
                              display:
                                affSuggestions.length > 0 ? "block" : "none",
                            }}
                          >
                            {affSuggestions.map((item) => (
                              <div
                                className="suggestions"
                                key={item.affiliateId}
                                onClick={() => {
                                  setMembData({
                                    ...membData,
                                    affiliate: item.affiliateId,
                                    affiliateLabel: item.affiliateName,
                                  });
                                  setAffSuggestions([]);
                                }}
                              >
                                {item.affiliateName}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-col">
                          <label htmlFor="" className="fs-16">
                            Membership Dues/Fees:
                          </label>
                          <Select
                            id="plan"
                            placeholder="Select membership plan"
                            options={dropdown || []}
                            onChange={(selectedOp) => {
                              if (selectedOp && selectedOp.membershipPlanId) {
                                Spn.Show();

                                setMembData({
                                  ...membData,
                                  membershipPlan: selectedOp.membershipPlanId,
                                  installment: 1,
                                });

                                getInstallments(selectedOp.membershipPlanId)
                                  .then((res) => {
                                    setSubDrop((prevDrpItems) => ({
                                      ...prevDrpItems,
                                      [lgMbr]: {
                                        items: res.data || [],
                                      },
                                    }));
                                  })
                                  .catch((err) => {})
                                  .finally(() => {
                                    Spn.Hide();
                                  });
                              }
                            }}
                            getOptionLabel={(op) => op.membershipPlanName}
                            getOptionValue={(op) => op}
                          />
                          <Error field="plan" />
                        </div>
                        <div className="form-col">
                          <label htmlFor="" className="fs-16">
                            Membership For
                          </label>
                          <Select
                            id="membshipFor"
                            placeholder="Select the option"
                            options={MEMBERSHIP_FOR}
                            onChange={(selectedOp) => {
                              if (selectedOp.value == "gift") {
                                setIsGift(true);
                                setMembId([]);
                                setContent([]);
                              } else {
                                if (!membId.includes(lgMbr)) {
                                  setMembId((prev) => [...prev, lgMbr]);
                                  setMembId((prev) =>
                                    prev.filter((id) => id == lgMbr)
                                  );
                                }
                                setIsGift(false);
                              }

                              setMembData({
                                ...membData,
                                membshipFor: selectedOp.value,
                              });
                            }}
                          />
                          <Error field="membshipFor" />
                        </div>
                      </div>
                      <div className="form-row">
                        {subDropItems &&
                          subDropItems[lgMbr] &&
                          subDropItems[lgMbr].items &&
                          subDropItems[lgMbr].items.length > 1 && (
                            <div className="form-col">
                              <label htmlFor="" className="fs-16">
                                Installment
                              </label>
                              <Select
                                id="installment"
                                placeholder="Select Installment"
                                options={subDropItems[lgMbr].items || []}
                                value={
                                  subDropItems[lgMbr]?.items.find(
                                    (opt) =>
                                      opt.installment === membData.installment
                                  ) || null
                                }
                                onChange={(selectedOp) => {
                                  setMembData({
                                    ...membData,
                                    installment: selectedOp.installment,
                                  });
                                }}
                                getOptionLabel={(op) => op.title}
                                getOptionValue={(op) => op.installment}
                              />
                            </div>
                          )}
                        <div className="form-col add-btn">
                          {isGift && (
                            <>
                              <span
                                className="btn button plr-20 ptb-10"
                                onClick={(e) => {
                                  setMbrOpen(true);
                                }}
                              >
                                <span class="material-symbols-outlined icn">
                                  add_circle
                                </span>
                                <span className="btn-txt">Add More</span>
                              </span>
                              <Error field="memberGift" />
                            </>
                          )}
                          <div
                            className="gift-membership"
                            style={{ display: isGift ? "block" : "none" }}
                          >
                            <div id="selectedMembers">
                              {content && content.length > 0
                                ? content.map((item) => (
                                    <div
                                      className="ech-mbr"
                                      key={item.id}
                                      id={`person-${item.id}`}
                                    >
                                      <div className="info-sec">
                                        <div className="person-info">
                                          <div className="avatar-sec">
                                            {item.avatarUrl ? (
                                              <div className="mbr-img">
                                                <img
                                                  src={item.avatarUrl}
                                                  alt=""
                                                />
                                              </div>
                                            ) : (
                                              <div className="no-img">
                                                <span class="material-symbols-outlined icn">
                                                  person
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                          <div className="mbr-nam">
                                            {item.name}
                                          </div>
                                        </div>
                                        <div className="action">
                                          <span
                                            className="material-symbols-outlined"
                                            onClick={(e) => {
                                              if (
                                                window.confirm(
                                                  "Are you sure you want to remove this member?"
                                                )
                                              ) {
                                                removeMbr(item.id);
                                              }
                                            }}
                                          >
                                            cancel
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-left mt-20">
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={(e) => handleMembershipForm(e)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      {isMbrOpen && (
        <SelectMember
          isOpen={isMbrOpen}
          toggle={() => {
            setMbrOpen(!isMbrOpen);
          }}
          addContent={handleAddContent}
          changeURL={props.history.push}
        />
      )}
    </Wrapper>
  );
}

export default compose(enhancer, connect(null, { logout }))(Membership);
