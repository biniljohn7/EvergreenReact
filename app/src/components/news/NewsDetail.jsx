import React, { useState, useEffect } from "react";
import Wrapper from "./news.style.js";
import { ViewNews, reactToNews } from "../../api/newsApi";
// import { reactToNews } from "../../api/newsApi";
import { ToastsStore } from "react-toasts";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
// import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
// import ReactTimeAgo from "react-time-ago";
import LoadingOverlay from "react-loading-overlay";

const TEXT_LENGTH = window.innerWidth >= 768 ? 20 : 10;
// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(en);

const NewsDetails = (props) => {
  const [news, setNews] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [likeState, setLiked] = useState({
    liked: false,
    likeCount: 0,
  });

  useEffect(() => {
    props &&
      props.location.state &&
      props.location.state.news &&
      setNews(props.location.state.news);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!props.match || !props.match.params || !props.match.params.newsfeedId) {
      props.history.replace({
        pathname: "/news",
      });

    } else {
      ViewNews(Number.parseInt(props.match.params.newsfeedId))
        .then((res) => {
          if (res.success === 1) {
            setNews(res.data);
            //           setLiked({
            //             liked: res.data.isLikedByMe,
            //             likeCount: res.data.likesCount,
            //           });
            //           setLoading(false);
          } else {
            //           setLoading(false);
            //           ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          //         console.error(err);
          //         setLoading(false);
          //         ToastsStore.error("Something went wrong!");
        });
    }
  }, []);

  const likeOrDislike = () => {
    setLoader(true);
    reactToNews(props.match.params.newsfeedId)
      .then((res) => {
        if (res.success === 1) {
          ToastsStore.info(res.message);
          setLiked({
            liked: !likeState.liked,
            likeCount: likeState.liked
              ? likeState.likeCount - 1
              : likeState.likeCount + 1,
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
  };

  document.title = 'News | News Details - ' + window.seoTagLine;

  return (
    <Wrapper>
      {isLoading ? (
        <div className="custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <>
          {/* <LoadingOverlay active={loader} spinner={<Spinner />}> */}
          <div className="bread-nav pt-20">
            <Breadcrumb className="site-spacing">
              <BreadcrumbItem>
                <Link to="/news" className="text-white">
                  News
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-white">
                {(news?.title || '').substr(0, TEXT_LENGTH) + "..."}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="site-spacing ptb-50">
            {!news ? (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
                No record found!
              </div>
            ) : (
              <React.Fragment>
                <section>
                  {
                    news.mediaType === "image" ?
                      <img
                        src={news.media}
                        className="full-image"
                        alt={news.title.substr(0, 10) + "..."}
                      /> :
                      null
                  }
                  {
                    news.mediaType === "video" ?
                      <video className="full-image" controls>
                        <source src={news.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video> :
                      null
                  }
                </section>

                <section className="mt-20">
                  <h5 className="text-bold">
                    {news.title}
                  </h5>
                  <div className="mt-3 mb-10 text-danger position-relative">
                    <i className="fa fa-globe mr-3" aria-hidden="true"></i>
                    {news.newsSource}
                    <div className="date">
                      <i className="fa fa-clock-o mr-5" aria-hidden="true"></i>
                      {/* <ReactTimeAgo
                        date={new Date(news.createdAt)}
                        locale="en-US"
                      /> */}
                    </div>
                  </div>
                  {/* <div className="text-danger">
                    {likeState.liked ? (
                      <i
                        className="fa fa-heart text-danger cursor-pointer"
                        aria-hidden="true"
                        onClick={(e) => {
                          if (!loader) {
                            likeOrDislike();
                          }
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-heart-o cursor-pointer"
                        aria-hidden="true"
                        onClick={(e) => {
                          if (!loader) {
                            likeOrDislike();
                          }
                        }}
                      ></i>
                    )}
                    <span className="ml-3 mr-15">{likeState.likeCount}</span>
                    <i
                      className="fa fa-file-text-o mr-5"
                      aria-hidden="true"
                    ></i>
                    <span className="">{news.viewsCount}</span>
                  </div> */}
                  <p className="text-justify mt-10 break-description">
                    {news.description}
                  </p>
                </section>
              </React.Fragment>
            )}
          </div>
          {/* </LoadingOverlay> */}
        </>
      )}
    </Wrapper>
  );
};

export default NewsDetails;
