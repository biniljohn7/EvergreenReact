import React, { useState, useEffect } from "react";
import Wrapper from "./event.style.js";
import { viewEvent } from "../../api/eventAPI";
import { ToastsStore } from "react-toasts";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "../../UI/button/button";
import { Spinner } from "reactstrap";
// import AddToCalendar from 'react-add-to-calendar'
// import AddToCalendar from '@culturehq/add-to-calendar'
// import '@culturehq/add-to-calendar/dist/styles.css'

const TEXT_LENGTH = window.innerWidth >= 768 ? 20 : 10;

const Event = (props) => {
  const [event, setEvent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!props.location.state || !props.location.state.eventId) {
      props.history.replace({
        pathname: "/events",
      });
    } else {
      viewEvent(props.location.state.eventId)
        .then((res) => {
          if (res.success === 1) {
            setEvent(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          ToastsStore.error("Something went wrong!");
        });
    }
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <React.Fragment>
          <div className="red pt-20 bread-nav">
            <Breadcrumb className="container">
              <BreadcrumbItem>
                <Link to="/events" className="text-white">
                  Events
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-white">
                {event.title.substr(0, TEXT_LENGTH) + "..."}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="container ptb-50">
            {!event ? (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
                No record found!
              </div>
            ) : (
              <React.Fragment>
                <section>
                  <img
                    src={event.image}
                    className="full-image"
                    alt={event.title.substr(0, 10) + "..."}
                  />
                </section>
                <section className="row mt-30">
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                    <h5 className="text-bold">{event.title}</h5>
                    <div className="d-block d-sm-block d-md-none d-lg-none d-xl-none fs-14">
                      {event.date && <div className="mt-15">{event.date}</div>}
                      {event.address && (
                        <div className="mt-3 text-secondary">
                          {event.address}
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="mt-25 text-secondary text-justify break-description">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={
                      "col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3" +
                      (window.innerWidth < 768 ? " mt-20" : "")
                    }
                    onClick={() => {
                      setOpen(!isOpen);
                    }}
                  >
                    <Button name="ADD TO CALENDAR" class="wp-100" />
                    {/* {isOpen && (
                      <AddToCalendar
                        event={{
                          title: event.title,
                          description: event.description || event.title,
                          location: event.address || null,
                          startTime: event.date || null,
                        }}
                        buttonTemplate={{
                          textOnly: 'none',
                        }}
                        buttonClassClosed="text-white"
                        buttonLabel="ADD TO CALENDAR"
                        buttonWrapperClass="wp-100 ptb-10 green cursor-pointer border text-center border-radius-41"
                        listItems={[
                          { outlook: 'Outlook' },
                          { outlookcom: 'Outlook.com' },
                          { apple: 'Apple Calendar' },
                          { yahoo: 'Yahoo' },
                          { google: 'Google' },
                        ]}
                        optionsOpen={true}
                      />
                    )}
                    {!isOpen && (
                      <AddToCalendar
                        event={{
                          title: event.title,
                          description: event.description || event.title,
                          location: event.address || null,
                          startTime: event.date || null,
                        }}
                        buttonTemplate={{
                          textOnly: 'none',
                        }}
                        buttonClassClosed="text-white"
                        buttonLabel="ADD TO CALENDAR"
                        buttonWrapperClass="wp-100 ptb-10 green cursor-pointer border text-center border-radius-41"
                        listItems={[
                          { outlook: 'Outlook' },
                          { outlookcom: 'Outlook.com' },
                          { apple: 'Apple Calendar' },
                          { yahoo: 'Yahoo' },
                          { google: 'Google' },
                        ]}
                        optionsOpen={false}
                      />
                    )} */}

                    {/* <AddToCalendar
                      event={{
                        name: 'Happy Hour',
                        details: "Let's go after work",
                        location: 'Boston, MA',
                        startsAt: '2018-12-06T17:00:00-05:00',
                        endsAt: '2018-12-06T18:00:00-05:00',
                      }}
                      // open={true}
                    /> */}

                    <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
                      {event.date && <div className="mt-15">{event.date}</div>}
                      {event.address && (
                        <div className="mt-3 text-secondary">
                          {event.address}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Event;
