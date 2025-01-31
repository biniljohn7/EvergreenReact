import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Wrapper from "../newpage.style";
const NewsBox = (news)=> {
    let newsData = news.news.ev;
    let props = news.news.prs
    //console.log()
    return (
        <Wrapper>
            <div className="news-box">
                <div className='container'>
                    {
                    newsData && newsData.length > 0 ? (
                        <>
                            {
                                newsData.slice(0, 2).map((ev)=>{
                                    return(
                                        <div className='news-content'>
                                            <div className="image-box">
                                                {ev.imageUrl ?
                                                    (<img
                                                        src={ev.imageUrl}
                                                        alt={ev.title.substr(0, 10) + "..."}
                                                        className="image-sizes"
                                                    />) : null}
                                            </div>
                                            <h2>{ev.title.substr(0, 60) + ".."}</h2>
                                            <p>{ev.description.substr(0, 70) + ".."}</p>
                                            <div className="button-box" onClick={(e) =>
                                                            props.history.push(`/news/${ev.slug}`)
                                                        }>
                                                    <span>READ MORE</span>
                                                </div>
                                        </div>
                                    );
                                })
                            }
                        </>
                    ):(
                        <>
                            <div className='text-center'>There are no relevant news at the moment. Please check back later.</div>
                        </>
                    )
                    }

                </div>
            </div>
        </Wrapper>
        
    )
}
export default NewsBox