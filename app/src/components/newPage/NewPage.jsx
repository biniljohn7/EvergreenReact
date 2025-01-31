import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Spinner } from "reactstrap";
import { getHomeData } from "../../api/home";
import { ToastsStore } from "react-toasts";
import Wrapper from "./newpage.style";
import classnames from "classnames";
import ClampLines from "react-clamp-lines";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Banner from "../common/NewBanner";
import WhatYouCanDo from "./WhatYouCanDo";
import HomeNational from "./HomeNational";
TimeAgo.addLocale(en);

const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
const COL_WIDTH =
    window.innerWidth < 768 ? "50%" : window.innerWidth <= 1024 ? "33%" : "25%";

const IMAGE_SIZE =
    window.innerWidth < 768
        ? "100px"
        : window.innerWidth <= 1440
            ? "150px"
            : "200px";

const RECORD_NO =
    window.innerWidth < 768 ? 4 : window.innerWidth <= 1024 ? 3 : 4;

const NewPage = (props) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("National");

    useEffect(() => {
        setLoading(true);
        getHomeData(activeTab)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    if (err.response.status === 401) {
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
    }, [activeTab]);

    document.title = 'Welcome to Evergreen';

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const List = () => {
        return (
            <>


                <div className="news-section">
                    <div className="head-box">
                        <div className="container">
                            <h2 className="cursor-pointer" onClick={(e) => props.history.push("/news")}>news</h2>

                        </div>
                    </div>
                    <div className="news-box">
                        <div className="container">
                            {data.news && data.news.length > 0 ? (
                                <React.Fragment>
                                    {data.news.slice(0, RECORD_NO).map((ev) => {
                                        return (
                                            <div onClick={(e) =>
                                                props.history.push(`/news/${ev.slug}`)
                                            }
                                                className="news-item cursor-pointer"
                                                key={ev.slug}
                                            >
                                                <div className="image-box">
                                                    {ev.imageUrl ?
                                                        (<img
                                                            src={ev.imageUrl}
                                                            alt={ev.title.substr(0, 10) + "..."}
                                                            className="image-sizes"
                                                        />) : null}
                                                </div>

                                                <h2>
                                                    <ClampLines
                                                        text={ev.title}
                                                        id={"news_title_" + ev.newsfeedId}
                                                        lines={2}
                                                        ellipsis="..."
                                                        buttons={false}
                                                        className=""
                                                    />
                                                </h2>
                                                <p className="">
                                                    <ClampLines
                                                        text={ev.description}
                                                        id={"news_desc" + ev.newsfeedId}
                                                        lines={2}
                                                        ellipsis="..."
                                                        buttons={false}
                                                        className=""
                                                    />
                                                </p>
                                                <div className="button-box white">
                                                    <span>READ MORE</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ) : (
                                <div className="text-center ">
                                    No Record Found!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="event-section">
                    <div className="head-box right">
                        <div className="container">
                            <h2 className="cursor-pointer" onClick={(e) => props.history.push("/events")}>events</h2>
                        </div>
                    </div>
                    <div className="event-box">
                        <div className="container">
                            <div className="image-box">
                                {data.events && data.events.length > 0 ? (
                                    <>
                                        {data.events.slice(0, 1).map((ev) => {
                                            return (
                                                <div
                                                    className="cursor-pointer"
                                                    key={ev.eventId}
                                                    onClick={(e) =>
                                                        props.history.push(
                                                            `/events/${ev.name.replaceAll("/", " ")}`,
                                                            {
                                                                eventId: ev.eventId,
                                                            }
                                                        )
                                                    }
                                                >
                                                    {ev.image ?
                                                        (<img
                                                            src={ev.image}
                                                            alt={ev.name.substr(0, 10) + "..."}
                                                            className="image-sizes"
                                                        />) : null}



                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <>
                                        No Image Found!
                                    </>
                                )}
                            </div>
                            <div className="content-box">
                                {data.events && data.events.length > 0 ? (
                                    <>
                                        {data.events.slice(0, RECORD_NO).map((ev) => {
                                            return (
                                                <div
                                                    className="event-item cursor-pointer"
                                                    key={ev.eventId}
                                                    onClick={(e) =>
                                                        props.history.push(
                                                            `/events/${ev.name.replaceAll("/", " ")}`,
                                                            {
                                                                eventId: ev.eventId,
                                                            }
                                                        )
                                                    }
                                                >
                                                    <div className="e-date">{ev.date}</div>
                                                    <h2>
                                                        <ClampLines
                                                            text={ev.name}
                                                            id={"event_name_" + ev.eventId}
                                                            lines={2}
                                                            ellipsis="..."
                                                            buttons={false}
                                                            className="text-bold"
                                                        />
                                                    </h2>
                                                    <p>{ev.address || ""}</p>
                                                    <div className="button-box">
                                                        <span>READ MORE</span>
                                                    </div>



                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <div className="text-center">
                                        No Record Found!
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="benefits-section">
                    <div className="head-box">
                        <div className="container">
                            <h2 className="cursor-pointer" onClick={(e) => props.history.push("/benefits")}>benefits</h2>
                        </div>
                    </div>
                    <div className="benefit-box">
                        <div className="container">
                            {data.benefits && data.benefits.length > 0 ? (
                                <>
                                    {data.benefits.slice(0, RECORD_NO).map((ev) => {
                                        return (
                                            <div
                                                className="benefit-item cursor-pointer"
                                                key={ev.benefitId}
                                                onClick={(e) =>
                                                    props.history.push(
                                                        `/benefits/${ev.categoryName.replaceAll("/", "")}/${ev.categoryId
                                                        }/${ev.benefitId}`
                                                    )
                                                }
                                            >
                                                <div className="per">
                                                    {ev.discount} OFF
                                                </div>
                                                <ClampLines
                                                    text={ev.shortDetails}
                                                    id={"benefit_shortDetails_" + ev.benefitId}
                                                    lines={2}
                                                    ellipsis="..."
                                                    buttons={false}
                                                    className="title"
                                                />
                                                <div className="cat">
                                                    {ev.categoryName}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="text-center">
                                    No Record Found!
                                </div>
                            )}



                        </div>
                    </div>
                </div>

                <HomeNational />
                <div className="advo-section home">
                    <div className="head-box right">
                        <div className="container">
                            <h2 className="cursor-pointer" onClick={(e) => props.history.push("/advocacy")}>advocacy</h2>
                        </div>
                    </div>
                    <div className="advo-box">
                        <div className="container">
                            <div className="ad-left">
                                {data.advocacies && data.advocacies.length > 0 ? (
                                    <>
                                        {data.advocacies.slice(0, RECORD_NO).map((ev) => {
                                            return (
                                                <div
                                                    className="adv-item cursor-pointer"
                                                    key={ev.advocacyId}
                                                    onClick={(e) =>
                                                        props.history.push(
                                                            `/advocacy/Issues/${ev.title.replaceAll("/", " ")}`,
                                                            {
                                                                advocacyId: ev.advocacyId,
                                                                advocacyType: "Issues",
                                                            }
                                                        )
                                                    }
                                                >
                                                    <div className="image-box">
                                                        {ev.image ?
                                                            (<img
                                                                src={ev.image}
                                                                alt={ev.title.substr(0, 10) + "..."}
                                                                className="image-sizes"
                                                            />) : null}
                                                    </div>
                                                    <h2 className="">
                                                        {/* <h6 className="text-bold">{ev.title}</h6> */}
                                                        <ClampLines
                                                            text={ev.title}
                                                            id={"advocacy_title" + ev.advocacyId}
                                                            lines={2}
                                                            ellipsis="..."
                                                            buttons={false}
                                                            className="text-bold"
                                                        />

                                                    </h2>
                                                    <div className="button-box">
                                                        <span>READ MORE</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <div className="text-center">
                                        No Record Found!
                                    </div>
                                )}


                            </div>
                            <div className="ad-right">
                                What do you want to advocate for? There are many options to choose from. Passionate about Social Justice? Join us now!
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    };

    return isLoading ? (
        <div className="text-center custom-spinner">
            <Spinner color="danger" />
        </div>
    ) : data ? (
        <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
            {/* <LoadingOverlay active={loader} spinner={<Spinner />}> */}
            <div className="site-spacing- ptb-50-">
                <Banner />

                <WhatYouCanDo />

                <TabContent activeTab={activeTab}>
                    <div className="home-tab">
                        <div className="container">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={
                                            classnames({ active: activeTab === "National" }) + " fs-18"
                                        }
                                        onClick={() => {
                                            toggle("National");
                                        }}
                                    >
                                        National
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={
                                            classnames({ active: activeTab === "Regional" }) + " fs-18"
                                        }
                                        onClick={() => {
                                            toggle("Regional");
                                        }}
                                    >
                                        Regional
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={
                                            classnames({ active: activeTab === "State" }) + " fs-18"
                                        }
                                        onClick={() => {
                                            toggle("State");
                                        }}
                                    >
                                        State
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={
                                            classnames({ active: activeTab === "Chapter" }) + " fs-18"
                                        }
                                        onClick={() => {
                                            toggle("Chapter");
                                        }}
                                    >
                                        Section
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>

                    <TabPane tabId="National" className="mt-20">
                        <List />
                    </TabPane>
                    <TabPane tabId="Regional" className="mt-20">
                        <List />
                    </TabPane>
                    <TabPane tabId="State" className="mt-20">
                        <List />
                    </TabPane>
                    <TabPane tabId="Chapter" className="mt-20">
                        <List />
                    </TabPane>
                </TabContent>
            </div>
            {/* </LoadingOverlay> */}
        </Wrapper>
    ) : (
        <div className="border text-center text-bold mt-20 ptb-50 plr-20">
            No Record Found!
        </div>
    );
};

export default NewPage;
