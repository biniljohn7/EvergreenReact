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
import { Spinner } from "reactstrap";
import Modal from "./Payment";
import Overlay from "react-loading-overlay";

const { logout } = AuthActions;

const list = [
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
];

const Membership = (props) => {
  const [dropdown, setDropdown] = useState(null);
  const [subDropdown, setSubDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [loader, setLoader] = useState(false)
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

  const {
    values,
    errors,
    touched,
    submitCount,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isValid,
  } = props;

  useEffect(() => {
    setLoading(true);
    getMembershipType()
      .then((res) => {
        setDropdown(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
            props.logout();
            ToastsStore.error("Session Expire! Please login again.");
            setTimeout(() => props.history.replace("/signin"), 800);
          } else {
            setLoading(false);
            ToastsStore.error("Something went wrong!");
          }
        } else if (err.request) {
          setLoading(false);
          ToastsStore.error("Unable to connect to server!");
        } else {
          setLoading(false);
          ToastsStore.error("Something went wrong!");
        }
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

  const handleForm = (e) => {
    e.preventDefault();
    handleSubmit();
    if (isValid) {
      getMembership({
        membershipChargesId: values.subPlan.membershipChargesId,
        membershipTypeId: values.plan.membershipTypeId,
        // serviceAward: values.service.value,
        serviceAward: "NotApplicable",
      })
        .then((res) => {
          if (res.success === 1) {
            setData(res.data);
            setLoader(false);
            setOpen(!isOpen);
          } else {
            setLoader(false);
            ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoader(false);
          ToastsStore.error("Something went wrong!");
        });
    }
  };

  return loading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>
      <Overlay active={loader} spinner={<Spinner />}>
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
              {/* <div>
              <label className="fs-16 mb-0">Service Award:</label>
              <div className="fs-14 mb-10">I am applying for my</div>
              <Select
                id="service"
                placeholder="Select service award"
                options={list}
                styles={{
                  control: (value) => {
                    return {
                      ...value,
                      minHeight: '44px',
                      width: window.innerWidth >= 768 ? '50%' : '100%',
                    }
                  },
                  placeholder: (defaultStyles) => {
                    return {
                      ...defaultStyles,
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '14px',
                    }
                  },
                  menu: (provided, state) => ({
                    ...provided,
                    width: window.innerWidth >= 768 ? '50%' : '100%',
                  }),
                }}
                onChange={(selectedOp) => {
                  setFieldTouched('service', true, true)
                  setFieldValue('service', selectedOp)
                }}
                value={values.service || ''}
              />
              <Error field="service" />
            </div> */}
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
                    setLoader(true);
                    setFieldTouched("plan", true, true);
                    setFieldValue("plan", selectedOp);
                    setFieldTouched("subPlan", true, true);
                    setFieldValue("subPlan", "");
                    getAttachment(selectedOp.membershipTypeId)
                      .then((res) => {
                        setSubDropdown(res.data || []);
                      })
                      .catch((err) => {
                        console.error(err);
                        ToastsStore.info("Failed to retrive list");
                      })
                      .finally(() => {
                        setLoader(false);
                      });
                  }}
                  getOptionLabel={(op) => op.membershipTypeName}
                  getOptionValue={(op) => op}
                  value={values.plan || ""}
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
                      setFieldTouched("subPlan", true, true);
                      setFieldValue("subPlan", selectedOp);
                    }}
                    getOptionLabel={(op) => op.chargesTitle}
                    getOptionValue={(op) => op}
                    value={values.subPlan || ""}
                  />
                  <Error field="subPlan" />
                </div>
              )}

              <div className="text-center mt-50">
                <button
                  type="button"
                  className="btn btn-rounded button plr-50 ptb-10"
                  onClick={(e) => handleForm(e)}
                // disabled={loader}
                >
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
        {data && isOpen && (
          <Modal
            isOpen={isOpen}
            toggle={() => setOpen(!isOpen)}
            data={data}
            membershipValue={values}
            changeURL={props.history.push}
          />
        )}
      </Overlay>
    </Wrapper>
  );
};

export default compose(enhancer, connect(null, { logout }))(Membership);
