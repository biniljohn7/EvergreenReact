import React, { useEffect, useState } from "react";
import Wrapper from "./dues.style";
import Select from "react-select";
import {
  getMembershipType,
  getAttachment,
  getMembership,
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

const { logout } = AuthActions;

/* const list = [
  {
    label: "Not Applicable",
    value: "NotApplicable",
  },
  {
    label: "25 Years",
    value: "TwentyFiveYears",
  },
  {
    label: "50 Years",
    value: "FiftyYears",
  },
]; */

const Membership = (props) => {
  const [dropdown, setDropdown] = useState(null);
  const [subDropdown, setSubDropdown] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [PkdPlan, setPkdPlan] = useState(false);
  const [PkdSubPlan, setPkdSubPlan] = useState(false);

  const {
    values,
    errors,
    touched,
    submitCount
  } = props;

  let Spn = Spinner();
  let Tst = Toast();

  useEffect(() => {
    getMembershipType()
      .then((res) => {
        setDropdown(res.data);
      })
      .catch((err) => {
        // console.error(err);
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

  document.title = 'Membership - ' + window.seoTagLine;

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return <div className="text-danger">{errors[field1]}</div>;
    } else {
      return <div />;
    }
  };

  const handleForm = (e) => {
    if (PkdPlan && PkdSubPlan) {
      Spn.Show();
      getMembership({
        membershipTypeId: PkdPlan,
        membershipChargesId: PkdSubPlan.membershipChargesId,
        serviceAward: "NotApplicable",
      })
        .then((res) => {
          if (res.success === 1) {
            setData(res.data);
            setOpen(!isOpen);
          } else {
            //         ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          //       console.error(err);
          //       ToastsStore.error("Something went wrong!");
        }).finally(() => {
          Spn.Hide();
        });
    }

    e.preventDefault();
    return false;
  };

  return <Wrapper>
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
            Choose Membership
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div className="container">
      <div className="ptb-50">
        <h4 className="mb-15">Choose Membership</h4>
        <form>
          <div className="mtb-20">
            <label className="fs-16">Membership Dues/Fees:</label>
            <Select
              id="plan"
              placeholder="Select membership type"
              options={dropdown || []}
              styles={{
                control: (value) => {
                  return {
                    ...value,
                    minHeight: "44px",
                    width: window.innerWidth >= 768 ? "50%" : "100%",
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
                  width: window.innerWidth >= 768 ? "50%" : "100%",
                }),
              }}
              onChange={(selectedOp) => {
                if (
                  selectedOp &&
                  selectedOp.membershipTypeId
                ) {
                  Spn.Show();

                  setPkdPlan(selectedOp.membershipTypeId);
                  setPkdSubPlan(false);

                  getAttachment(selectedOp.membershipTypeId)
                    .then((res) => {
                      setSubDropdown(res.data || []);
                    })
                    .catch((err) => {
                      //     console.error(err);
                      //     ToastsStore.info("Failed to retrive list");
                    })
                    .finally(() => {
                      Spn.Hide();
                    });
                }
              }}
              getOptionLabel={(op) => op.membershipTypeName}
              getOptionValue={(op) => op}
            />
            <Error field="plan" />
          </div>
          {subDropdown && (
            <div className="mt-10">
              <Select
                id="subPlan"
                placeholder="Amount"
                options={subDropdown || []}
                styles={{
                  control: (value) => {
                    return {
                      ...value,
                      minHeight: "44px",
                      width: window.innerWidth >= 768 ? "50%" : "100%",
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
                    width: window.innerWidth >= 768 ? "50%" : "100%",
                  }),
                }}
                onChange={(selectedOp) => {
                  setPkdSubPlan(selectedOp);
                }}
                getOptionLabel={(op) => op.chargesTitle}
                getOptionValue={(op) => op}
                value={PkdSubPlan}
              />
              <Error field="subPlan" />
            </div>
          )}

          {
            PkdPlan && PkdSubPlan ?
              <div className="text-center mt-50">
                <button
                  type="button"
                  className="btn btn-rounded button plr-50 ptb-10"
                  onClick={(e) => handleForm(e)}
                >
                  NEXT
                </button>
              </div> :
              null
          }
        </form>
      </div>
    </div>

    {data && isOpen && (
      <Modal
        isOpen={isOpen}
        toggle={() => {
          setOpen(!isOpen)
        }}
        data={data}
        membershipValue={values}
        changeURL={props.history.push}
      />
    )}
  </Wrapper >
};

export default compose(enhancer, connect(null, { logout }))(Membership);
