import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "reactstrap";
import Wrapper from "./inbox.style";
import { getProfile } from "../../api/inboxAPI";
import { ToastsStore } from "react-toasts";
import UserPic from "../../assets/images/user_1x.png";
import LabelWithValue from "../../UI/labelWithValue/LabelWithValue";

const ChatProfile = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile(props.memberId)
      .then((res) => {
        if (res.success === 1) {
          setData(res.data);
        } else {
          ToastsStore.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        ToastsStore.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + "px" }}
      ></div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="xl"
        className="signin"
      >
        <Wrapper>
          {loading ? (
            <div className="text-center ptb-100">
              <div className="custom-spinner">
                <Spinner color="danger" />
              </div>
            </div>
          ) : data ? (
            <div className="ptb-50 position-relative plr-50">
              <span
                className="close text-bold cursor-pointer"
                onClick={props.toggle}
              >
                X
              </span>
              <div className="text-center">
                <img
                  src={data.profileData.profileImage || UserPic}
                  alt="profile_pic"
                  className="profile_pic"
                />
              </div>
              <h5 className="text-center text-bold mt-10">
                {data.profileData.name}
              </h5>
              <div className="row mlr-0 mt-50 border ptb-15">
                {data.profileData.statusUpdate && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Status"
                      value={data.profileData.statusUpdate}
                    />
                  </div>
                )}

                {data.profileData.address && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Address"
                      value={data.profileData.address}
                    />
                  </div>
                )}

                {data.visible.phoneNumber && data.visible.phonecode && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Phone Number"
                      value={
                        data.profileData.phonecode +
                        "-" +
                        data.profileData.phoneNumber
                      }
                    />
                  </div>
                )}

                {data.profileData.email && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Email"
                      value={data.profileData.email}
                    />
                  </div>
                )}

                {data.profileData.biography && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Biography"
                      value={data.profileData.biography}
                    />
                  </div>
                )}

                {data.profileData.occupation &&
                  data.profileData.occupation[0] && (
                    <div
                      className={
                        "col-12 col-sm-12 col-md-12 col-xl-4 " +
                        (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                      }
                    >
                      <LabelWithValue
                        label="Occupation"
                        value={data.profileData.occupation[0]}
                      />
                    </div>
                  )}

                {data.profileData.industry && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Industry"
                      value={data.profileData.industry}
                    />
                  </div>
                )}

                {data.profileData.chapterOfInitiation && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Section of Initiation"
                      value={data.profileData.chapterOfInitiation}
                    />
                  </div>
                )}
                {data.profileData.yearOfInitiation && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Year of Initiation"
                      value={data.profileData.yearOfInitiation}
                    />
                  </div>
                )}
                {data.profileData.currentChapter && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Current Chapater"
                      value={data.profileData.currentChapter}
                    />
                  </div>
                )}

                {data.profileData.leadershipRole && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Leadership Role"
                      value={data.profileData.leadershipRole}
                    />
                  </div>
                )}

                {data.profileData.household && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Household"
                      value={data.profileData.household}
                    />
                  </div>
                )}

                {data.profileData.salaryRange && (
                  <div
                    className={
                      "col-12 col-sm-12 col-md-12 col-xl-4 " +
                      (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                    }
                  >
                    <LabelWithValue
                      label="Salary Range"
                      value={data.profileData.salaryRange}
                    />
                  </div>
                )}

                {data.profileData.education &&
                  data.profileData.education.length > 0 && (
                    <div
                      className={
                        "col-12 col-sm-12 col-md-12 col-xl-4 " +
                        (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                      }
                    >
                      <LabelWithValue
                        label="Education"
                        value={
                          <ul className="ml-15 mb-0">
                            {data.profileData.education.map((e, key) => {
                              return <li key={key}>{e}</li>;
                            })}
                          </ul>
                        }
                      />
                    </div>
                  )}

                {data.profileData.certification &&
                  data.profileData.certification.length > 0 && (
                    <div
                      className={
                        "col-12 col-sm-12 col-md-12 col-xl-4 " +
                        (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                      }
                    >
                      <LabelWithValue
                        label="Certification"
                        value={
                          <ul className="ml-15 mb-0">
                            {data.profileData.certification.map((e, key) => {
                              return <li key={key}>{e}</li>;
                            })}
                          </ul>
                        }
                      />
                    </div>
                  )}

                {data.profileData.expertise &&
                  data.profileData.expertise.length > 0 && (
                    <div
                      className={
                        "col-12 col-sm-12 col-md-12 col-xl-4 " +
                        (window.innerWidth === 1024 ? "col-lg-12" : "col-lg-6")
                      }
                    >
                      <LabelWithValue
                        label="Expertise"
                        value={
                          <ul className="ml-15 mb-0">
                            {data.profileData.expertise.map((e, key) => {
                              return <li key={key}>{e}</li>;
                            })}
                          </ul>
                        }
                      />
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <>
              <span
                className="close text-bold cursor-pointer mb-10 pt-50"
                onClick={props.toggle}
              >
                X
              </span>
              <div className="text-align mt-15 text-bold">No data found!</div>
            </>
          )}
        </Wrapper>
      </Modal>
    </div>
  );
};

export default ChatProfile;
