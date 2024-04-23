import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import Wrapper from "./wrapper.style";
import { getReferralDetails } from "../../api/memberAPI";
import { ToastsStore } from "react-toasts";
import Referral_1 from "../../assets/images/referral_1x.png";
import { SITE_NAME } from "../../helper/constant";

const Referral = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getReferralDetails()
      .then((res) => {
        if (res.success === 1) {
          setData(res.data);
          setLoading(false);
        } else {
          ToastsStore.error(res.message);
          setData(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setData(null);
        ToastsStore.error("Something went wrong!");
        setLoading(false);
      });
  }, []);

  const shareCode = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share your referral code",
          text: `Install ${SITE_NAME} App using this code: ${data.referralCode}`,
        })
        .then(() => {
          // ToastsStore.info('Shared succesfully!')
        })
        .catch((error) => {
          console.error("Error sharing code, ", error);
          ToastsStore.error("Failed to share! Please try again later.");
        });
    } else {
      ToastsStore.error(`Your system doesn't support sharing files.`);
    }
  };

  return loading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>


      <div className="due-section">
        <div className="head-box">
          <div className="container">
            <h2>referrals</h2>
          </div>
        </div>
        {data ? (
          <div className="due-box referal-box">
            <div className="container">
              <div className="ref-box">

                <div
                  className={
                    "share-box" +
                    (window.innerWidth <= 1024 ? " col-lg-12" : "")
                  }
                >
                  <div className="s-img-box"><img src={Referral_1} alt="referral_points" className="icon" /></div>
                  <div class="s-cnt-box">
                    <h3>Points Earned:{data.earnedPoints}</h3>
                    <p className="">
                      Take advantage of our Refer A Member Program! Simply tell them
                      to sign up to this App and pay their Membership dues using your
                      Code, and you will both be rewarded. This promotion is for a
                      limited time only.
                    </p>
                  </div>
                  <div className="s-val-box">{data.referralCode}</div>
                  <div className=" s-text-box cursor-pointer"
                    onClick={shareCode}>SHARE YOUR CODE!
                  </div>
                </div>

                <div
                  className={
                    "due-item point-box" +
                    (window.innerWidth <= 1024 ? " col-lg-12 mt-50" : "")
                  }
                >
                  <div className="due-head">Points earned by sharing the code :</div>
                  <div className="point-head">
                    <div className="e-name"> {"Name"}</div>
                    <div className="e-point">{"Points"}</div>
                  </div>

                  <div className="point-table ash">
                    {data &&
                      data.referralCodeSharedList &&
                      data.referralCodeSharedList.length > 0 ? (
                      data.referralCodeSharedList.map((el, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              "point-head" +
                              (index !== 0 ? " border-top" : "")
                            }
                          >
                            <div
                              className={
                                "e-name"
                              }
                            >
                              {el.name}
                              <div className=" pt-0 ">
                                <div>
                                  {new Date(el.createdAt).toLocaleDateString(
                                    "en-US"
                                  )}
                                </div>
                              </div>
                            </div>

                            <div
                              className={
                                "e-point"
                              }
                            >
                              {el.referralCodeSharingPoints || 0}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="ptb-50 text-bold text-center">
                        Code not shared yet!
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    "due-item point-box" +
                    (window.innerWidth <= 1024 ? " col-lg-12 mt-50" : "")
                  }
                >
                  <div className="due-head">Points earned by using the code :</div>
                  <div className="point-head">
                    <div className="e-name"> {"Name"}</div>
                    <div className="e-point">{"Points"}</div>
                  </div>



                  <div className="point-table ash">
                    {data &&
                      data.referralCodeUsedList &&
                      data.referralCodeUsedList.length > 0 ? (
                      data.referralCodeUsedList.map((el, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              "point-head" +
                              (index !== 0 ? " border-top" : "")
                            }
                          >
                            <div
                              className={
                                "e-name"
                              }
                            >
                              {el.name}
                              <div className=" pt-0 text-bold">
                                {el.usedReferralCode}
                              </div>
                              <div>
                                {new Date(el.createdAt).toLocaleDateString("en-US")}
                              </div>
                            </div>

                            <div
                              className={
                                "e-point"
                              }
                            >
                              {el.referralCodeUsingPoints || 0}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="ptb-50 text-bold text-center">
                        No History!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="ptb-50 border text-center">No Data Found!</div>
        )}
      </div>
    </Wrapper>
  );
};

export default Referral;
