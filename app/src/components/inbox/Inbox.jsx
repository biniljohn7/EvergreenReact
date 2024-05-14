import React, { useState, useEffect } from "react";
import Wrapper from "./inbox.style";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Spinner } from "reactstrap";
import { ToastsStore } from "react-toasts";
import classnames from "classnames";
import Filter from "../../assets/images/filter.png";
import Input from "../../UI/input/input";
import RadioButton from "../../UI/radiobutton/radiobutton";
import Button from "../../UI/button/button";
import { Modal } from "reactstrap";
import User_05 from "../../assets/images/user_05x.png";
import Pagination from "../../UI/pagination/pagination";
import { getContacts } from "../../api/inboxAPI";
import WebChat from "./WebChat";
import MobileChat from "./MobileChat";
import Chat from "../../assets/images/chat.png";
import ProfileModal from "./ChatProfile";
import { connect } from "react-redux";
import authActions from "../../redux/auth/actions";
import { store } from "../../redux/store";
const { set } = authActions;

const LIMIT = 10;

let memberId;

const FILTER = ["Nation", "Region", "State", "Chapter"];

const Inbox = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Messages");
  const [filter, setFilter] = useState("Nation");
  const [tempState, setState] = useState("Nation");
  const [search, setSearch] = useState("");
  const [currentPage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [directory, setDirectory] = useState(null);
  const [modal, setModal] = useState(false);

  const toggle = (tab) => {
    props.set({
      ...store.getState().auth,
      chatMemberId: null,
    });
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (tab === "Directory" && !directory) {
        setPage(1);
        setTotalPage(0);
        setSearch("");
        setDirectory(null);
        setFilter("Nation");
        setState("Nation");
        getList({
          pageId: 1,
          search: "",
          filter: "Nation",
        });
      }
    }
  };

  useEffect(() => {
    props.set({
      ...store.getState().auth,
      chatMemberId: null,
    });
    return () => {
      //your cleanup code codes here
      props.set({
        ...store.getState().auth,
        chatMemberId: null,
      });
    };
  }, []);

  useEffect(() => {
    if (activeTab === "Directory") {
      getList({
        filter: filter,
        pageId: 1,
        search: search || "",
      });
    }
  }, [filter]);

  const getList = (body) => {
    setLoading(true);
    getContacts(body)
      .then((res) => {
        setDirectory(res.data.list);
        setPage(res.data.currentPageNo);
        setTotalPage(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.request) {
          ToastsStore.error(
            "Unable to connect to server. Please try again later!"
          );
        } else {
          ToastsStore.error("Something went wrong!");
        }
      });
  };

  return (
    <Wrapper>
      <div className="site-spacing ptb-50">
        {/* <h4 className="text-bold mb-20 border-bottom">Inbox</h4> */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={
                classnames({ active: activeTab === "Messages" }) + " fs-18"
              }
              onClick={() => {
                toggle("Messages");
              }}
            >
              Messages
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                classnames({ active: activeTab === "Directory" }) + " fs-18"
              }
              onClick={() => {
                toggle("Directory");
              }}
            >
              Directory
            </NavLink>
          </NavItem>
        </Nav>

        {isLoading ? (
          <div className="text-center mt-20">
            <Spinner color="danger" />
          </div>
        ) : (
          <TabContent activeTab={activeTab}>
            {activeTab === "Messages" && (
              <TabPane tabId="Messages" className="mt-20">
                {window.innerWidth >= 1024 ? <WebChat /> : <MobileChat />}
              </TabPane>
            )}
            <TabPane tabId="Directory" className="mt-20">
              <div className="row mb-30">
                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div
                    className={
                      "position-relative " +
                      (window.innerWidth >= 1024
                        ? "wp-40"
                        : window.innerWidth === 768
                          ? "wp-50"
                          : "wp-90")
                    }
                  >
                    <Input
                      type="text"
                      placeholder="Search by name or Section name"
                      id="directory_search"
                      contentFontSize={"fs-14"}
                      className={"search "}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onEnter={() => {
                        setPage(1);
                        setTotalPage(0);
                        getList({
                          filter: filter,
                          pageId: 1,
                          search: search,
                        });
                      }}
                    />
                    <i
                      className="fa fa-search pwd cursor-pointer"
                      onClick={(e) => {
                        setPage(1);
                        setTotalPage(0);
                        getList({
                          filter: filter,
                          pageId: 1,
                          search: search,
                        });
                      }}
                    ></i>
                  </div>
                </div>
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                  <img
                    src={Filter}
                    alt="filter"
                    className="mt-5 float-right cursor-pointer"
                    height="30px"
                    width="30px"
                    onClick={(e) => {
                      setOpen(!isOpen);
                    }}
                  />
                </div>
              </div>
              {directory && directory.length > 0 ? (
                <>
                  <div
                    className={
                      "border " +
                      (window.innerWidth > 1024
                        ? "wp-40"
                        : window.innerWidth === 1024
                          ? "wp-60"
                          : window.innerWidth === 768
                            ? "wp-70"
                            : "wp-100")
                    }
                  >
                    {directory.map((c, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "row ptb-10 mlr-10" +
                            (index !== 0 ? " border-top" : "")
                          }
                        >
                          <div
                            className={
                              "col-3 col-sm-3 col-lg-2 col-md-2 col-xl-3"
                            }
                          >
                            <img
                              alt="user"
                              src={c.profileImage || User_05}
                              className="user cursor-pointer"
                              onClick={(e) => {
                                memberId = c.memberId;
                                setModal(!modal);
                              }}
                            />
                          </div>
                          <div
                            className={
                              "col-6 col-sm-6 col-md-7 col-lg-7 col-xl-6 text-bold"
                            }
                          >
                            {c.fullName}
                          </div>
                          <div
                            className={
                              "col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-right text-bold"
                            }
                          >
                            <img
                              src={Chat}
                              alt="chat"
                              className="cursor-pointer"
                              onClick={(e) => {
                                props.set({
                                  ...store.getState().auth,
                                  chatMemberId: c.memberId,
                                  chatFullName: c.fullName,
                                  chatProfileImage: c.profileImage,
                                });

                                setActiveTab("Messages");
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pagination">
                    <Pagination
                      activePage={currentPage}
                      length={totalPage * LIMIT}
                      count={LIMIT}
                      handler={(pageNumber) => {
                        setPage(pageNumber);
                        // getList({
                        //   advocacyType: activeTab,
                        //   pageId: pageNumber,
                        //   search: search,
                        //   type: type.value,
                        // })
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="ptb-50 border text-center text-bold">
                  No Contact Found!
                </div>
              )}
            </TabPane>
          </TabContent>
        )}
      </div>

      {isOpen && (
        <div>
          <div
            className="bg-light"
            style={{ height: window.innerHeight + "px" }}
          ></div>
          <Modal
            isOpen={isOpen}
            toggle={() => {
              setState(filter);
              setOpen(!isOpen);
            }}
            centered
            size="lg"
            className="signup"
          >
            <Wrapper>
              <div className="ptb-30 plr-20 position-relative">
                <label
                  className="cancel text-bold cursor-pointer"
                  onClick={() => {
                    setState(filter);
                    setOpen(!isOpen);
                  }}
                >
                  X
                </label>
                <h4 className="mb-20 text-bold">Filter:</h4>
                {FILTER.map((f, index) => {
                  return (
                    <RadioButton
                      key={index}
                      id={f}
                      name="filter_option"
                      value={f}
                      checked={tempState === f}
                      label={f}
                      padding="ptb-5"
                      onChange={(e) => setState(f)}
                    />
                  );
                })}
                <div className="text-center">
                  <Button
                    className="mt-20 plr-50"
                    name="SET"
                    clicked={(e) => {
                      setPage(1);
                      setTotalPage(0);
                      setSearch("");
                      setFilter(tempState);
                      setOpen(!isOpen);
                    }}
                  />
                </div>
              </div>
            </Wrapper>
          </Modal>
        </div>
      )}

      {modal && memberId && (
        <ProfileModal
          isOpen={modal}
          toggle={() => {
            setModal(!modal);
            memberId = null;
          }}
          memberId={memberId}
        />
      )}
    </Wrapper>
  );
};

export default connect(null, { set })(Inbox);
