import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Wrapper from "../newpage.style";
const EventBox = (events)=> {
    let eventData = events.events.ev;
    let props = events.events.prs
    //console.log()
    return (
        <Wrapper>
            <div className='event-box'>
                <div className='container'>
                    {
                    eventData && eventData.length > 0 ? (
                        <>
                            {
                                eventData.slice(0, 2).map((ev)=>{
                                    return(
                                        <div className='event-content-box'>
                                            <div className='event-contents'>
                                                <div className='event-date'>{ev.date}</div>
                                                <div className='event-head'><h2>{ev.name}</h2></div>
                                                <div className='event-address'>{ev.descrptn || ""}</div>
                                                <div className="button-box" onClick={(e) =>
                                                        props.history.push(
                                                            `/events/${ev.name.replaceAll("/", " ")}`,
                                                            {
                                                                eventId: ev.eventId,
                                                            }
                                                        )
                                                    }>
                                                    <span>RSVP</span>
                                                </div>
                                            </div>
                                            <div className='event-image'>
                                                {
                                                    ev.image2 ?
                                                    (<img
                                                        src={ev.image2}
                                                        alt={ev.name.substr(0, 10) + "..."}
                                                        className="image-sizes"
                                                    />) : null
                                                }
                                            </div>                                            
                                        </div>
                                    );
                                })
                            }
                        </>
                    ):(
                        <>
                            <div className='text-center'>There are no events at the moment. Please check back later.</div>
                        </>
                    )
                    }

                </div>
            </div>
        </Wrapper>
        
    )
}
export default EventBox