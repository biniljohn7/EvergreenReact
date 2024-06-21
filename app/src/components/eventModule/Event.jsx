import React, { useState, useEffect } from "react";
import { TabContent, TabPane/*, Nav, NavItem, NavLink*/ } from "reactstrap";
import Wrapper from "./event.style.js";
import { listEvent, getDropdown } from "../../api/eventAPI";
import { ToastsStore } from "react-toasts";
import Pagination from "../../UI/pagination/pagination";
// import classnames from "classnames";
import Select from "react-select";
import { Spinner } from "reactstrap";
// import ClampLines from "react-clamp-lines";

import Banner from "../common/Banner.jsx";
import EventBoxImg from '../../assets/images/event-box.jpg'

const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
const COL_WIDTH =
  window.innerWidth < 768 ? "50%" : window.innerWidth <= 1024 ? "33%" : "25%";

const LIMIT = 10;

const IMAGE_SIZE =
  window.innerWidth < 768
    ? "100px"
    : window.innerWidth <= 1440
      ? "150px"
      : "200px";

const Event = (props) => {
  const [dropdown, setDropdown] = useState(null);
  const [event, setEvent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [option, setOption] = useState(null);

  useEffect(() => {
    getDropdown()
      .then((res) => {
        setDropdown(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    getList({
      pageId: currentPage,
      type: "AllEvents",
    });
  }, []);

  document.title = 'Events - ' + window.seoTagLine;

  //   useEffect(() => {
  //     getList({
  //       location: activeTab === 'all' && option ? option.type : null,
  //       locationIds: option ? [option.id] : [],
  //       pageId: currentPage,
  //       type: activeTab === 'all' ? 'AllEvents' : activeTab,
  //     })
  //   }, [currentPage, option])

  useEffect(() => {
    setOption(null);
    setPage(1);
    setTotalPage(0);
    getList({
      location: null,
      locationIds: [],
      pageId: currentPage,
      type: activeTab === "all" ? "AllEvents" : activeTab,
    });
  }, [activeTab]);

  const getList = (body) => {
    setLoading(true);
    listEvent(body)
      .then((res) => {
        setEvent(res.data.list);
        setPage(res.data.currentPageNo);
        setTotalPage(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        ToastsStore.error("Something went wrong!");
      });
  };

  /* 
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  */

  const ListEvent = () => {
    return isLoading ? (
      <div className="text-center custom-spinner mtp-20">
        <Spinner color="danger" />
      </div>
    ) :
      event.length > 0 ? (
        <React.Fragment>
          {/* <div className="grid-container mt-20"> */}
          {event.map((ev) => {
            return (
              <>
                <div
                  className="event-item"
                  key={ev.eventId}
                >
                  {
                    ev.image ?
                      <div className="ev-img-box">
                        <img
                          src={ev.image}
                          alt={ev.name.substr(0, 10) + "..."}
                          className="image-size"
                        />
                      </div> :
                      null
                  }
                  <div className="ev-content">
                    <div className="e-date">
                      {ev.date ? ev.date : ""}
                    </div >
                    <h2>
                      {ev.name}
                    </h2>
                    <p>
                      {ev.address || ""}
                    </p>
                    <div className="button-box">
                      <span onClick={(e) =>
                        props.history.push(
                          `/events/${ev.name.replaceAll("/", " ")}`,
                          {
                            eventId: ev.eventId,
                          }
                        )
                      }>READ MORE</span>
                    </div>
                  </div>
                </div >
              </>
            );
          })
          }
          {/* </div> */}

          <div className="pagination">
            <Pagination
              activePage={currentPage}
              length={totalPage * LIMIT}
              count={LIMIT}
              handler={(pageNumber) => {
                setPage(pageNumber);
                getList({
                  location: activeTab === "all" && option ? option.type : null,
                  locationIds: option ? [option.id] : [],
                  pageId: pageNumber,
                  type: activeTab === "all" ? "AllEvents" : activeTab,
                });
              }}
            />
          </div>
        </React.Fragment >
      ) : (
        <div className="border ptb-50 plr-20 text-center text-bold mt-50">
          No Record Found!
        </div>
      );
  };

  return (
    <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
      <Banner />

      <div className="event-section">
        <div className="head-box ">
          <div className="container">
            <h2>events</h2>
          </div>
        </div>
        <div className="container">
          {/*
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "all" })}
                  onClick={() => {
                    toggle("all");
                  }}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "National" })}
                  onClick={() => {
                    toggle("National");
                  }}
                >
                  National
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "Regional" })}
                  onClick={() => {
                    toggle("Regional");
                  }}
                >
                  Regional
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "State" })}
                  onClick={() => {
                    toggle("State");
                  }}
                >
                  State
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "Chapter" })}
                  onClick={() => {
                    toggle("Chapter");
                  }}
                >
                  Section
                </NavLink>
              </NavItem>
            </Nav>
          </div>
           */}
          <div className="event-box">
            <div className="container">
              <div className="image-box">
                <img src={EventBoxImg} alt="" />
              </div>
              <div className="content-box">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="all" className="mt-20">
                    <div className="position-relative height-40">
                      <div
                        className={
                          "dropdown " + (window.innerWidth < 768 ? "wp-80" : "wp-25")
                        }
                      >
                        <Select
                          options={dropdown ? dropdown.all : []}
                          onChange={(op) => {
                            setOption(op);
                            getList({
                              location: op.type,
                              locationIds: [op.id],
                              pageId: currentPage,
                              type: "AllEvents",
                            });
                          }}
                          value={option}
                          placeholder="Choose Event"
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => op || ""}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "17px",
                            }),
                            placeholder: (base, state) => ({
                              ...base,
                              marginLeft: "7px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <ListEvent />
                  </TabPane>
                  <TabPane tabId="National" className="mt-20">
                    <div className="position-relative height-40">
                      <div
                        className={
                          "dropdown " + (window.innerWidth < 768 ? "wp-80" : "wp-25")
                        }
                      >
                        <Select
                          options={dropdown ? dropdown.national : []}
                          onChange={(op) => {
                            setOption(op);
                            getList({
                              location: op ? op.type : null,
                              locationIds: op ? [op.id] : [],
                              pageId: currentPage,
                              type: "National",
                            });
                          }}
                          value={option}
                          placeholder="Choose Event"
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => op || ""}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "17px",
                            }),
                            placeholder: (base, state) => ({
                              ...base,
                              marginLeft: "7px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <ListEvent />
                  </TabPane>
                  <TabPane tabId="Regional" className="mt-20">
                    <div className="position-relative height-40">
                      <div
                        className={
                          "dropdown " + (window.innerWidth < 768 ? "wp-80" : "wp-25")
                        }
                      >
                        <Select
                          options={dropdown ? dropdown.regional : []}
                          onChange={(op) => {
                            setOption(op);
                            getList({
                              location: op ? op.type : null,
                              locationIds: op ? [op.id] : [],
                              pageId: currentPage,
                              type: "Regional",
                            });
                          }}
                          value={option}
                          placeholder="Choose Event"
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => op || ""}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "17px",
                            }),
                            placeholder: (base, state) => ({
                              ...base,
                              marginLeft: "7px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <ListEvent />
                  </TabPane>
                  <TabPane tabId="State" className="mt-20">
                    <div className="position-relative height-40">
                      <div
                        className={
                          "dropdown " + (window.innerWidth < 768 ? "wp-80" : "wp-25")
                        }
                      >
                        <Select
                          options={dropdown ? dropdown.state : []}
                          onChange={(op) => {
                            setOption(op);
                            getList({
                              location: op ? op.type : null,
                              locationIds: op ? [op.id] : [],
                              pageId: currentPage,
                              type: "State",
                            });
                          }}
                          value={option}
                          placeholder="Choose Event"
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => op || ""}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "17px",
                            }),
                            placeholder: (base, state) => ({
                              ...base,
                              marginLeft: "7px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <ListEvent />
                  </TabPane>
                  <TabPane tabId="Chapter" className="mt-20">
                    <div className="position-relative height-40">
                      <div
                        className={
                          "dropdown " + (window.innerWidth < 768 ? "wp-80" : "wp-25")
                        }
                      >
                        <Select
                          options={dropdown ? dropdown.chapter : []}
                          onChange={(op) => {
                            setOption(op);
                            getList({
                              location: op ? op.type : null,
                              locationIds: op ? [op.id] : [],
                              pageId: currentPage,
                              type: "Chapter",
                            });
                          }}
                          value={option}
                          placeholder="Choose Event"
                          getOptionLabel={(op) => op.name}
                          getOptionValue={(op) => op || ""}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: "17px",
                            }),
                            placeholder: (base, state) => ({
                              ...base,
                              marginLeft: "7px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <ListEvent />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Event;
