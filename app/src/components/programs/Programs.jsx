import React, { useState, useEffect } from 'react'

import Wrapper from './programs.style.js';
import { PROGRAMS_CATEGORIES } from '../../helper/constant';
import { CATEGORIES_LINK } from '../../helper/constant';

const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4
const COL_WIDTH =
  window.innerWidth < 768 ? '50%' : window.innerWidth <= 1024 ? '33%' : '25%'
const IMAGE_SIZE =
  window.innerWidth < 768
    ? '100px'
    : window.innerWidth <= 1440
      ? '150px'
      : '200px'

const Programs = (props) => {
    const [type, setType] = useState(PROGRAMS_CATEGORIES[0]);
    
    useEffect(() => {
        setType(PROGRAMS_CATEGORIES[0])
    }, []);

    document.title = 'Programs - ' + window.seoTagLine;

    const CatLinks = ({ type }) => {
        return CATEGORIES_LINK
            .filter(link => link.categories.includes(type.value))
            .map((link, index) => (
                <a href={link.link} className="link-card" key={index} target="_blank" rel="noopener noreferrer">
                    <span className="card-lf">{link.label}</span>
                    <span className="material-symbols-outlined card-rg">link</span>
                </a>
            ));
    };

    return (
        <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
            <div className="prgm-section inner-prgm">
                <div className="head-box">
                    <div className="container">
                        <h2>programs</h2>
                        <div className="head-tab">
                            <ul>
                                {(PROGRAMS_CATEGORIES || []).map (
                                    function(e) {
                                        return <li>
                                            <span 
                                                className={"nav-link" + (type.value === e.value ? ' active' : '')} 
                                                onClick={function() {setType(e)}}
                                            >
                                                {e.label}
                                            </span>
                                        </li>
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cat-link-wrap">
                    <CatLinks type={type} />
                </div>
                <div className="cat-btm">
                    <p>
                        For more information, please reach out to{" "}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=programs@ncnw.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mail-link"
                        >
                            programs@ncnw.org
                        </a>.
                    </p>
                </div>
            </div>
        </Wrapper>
    );
}

export default Programs