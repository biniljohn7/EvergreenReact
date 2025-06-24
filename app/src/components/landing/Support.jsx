import React from 'react'
import ContactUs from '../footer/ContactUs'
import { GOOGLE_MAP_KEY } from '../../helper/constant'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import SupportWp from './Support.style'

function Support(props) {

    return (
        <section className="border-bottom home-footer">
            <SupportWp>
                <div className="container">
                    <div className="fl-box">
                        <div className="form-box">
                            <ContactUs isFooter={1} />
                        </div>
                        <div className="map-box">
                            <div className="sub-text mt-30 loc-address">
                                Farmington Hills, Michigan 48331
                            </div>
                            <Map
                                google={props.google}
                                zoom={8}
                                className="locmap"
                                initialCenter={{
                                    lat: 47.444,
                                    lng: -122.176
                                }}
                            >
                                <Marker
                                    position={{
                                        lat: 47.444,
                                        lng: -122.176
                                    }}
                                />
                            </Map>
                        </div>
                    </div>
                </div>
            </SupportWp>
        </section>
    )
}

// export default LandingPage
export default GoogleApiWrapper({
    apiKey: GOOGLE_MAP_KEY,
})(Support)