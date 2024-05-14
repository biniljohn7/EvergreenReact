import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import html2canvas from "html2canvas";

import Wrapper from "./wrapper.style";
import { store } from "../../redux/store";
import { RECOMMENDATION_LETTER } from "../../helper/constant";
import { getResourceInfo } from "../../api/resourceApi";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";

import Download from "../../assets/images/download.png";

const PADDING =
  window.innerWidth >= 2560
    ? "55px"
    : window.innerWidth >= 1440
      ? "15px"
      : window.innerWidth === 1024
        ? "15px"
        : window.innerWidth === 768
          ? "20px"
          : "15px";
const TOP =
  window.innerWidth >= 2560
    ? "35%"
    : window.innerWidth >= 1440
      ? "45%"
      : window.innerWidth === 1024
        ? "45%"
        : window.innerWidth === 768
          ? "30%"
          : "30%";
const MEMBER =
  window.innerWidth >= 2560
    ? "25%"
    : window.innerWidth >= 1440
      ? "20%"
      : window.innerWidth === 1024
        ? "20%"
        : window.innerWidth === 768
          ? "20%"
          : "25%";

const COL =
  window.innerWidth === 1024
    ? "2fr 1fr 1fr"
    : window.innerWidth > 1024
      ? "40% 20% 20%"
      : window.innerWidth === 768
        ? "1fr 1fr"
        : "1fr 1fr";

