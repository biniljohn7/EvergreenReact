import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import Gift from "../../assets/images/gift-box.png";
import Gifted from "../../assets/images/gifted.png";
import DeclineModal from "./GiftDecline";
import AddModal from "./GiftAddSelf";
import AcceptModal from "./GiftAcceptModal";
import Wrapper from "./dues.style";
import Toast from "../../UI/Toast/Toast";
import { store } from "../../redux/store";
import {
  getRecievedMemberships,
  getGiftedMemberships,
  giftAcceptedApi,
} from "../../api/duesAPI";

import AuthActions from "../../redux/auth/actions";
import { connect } from "react-redux";
const { login } = AuthActions;

const GiftMembership = (props) => {
  const Tst = Toast();
  const lgMbr = store.getState().auth.memberId;

  const [isDclnOpn, setDclnOpn] = useState(false);
  const [isDclnData, setDclnData] = useState(null);
  const [isRcvdOpn, setRcvdOpn] = useState(true);
  const [isGftdOpn, setGftdOpn] = useState(false);
  const [isCfmOpn, setCfmOpn] = useState(false);
  const closeModal = () => setCfmOpn(false);
  const closeDcln = () => setDclnOpn(false);
  const handleClick = (e) => {
    let btn = e.target.getAttribute("data-id");
    if (btn == "received") {
      setRcvdOpn(true);
      setGftdOpn(false);
    }
    if (btn == "gifted") {
      setRcvdOpn(false);
      setGftdOpn(true);
    }
  };
  const [isGiftAccept, setGiftAccept] = useState(false);
  const [isGiftData, setGiftData] = useState(null);
  const openAcceptModal = (data) => {
    setGiftAccept(true);
    setGiftData(data);
  };
  const closeAcceptModal = (id) => {
    giftAcceptedApi({ id: id })
      .then((res) => {
        if (res.status === "ok") {
          setAllGift((prevGiftData) =>
            prevGiftData.map((gift) =>
              gift.id === id ? { ...gift, accepted: "Y" } : gift
            )
          );
          if (res.data.loginData) {
            props.login(res.data.loginData);
          }
        } else {
          console.log(res.message);
          Tst.Error(res.message);
        }
      })
      .catch((err) => {
        Tst.Error(
          "Failed to retrieve received membership list. Please try again later!"
        );
      });

    setGiftAccept(false);
    setGiftData(null);
  };
  const closeDeclineModal = (id) => {
    if (id) {
      setAllGift((prevData) =>
        prevData.map((gift) =>
          gift.id === id ? { ...gift, accepted: "N" } : gift
        )
      );
    }
  };
  const openDeclineModal = (data) => {
    setDclnOpn(true);
    setDclnData(data);
  };

  useEffect(() => {
    getRecievedMemberships(lgMbr)
      .then((res) => {
        setAllGift([...res.data]);
      })
      .catch((err) => {
        Tst.Error(
          "Failed to retrive recieved membership list. Please try again later!"
        );
      });
    getGiftedMemberships(lgMbr)
      .then((res) => {
        setAllGifted([...res.data]);
      })
      .catch((err) => {
        Tst.Error(
          "Failed to retrive gifted membership list. Please try again later!"
        );
      });
  }, []);

  const [giftData, setAllGift] = useState([]);
  const [giftedData, setAllGifted] = useState([]);

  return (
    <>
      <div className="container all-gifts">
        <div className="gift-tabs">
          <button
            id="rcvd"
            className={isRcvdOpn ? "gift-received active" : "gift-received"}
            data-id="received"
            onClick={handleClick}
          >
            Recieved
          </button>
          <button
            id="gftd"
            className={isGftdOpn ? "gift-sent active" : "gift-sent"}
            data-id="gifted"
            onClick={handleClick}
          >
            Gifted
          </button>
        </div>
        <div
          className="gift-received-container"
          style={{ display: isRcvdOpn ? "block" : "none" }}
        >
          <div className="gift-container">
            {giftData &&
              giftData.map((data) => {
                return (
                  <div className="gift-wrapper" key={data.id}>
                    <div className="gift-media">
                      {<img src={Gift} alt="gift" />}
                      <span className="gift-validity">{data.validity}</span>
                    </div>
                    <div className="gift-content">
                      <div className="gift-above-btn">
                        <p>
                          <span className="gift-note">New Gift received</span>
                        </p>
                        <p>
                          <strong>{data.gifter}</strong> has gifted you a{" "}
                          <strong>{data.plans}</strong>
                        </p>
                        <p className="gift-worth">
                          <span>worth ${data.price}</span> on {data.date}
                        </p>
                      </div>
                      <div className="btn-container">
                        {data.accepted != "N" && data.accepted != "Y" ? (
                          <>
                            <button
                              className="gift-accept-btn"
                              onClick={() =>
                                openAcceptModal({
                                  giftid: data.id,
                                  // current: data.have,
                                  new: data.plans,
                                  validity: data.validity,
                                  // plan: data.status,
                                  gifted: data.gifter,
                                  instalment: data.instalment,
                                })
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="gift-decline-btn"
                              onClick={() => openDeclineModal({ id: data.id })}
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="rcv-sts">
                              {data.accepted == "Y" ? (
                                <>You accepted the offering.</>
                              ) : (
                                <>You declined to recieve the gift.</>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {giftData.length==0 && <div className="no-results">No Gifts Received</div>}
          </div>
          {/* <div className="gift-container">
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:false,new:'Regular Membership',validity:'1 year',plan:false,gifted:"John Doe"})}>Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:true,new:'Regular Membership',validity:'1 year',plan:'lower',gifted:"John Doe"})}>Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                    <div className="gift-wrapper">
                        <div className="gift-media">
                            {<img src={Gift} alt="gift" />}
                            <span className="gift-validity">1 Year</span>
                        </div>
                        <div className="gift-content">
                            <div className="gift-above-btn">
                                <p>
                                    <span className="gift-note">New Gift received</span>
                                </p>
                                <p><strong>John Doe</strong> has gifted you a <strong>Regular Membership</strong></p>
                                <p className="gift-worth"><span >worth $600</span> on  December 12, 2024</p>
                            </div>
                            <div className="btn-container">
                                <button className="gift-accept-btn" onClick={()=>openAcceptModal({current:true,new:'Regular Membership',validity:'1 year',plan:'higher',gifted:"John Doe"})}>Accept</button>
                                <button className="gift-decline-btn" onClick={(e) => setDclnOpn(true)}>Decline</button>
                            </div>
                        </div>
                    </div>
                </div> */}
        </div>
        <div
          className="gift-sent-container"
          style={{ display: isGftdOpn ? "block" : "none" }}
        >
          <div className="gift-container">
            {giftedData &&
              giftedData.map((data) => {
                return (
                  <div className="gift-wrapper" key={data.id}>
                    <div className="gift-media gifted-media">
                      {<img src={Gifted} alt="gift" />}
                      <span className="gift-validity">{data.validity}</span>
                    </div>
                    <div className="gift-content">
                      <div className="gift-above-btn">
                        {data.accepted != "Y" && data.accepted != "N" ? (
                          <>
                            <p>
                              <span className="gift-note">Pending</span>
                            </p>
                            <p>
                              <strong>{data.plans}</strong>
                            </p>
                            <p className="gift-worth">
                              A <span>${data.price}</span> gift was gifted to{" "}
                              <strong>{data.gifted}</strong> on {data.date}
                            </p>
                          </>
                        ) : (
                          <>
                            {data.accepted == "N" ? (
                              <>
                                <p>
                                  <span className="gift-note">Declined</span>
                                </p>
                                <p>
                                  <strong>{data.plans}</strong>
                                </p>
                                <p className="gift-worth">
                                  <span>worth ${data.price}</span> that you
                                  gifted has been declined by{" "}
                                  <strong>{data.gifted}</strong> on {data.date}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  <span className="gift-note">Accepted</span>
                                </p>
                                <p>
                                  <strong>{data.plans}</strong>
                                </p>
                                <p className="gift-worth">
                                  <span>worth ${data.price}</span> that you
                                  gifted was accepted by{" "}
                                  <strong>{data.gifted}</strong> on {data.date}{" "}
                                </p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      {/* <div className="btn-container">
                          <button
                            type="button"
                            className="gift-accept-btn"
                            onClick={(e) => setCfmOpn(true)}
                          >
                            Make it your's
                          </button>
                          <button type="button" className="gift-accept-btn">
                            Gift to someone
                          </button>
                        </div> */}
                    </div>
                  </div>
                );
              })}
              
              {giftedData.length==0 && <div className="no-results">Not Yet Given</div>}
            {/* <div className="no-content">No memberships gifted!</div> */}
          </div>
        </div>
      </div>

      {isCfmOpn && (
        <AddModal
          isOpen={isCfmOpn}
          toggle={() => {
            setCfmOpn(!isCfmOpn);
          }}
          closeModal={closeModal}
        />
      )}

      {isDclnOpn && (
        <DeclineModal
          isOpen={isDclnOpn}
          toggle={() => {
            setDclnOpn(!isDclnOpn);
          }}
          closeDcln={closeDcln}
          closeDecModal={closeDeclineModal}
          data={isDclnData}
        />
      )}

      {isGiftAccept && (
        <AcceptModal
          isOpen={isGiftAccept}
          toggle={() => {
            setGiftAccept(!isGiftAccept);
          }}
          closeAccModal={closeAcceptModal}
          data={isGiftData}
        />
      )}
    </>
  );
};

export default connect(null, { login })(GiftMembership);
