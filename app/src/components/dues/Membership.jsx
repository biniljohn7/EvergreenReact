import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Select from "react-select";
import {
  getMembershipType,
  getMembershipPlans,
  getInstallments,
  getAttachment,
  getMembership,
} from "../../api/duesAPI";
import { connect } from "react-redux";
import AuthActions from "../../redux/auth/actions";
import { ToastsStore } from "react-toasts";
import { Breadcrumb, BreadcrumbItem, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { chooseMembership as enhancer } from "./enhancer";
import Modal from "./Payment";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";
import Pix from "../../helper/Pix";

import Checkbox from "../../UI/checkbox/checkbox";
import "../../assets/css/style2.css";
import MemberModal from "./ChooseMember";
import { store } from "../../redux/store";
import { MEMBERSHIP_FOR } from "../../helper/constant";
import SelectMember from "./SelectMember";

const { logout } = AuthActions;

function Membership(props) {
  const [showForm, setShowForm] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [subDropItems, setSubDrop] = useState({});
  const [isMbrOpen, setMbrOpen] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [members, setMembers] = useState([]);
  const [content, setContent] = useState([]);

  console.log(members);

  const { values, errors, touched, submitCount, handleChange } = props;

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
    addMbr(store.getState().auth.memberId, "Own Membership");
  }, []);

  document.title = "Membership - " + window.seoTagLine;

  const addMbr = (mbrId, mbrNam) => {
    setMembers((prevMembers) => {
      const exstMbrIndx = prevMembers.findIndex(
        (member) => member.memberId === mbrId
      );

      if (exstMbrIndx !== -1) {
        mbrExist = true;
        return prevMembers;
      } else {
        return [
          ...prevMembers,
          {
            memberId: mbrId,
            membershipPlan: null,
            installment: null,
            sectionId: null,
            affiliate: null,
            mbrName: mbrNam,
          },
        ];
      }
    });
  };

  const removeMbr = (mbrId, loggedMbr = false) => {
    setMembers(members.filter((mbr) => mbr.id !== mbrId));
    if (!loggedMbr) {
      setContent(content.filter((cnt) => cnt.id !== mbrId));
    }
  };

  const handleAddContent = (person) => {
    // addMbr(person.id, person.name);
    setMembers((prevItems) =>
      prevItems.map((mbr) =>
        mbr.memberId != person.id
          ? { ...mbr, memberId: person.id, mbrName: person.name }
          : mbr
      )
    );
    if (!mbrExist) {
      setContent([...content, person]);
    } else {
      Tst.Error("Member already added!");
    }
    setMbrOpen(false);
  };

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return <div className="text-danger">{errors[field1]}</div>;
    } else {
      return <div />;
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
                onClick={() => setShowForm(true)}
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
                                setMembers((prevItems) =>
                                  prevItems.map((mbr) =>
                                    mbr.memberId === lgMbr
                                      ? {
                                          ...mbr,
                                          membershipPlan:
                                            selectedOp.membershipPlanId,
                                          installment: null,
                                        }
                                      : mbr
                                  )
                                );
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
                              } else {
                                setMembers((prevItems) =>
                                  prevItems.map((mbr) =>
                                    mbr.memberId === lgMbr
                                      ? { ...mbr, memberId: lgMbr }
                                      : mbr
                                  )
                                );
                                setIsGift(false);
                              }
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
                                onChange={(selectedOp) => {
                                  setMembers((prevItems) =>
                                    prevItems.map((mbr) =>
                                      mbr.memberId === lgMbr
                                        ? {
                                            ...mbr,
                                            installment: selectedOp.installment,
                                          }
                                        : mbr
                                    )
                                  );
                                }}
                                getOptionLabel={(op) => op.title}
                                getOptionValue={(op) => op.installment}
                              />
                              <Error field="installment" />
                            </div>
                          )}
                        <div className="form-col add-btn">
                          {isGift && (
                            <span
                              className="btn button plr-20 ptb-10"
                              onClick={(e) => setMbrOpen(true)}
                            >
                              <span class="material-symbols-outlined icn">
                                add_circle
                              </span>
                              <span className="btn-txt">Add More</span>
                            </span>
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
                                                removeMbr(item.id, false);
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
                          onClick={() => setShowForm(false)}
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