const Resource = (props) => {
  const [resourceInfo, setResourceInfo] = useState(null);

  let Spn = Spinner();
  let Tst = Toast();

  const fetchData = useCallback(function () {
    Spn.Show();
    Spn.Show();
    getResourceInfo()
      .then((res) => {
        if (res.success === 1) {
          setResourceInfo(res.data);
        }
      })
      .catch((error) => {
        Tst.Error("Something went wrong!");
      })
      .finally(() => Spn.Hide());
  }, [Spn, Tst]);

  useEffect(() => {
    fetchData();
  }, []);

  // const [isActive, setActive] = useState(false)

  // const downloadLetter = () => {
  //   setActive(true)
  //   getRecommendationLetter()
  //     .then((response) => {
  //       // 1. Convert the data into 'blob'
  //       // return response.json().blob()
  //       return response
  //     })

  //     .then((res) => {
  //       // 2. Create blob link to download
  //       // const url = window.URL.createObjectURL(new Blob([blob]))
  //       // const link = document.createElement('a')
  //       // link.href = url
  //       // link.setAttribute('download', `sample.pdf`)
  //       // // 3. Append to html page
  //       // document.body.appendChild(link)
  //       // // 4. Force download
  //       // link.click()
  //       // // 5. Clean up and remove the link
  //       // link.parentNode.removeChild(link)

  //       let pdfContent = 'data:application/pdf;charset=utf-8,' + res
  //       let link
  //       const encodedUri = encodeURI(pdfContent)
  //       link = document.createElement('a')
  //       // link.setAttribute('href', encodedUri)
  //       link.setAttribute('href', pdfContent)
  //       link.setAttribute('download', 'Recommendation_Letter.pdf')
  //       document.body.appendChild(link)
  //       link.click()
  //       link.parentNode.removeChild(link)

  //       // let file = new Blob([res], { type: 'application/pdf' })
  //       // let fileURL = URL.createObjectURL(file)
  //       // window.open(fileURL)
  //       // let a = document.createElement('a')
  //       // a.href = fileURL
  //       // a.target = '_blank'
  //       // a.download = 'Recommendation_Letter.pdf'
  //       // document.body.appendChild(a)
  //       // a.click()
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //       // ToastsStore.error('Something went wrong!')
  //     })
  //     .finally(() => {
  //       setActive(false)
  //     })
  // }

  const getMembershipCard = (isMobile) => {
    let container;

    if (isMobile) {
      container = document.getElementById("membership_card1");
    } else {
      container = document.getElementById("membership_card");
    }

    html2canvas(container).then(function (canvas) {
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "Membership_card.png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  return (
    <>
      {Spn.Obj}
      {Tst.Obj}
      <Wrapper padding={PADDING} top={TOP} member={MEMBER} col={COL}>
        <div className="benefits-section inner-benefits">
          <div className="head-box">
            <div className="container">
              <h2>Resource Details:</h2>
            </div>
          </div>

          {resourceInfo ? (
            window.innerWidth <= 768 ? (
              <div
                className={
                  "row mlr-0" + (window.innerWidth === 768 ? " wp-60" : "")
                }
              >
                <div className={"col-12 plr-0"}>
                  <div
                    className="fs-16 card ash radius padding position-relative"
                    id="membership_card1"
                  >
                    <div className="text-bold bg-light rounded-pill plr-20 ptb-4 pill">
                      {resourceInfo.status}
                    </div>

                    <div className="mt-25">
                      <label className="text-white">Membership Number:</label>
                      <div className="fs-18 text-bold">
                        {resourceInfo.membershipNumber
                          ? resourceInfo.membershipNumber
                          : "-"}
                      </div>
                    </div>
                    <div className="row mt-30">
                      <div className="col-6">
                        <label className="text-white">Name:</label>
                        <div>
                          {" "}
                          {resourceInfo.fullName ? resourceInfo.fullName : "-"}
                        </div>
                      </div>
                      <span className="col-6 text-right">
                        <label className="text-white">Valid Thru:</label>
                        <div>
                          {
                            resourceInfo.validThru ?
                              resourceInfo.validThru :
                              "-"
                          }
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "ash radius position-relative text-bold ptb-50 mt-20 text-center" +
                    (window.innerWidth === 768 ? " col-5" : " col-12")
                  }
                >
                  <img
                    src={Download}
                    alt="download"
                    className="download cursor-pointer"
                    onClick={() => getMembershipCard(true)}
                  />
                  Membership Card
                </div>
                {window.innerWidth === 768 && <div className="col-2"></div>}
                <div
                  className={
                    "ash radius position-relative text-bold ptb-50 mt-20 text-center" +
                    (window.innerWidth === 768 ? " col-5" : " col-12")
                  }
                >
                  <a
                    href={RECOMMENDATION_LETTER + store.getState().auth.memberId}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img
                      src={Download}
                      alt="download"
                      className="download cursor-pointer"
                    />
                  </a>
                  Recommendation Letter
                </div>
              </div>
            ) : (
              <div className="benefit-box">
                <div className="container">
                  <div
                    className="benefit-item"
                    id="membership_card"
                  >
                    <div className="per">
                      Membership Number:<br />
                      {resourceInfo.membershipNumber
                        ? resourceInfo.membershipNumber
                        : "-"}
                    </div>
                    <div className="title"><strong>Name: </strong>{resourceInfo.fullName ? resourceInfo.fullName : "-"}</div>
                    <div className="title mb-12">
                      <strong>Valid Thru: </strong>
                      {
                        resourceInfo.validThru ?
                          new Date(resourceInfo.validThru).toDateString() :
                          "-"
                      }
                    </div>
                    <div className="button-box white">
                      <span>{resourceInfo.status}</span>
                    </div>

                  </div>
                  <div className="benefit-item">
                    <div className="per">Membership Card <br /> &nbsp;</div>
                    <div className="button-box white">
                      <span onClick={() => getMembershipCard(false)}>Download</span>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="per">Recommendation Letter <br /> &nbsp;</div>
                    <div className="button-box white">
                      <a href={RECOMMENDATION_LETTER + store.getState().auth.memberId} target="_blank" rel="noreferrer noopener" >
                        Download
                      </a>
                    </div>
                  </div>


                </div>
              </div>
            )
          ) : (
            <div>No Data</div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Resource;
