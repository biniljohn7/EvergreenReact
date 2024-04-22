import React, { useState, useEffect } from "react";
import Wrapper from "./dues.style";
import Button from "../../UI/button/button";
import {
  viewMemebership,
  cancelSubscription,
  viewPaymentHistory,
  isMembershipExpired,
} from "../../api/duesAPI";
import { ToastsStore } from "react-toasts";
import { Modal, Spinner } from "reactstrap";
import Echeck from "../../assets/images/e_check.png";
import Express from "../../assets/images/express.png";
import Discover from "../../assets/images/discover.png";
import Mastercard from "../../assets/images/mastercard.png";
import Visa from "../../assets/images/visa.png";

const Dues = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState(null);
  const [chargesTitle, setChargesTitle] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const list = [
    {
      title: "2019 Membership Dues",
      date: "13-11-2019",
      fees: "$475.00",
    },
    {
      title: "2019 Membership Dues",
      date: "13-11-2019",
      fees: "$475.00",
    },
    {
      title: "2019 Membership Dues",
      date: "13-11-2019",
      fees: "$475.00",
    },
    {
      title: "2019 Membership Dues",
      date: "13-11-2019",
      fees: "$475.00",
    },
    {
      title: "2019 Membership Dues",
      date: "13-11-2019",
      fees: "$475.00",
    },
  ];

  // useEffect(() => {
  //   setLoading(true);

  //   viewPaymentHistory()
  //     .then((res) => {
  //       if (res.success === 1) {
  //         setHistoryData(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       ToastsStore.error("Something went wrong!");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // const handleManageCard = () => {
  //   return (
  //     <>
  //       {isOpen && (
  //         <div>
  //           {/* <div
  //             className="bg-light"
  //             style={{ height: window.innerHeight + "px" }}
  //           ></div> */}
  //           <Modal
  //             isOpen={isOpen}
  //             toggle={() => {
  //               setOpen(!isOpen);
  //             }}
  //             centered
  //             size="lg"
  //             className="manageCard"
  //           >
  //             <Wrapper>
  //               <div className="ptb-30 plr-20 position-relative">
  //                 <label
  //                   className="cancel text-bold cursor-pointer"
  //                   onClick={() => {
  //                     setOpen(!isOpen);
  //                   }}
  //                 >
  //                   X
  //                 </label>
  //                 <h4 className="mb-20 text-bold">Manage Cards</h4>
  //                 {/* {FILTER.map((f, index) => {
  //                   return (
  //                     <RadioButton
  //                       key={index}
  //                       id={f}
  //                       name="filter_option"
  //                       value={f}
  //                       checked={tempState === f}
  //                       label={f}
  //                       padding="ptb-5"
  //                       onChange={(e) => setState(f)}
  //                     />
  //                   );
  //                 })} */}
  //                 <div className="text-center">
  //                   <Button
  //                     className="mt-20 plr-50"
  //                     name="SET"
  //                     clicked={(e) => {
  //                       // setPage(1);
  //                       // setTotalPage(0);
  //                       // setSearch("");
  //                       // setFilter(tempState);
  //                       setOpen(!isOpen);
  //                     }}
  //                   />
  //                 </div>
  //               </div>
  //             </Wrapper>
  //           </Modal>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  const isMembershipExpiredAPI = (membershipId) => {
    isMembershipExpired(membershipId)
      .then((res) => {
        res.data.success === 0 && ToastsStore.error(res.data.message);
        res.data.success === 1 && props.history.push("/dues/membership");
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
  };

  useEffect(() => {
    setLoading(true);
    viewMemebership()
      .then((res) => {
        if (res.success === 1) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        ToastsStore.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);

    viewPaymentHistory()
      .then((res) => {
        if (res.success === 1) {
          setHistoryData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        ToastsStore.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>

      {/* <div className="row site-spacing ptb-70">
        <div
          className={
            "col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6" +
            (window.innerWidth <= 1024 ? " col-lg-12" : "")
          }
        > */}
      {/* <div className="text-center mt-15">
            <Button
              className="button ptb-15"
              name="Manage Card"
              clicked={() => {
                setOpen(!isOpen);
                handleManageCard();
              }}
            />
          </div> */}

      {/* {data.totalSavedCard>0 && <div className="text-center mt-15">
            <Button
              className="button ptb-15"
              name="MANAGE CARDS"
              
            />
          </div>} */}
      {/* </div>
      </div> */}

      <div className="due-section">
        <div className="head-box">
          <div className="container">
            <h2>dues</h2>
          </div>
        </div>
        <div className="due-box">
          <div className="container">
            <div className="due-left">
              <div className="due-item">
                <div className="due-head">MEMBERSHIP FEE DETAILS</div>
                <div className="due-content">
                  {function () {
                    if (data) {
                      return <>
                        <table cellPadding={7}>
                          <tr>
                            <td className="bold-600">
                              National Dues
                            </td>
                            <td className="text-right">
                              ${(data.nationalDues || 0).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="bold-600">
                              Section Dues
                            </td>
                            <td className="text-right">
                              ${(data.localDues || 0).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="bold-600">
                              Payment Processing Fee
                            </td>
                            <td className="text-right">
                              ${(data.nationalLateFee || 0).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="bold-600">
                              Section Donation
                            </td>
                            <td className="text-right">
                              ${(data.chapterDonation || 0).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="bold-600">
                              National Donation
                            </td>
                            <td className="text-right">
                              ${(data.nationDonation || 0).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td className="bold-600 text-12">
                              Total
                            </td>
                            <td className="text-right text-12 bold-600">
                              ${(data.totalAmount || 0).toFixed(2)}
                            </td>
                          </tr>
                        </table>
                        {/* 
                        <div className="ptb-7">
                          National Per Capital Fee:
                          <span className="float-right text-dark">
                            ${(data.nationalPerCapitalFee || 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="ptb-7">
                          Reinstatement Fee:
                          <span className="float-right text-dark">
                            ${(data.nationalReinstatementFee || 0).toFixed(2)}
                          </span>
                        </div> */}
                      </>
                    } else {
                      return <div className="text-center">
                        YOU HAVE NO MEMBERSHIP
                      </div>
                    }
                  }()}

                </div>
              </div>

              <div className="text-center">
                <img src={Visa} alt="Visa" className="card-icon mr-3" />

                <img src={Mastercard} alt="Mastercard" className="card-icon mr-3" />

                <img
                  src={Express}
                  alt="American Express"
                  className="card-icon mr-3"
                />

                <img src={Discover} alt="Discover" className="card-icon mr-3" />

                <img src={Echeck} alt="eCheck" className="card-icon" />
              </div>

              <div className="input-btn">
                <button className="btn"
                  onClick={() => {
                    // isMembershipExpiredAPI(data.membershipId && data.membershipId);
                    props.history.push("/dues/membership");
                  }}
                >
                  CHOOSE MEMBERSHIP
                </button>
              </div>

              {
                data &&
                  data.isRecurring ?
                  <div className="text-center mt-15">
                    <Button
                      className="button ptb-15"
                      name="CANCEL SUBSCRIPTION"
                      clicked={() => {
                        cancelSubscription(data.membershipId && data.membershipId)
                          .then((res) => {
                            if (res.success === 1) {
                              ToastsStore.success(res.message);
                            } else {
                              ToastsStore.error(res.message);
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                            ToastsStore.error("Something went wrong!");
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      }}
                    />
                  </div> :
                  null
              }

            </div>
            <div className="due-right">
              <div className="due-item">
                <div className="due-head">PAYMENT HISTORY </div>
                <div className="due-content">
                  {function () {
                    if (
                      historyData &&
                      historyData
                    ) {
                      return historyData.map(function (el) {
                        return <div className="mb15">
                          <div className="bold-600 text-12">
                            {el.chargesTitle}
                          </div>
                          <div>
                            {new Date(el.paidAt).toLocaleDateString("en-US")}
                          </div>
                          {el.totalAmount}
                        </div>;
                      });
                    } else {
                      return <div className="text-center">
                        YOU HAVE NO MEMBERSHIP
                      </div>
                    }
                  }()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default Dues;
