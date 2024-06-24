import React, { useState, useEffect } from "react";
import Wrapper from "./news.style.js";
//import { listNews, reactToNews } from "../../api/newsApi";
import { listNews } from "../../api/newsApi";
import { ToastsStore } from "react-toasts";
import Pagination from "../../UI/pagination/pagination";
import { Spinner } from "reactstrap";
import { NEWS_LOCATION } from "../../helper/constant";
import Select from "react-select";
import ClampLines from "react-clamp-lines";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import LoadingOverlay from "react-loading-overlay";
TimeAgo.addLocale(en);

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

const News = (props) => {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //const [loader, setLoader] = useState(false);
  const [loader] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [type, setType] = useState(NEWS_LOCATION[0]);

  useEffect(() => {
    getList(currentPage, type.value);
  }, []);

  const getList = (pageId, type) => {
    setLoading(true);
    listNews(pageId, type)
      .then((res) => {
        setNews(res.data);
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

  document.title = 'News - ' + window.seoTagLine;

  const ListNews = () => {
    return isLoading ? (
      <div className="text-center mt-40">
        <Spinner color="danger" />
      </div>
    ) : news && news.length > 0 ? (
      <React.Fragment>
        <div className="grid-container mt-40">
          {news.map((ev) => {
            // let isLiked = ev.isLikedByMe
            // let likedCount = ev.likesCount
            // console.log("ev", ev, "des", ev.description, "title", ev.title);
            // console.log("des", ev.description);
            // console.log("title", ev.title);
            return (
              <div className="grid-item pb-20 shadow-sm" key={ev.slug}>
                <div
                  className="cursor-pointer "
                  onClick={(e) =>
                    props.history.push(`/news/${ev.slug}`, { news: ev })
                  }
                >
                  <div className="box">
                    {
                      ev.imageUrl ?
                        <img
                          src={ev.imageUrl}
                          alt={ev.title.substr(0, 10) + "..."}
                          className="image-size"
                        /> :
                        null
                    }
                  </div>
                  <div className="plr-10 mt-5 text-danger position-relative">
                    <i className="fa fa-globe mr-3" aria-hidden="true"></i>
                    {ev.provider}
                    <div className="date">
                      <i className="fa fa-clock-o mr-5" aria-hidden="true"></i>
                      {new Date(ev.newsDate).toLocaleString().replace(':00 ', ' ')}
                      {/* <ReactTimeAgo
                        date={new Date(ev.createdAt)}
                        locale="en-US"
                      /> */}
                      { }
                    </div>
                  </div>
                  <div className="plr-10 mt-10">
                    <ClampLines
                      text={ev.title}
                      id={"news_title_" + ev.slug}
                      lines={2}
                      ellipsis="..."
                      buttons={false}
                      className="text-bold"
                    />
                  </div>
                  <div className="plr-10 mt-5">
                    <ClampLines
                      text={ev.description}
                      id={"news_desc" + ev.slug}
                      lines={2}
                      ellipsis="..."
                      buttons={false}
                      className=""
                    />
                  </div>
                </div>
                {/* <div className="plr-10 mt-5 text-danger">
                  {ev.isLikedByMe ? (
                    <i
                      className="fa fa-heart text-danger cursor-pointer"
                      aria-hidden="true"
                      onClick={(e) => {
                        setLoader(true);

                        reactToNews(ev.newsfeedId)
                          .then((res) => {
                            if (res.success === 1) {
                              ToastsStore.info(res.message);

                              listNews(currentPage, type.value)
                                .then((res) => {
                                  setNews(res.data.list);
                                  setPage(res.data.currentPageNo);
                                  setTotalPage(res.data.totalPages);
                                })
                                .catch((err) => {
                                  console.error(err);
                                  // ToastsStore.error('Something went wrong!')
                                });
                            } else {
                              ToastsStore.error(res.message);
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                            ToastsStore.error("Something went wrong!");
                          })
                          .finally(() => {
                            setLoader(false);
                          });
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa fa-heart-o cursor-pointer"
                      aria-hidden="true"
                      onClick={(e) => {
                        setLoader(true);
                        reactToNews(ev.newsfeedId)
                          .then((res) => {
                            if (res.success === 1) {
                              ToastsStore.info(res.message);

                              listNews(currentPage, type.value)
                                .then((res) => {
                                  setNews(res.data.list);
                                  setPage(res.data.currentPageNo);
                                  setTotalPage(res.data.totalPages);
                                })
                                .catch((err) => {
                                  console.error(err);
                                  // ToastsStore.error('Something went wrong!')
                                });
                            } else {
                              ToastsStore.error(res.message);
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                            ToastsStore.error("Something went wrong!");
                          })
                          .finally(() => {
                            setLoader(false);
                          });
                      }}
                    ></i>
                  )}
                  <span className="ml-3 mr-15">{ev.likesCount}</span>
                  <i className="fa fa-file-text-o mr-5" aria-hidden="true"></i>
                  <span className="">{ev.viewsCount}</span>
                </div> */}
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
              getList(pageNumber, type.value);
            }}
          />
        </div>
      </React.Fragment>
    ) : (
      <div className="border ptb-50 plr-20 text-center text-bold mt-20">
        No Record Found!
      </div>
    );
  };

  return (
    <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
      <LoadingOverlay active={loader} spinner={<Spinner />}>
        <div className="site-spacing ptb-50">
          <h4 className="text-bold">News</h4>
          <div className="position-relative height-40">
            <div
              className={
                "dropdown" + (window.innerWidth >= 768 ? " wp-30" : " wp-60")
              }
            >
              <Select
                options={NEWS_LOCATION || []}
                onChange={(op) => {
                  setPage(1);
                  setTotalPage(0);
                  setType(op);
                  getList(1, op.value);
                }}
                value={type}
                placeholder="Choose Location"
              />
            </div>
          </div>

          <ListNews />
        </div>
      </LoadingOverlay>
    </Wrapper>
  );
};

export default News;
