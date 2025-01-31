import React, { useEffect, useState } from 'react';
import Wrapper from "../newpage.style";
function EventBox(events) {
    let eventData = events.events;
    console.log(eventData);
    return (
        <Wrapper>
            <div className='event-box'>
                <div className='container'>
                    {
                    eventData && eventData.length > 0 ? (
                        <>
                            {
                                eventData.map((ev)=>{
                                    return(
                                        <div className='event-content-box'>
                                            <div className='event-contents'>
                                                hello
                                            </div>
                                            <div className='event-image'>
                                                {
                                                    ev.image ?
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
                            <div className='text-center'>There are no events at the moment. Please check back later.{eventData.length}</div>
                        </>
                    )
                    }

                </div>
            </div>
        </Wrapper>
        
    )
}
export default EventBox