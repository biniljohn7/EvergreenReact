// libraries
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from "../newpage.style";
import bgimg from "../../../assets/images/new-page-resources.png";
import everWhite from "../../../assets/images/evergreen-white.png";

const backgroundStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

function ExploreResources() {
    return (
        <Wrapper>
            <div className='explore-resources' style={backgroundStyle}>
                <div><img src={everWhite} alt="" /></div>
                <div>Make the <em>Most</em> of <br />Your <strong>Membership</strong>!</div>
                <div className="explore-resources-btn">
                    <Link to="/resources">Explore Resources</Link>
                </div>
            </div>
        </Wrapper>
        
    )
}
export default ExploreResources

/* const [resources, setResources] = useState([])

    useEffect(() => {
        fetch("https://pix.eadbox.com/api/v1/resources")
            .then(res => res.json())
            .then(data => {
                setResources(data)
            })
    }, []) */