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

  const { values, errors, touched, submitCount, handleChange } = props;

  const lgMbr = store.getState().auth.memberId;
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
                                getOptionLabel={(op) => op.title}
                                getOptionValue={(op) => op.installment}
                              />
                              <Error field="installment" />
                            </div>
                          )}
                        {isGift && (
                          <div className="form-col add-btn">
                            <span
                              className="btn button plr-20 ptb-10"
                              onClick={(e) => setMbrOpen(true)}
                            >
                              <span class="material-symbols-outlined icn">
                                add_circle
                              </span>
                              <span className="btn-txt">Add More</span>
                            </span>
                            {/* <label htmlFor="" className="fs-16">
                              Add More
                            </label>
                            <div className="radion-ops">
                              <label className="rd-ops">
                                <input
                                  type="radio"
                                  name="giftto"
                                  value="exist"
                                
                                />
                                Existing
                              </label>
                              <label className="rd-ops">
                                <input type="radio" name="giftto" value="new" />
                                New
                              </label>
                            </div> */}
                          </div>
                        )}
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
        <MemberModal
          isOpen={isMbrOpen}
          toggle={() => {
            setMbrOpen(!isMbrOpen);
          }}
        />
      )}
    </Wrapper>
  );
}

export default compose(enhancer, connect(null, { logout }))(Membership);
