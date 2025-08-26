import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastsStore } from "react-toasts";
import { Spinner } from "reactstrap";
import { webSrh } from "../../api/commonAPI";
import Wrapper from "./wrapper.style";
import { Link } from "react-router-dom";
import { WEBSITE_URL } from "../../helper/constant";

const Search = (props) => {
    const { key } = useParams();
    const [loading, setLoading] = useState(true);
    const [srhKey, setSrhKey] = useState('');
    const [srhCnt, setSrhCnt] = useState([]);

    useEffect(() => {
        const cntSrh = async (payload) => {
            try {
                const res = await webSrh(payload);
                if (res.success === 1) {
                    setSrhCnt(res.data.suggestions || []);
                } else {
                    ToastsStore.error(res.message);
                }
            } catch (err) {
                console.error(err);
                ToastsStore.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        if (key) {
            cntSrh({ key: key });
            setSrhKey(key);
        }
    }, [key]);

    document.title = "Search - " + window.seoTagLine;

    return loading ? (
        <div className="custom-spinner">
            <Spinner color="danger" />
        </div>
    ) : (
        <Wrapper>
            <div className="srh-section">
                <div className="head-box">
                    <div className="container">
                        <h2>
                            Search
                        </h2>
                    </div>
                </div>
                <div className="srh-wrap container">
                    <div class="srh-hed">
                        Search result for "{key}"
                    </div>
                    <div className="srh-items">
                        {srhCnt.map((cnt, key) => {
                            function click() {
                                props.history.push(
                                    `${'/advocacy/Issues/' + cnt.title.replaceAll('/', ' ')}`,
                                    {
                                        advocacyId: 3,
                                        advocacyType: 'Issues',
                                    },
                                )
                            }
                            return <div class="srh-itm" >
                                <div className="itm-hed" onClick={click}>
                                    <div className="itm-icn">
                                        <span class="material-symbols-outlined icn">
                                            link
                                        </span>
                                    </div>
                                    <div className="itm-link" onClick={click}>
                                        {WEBSITE_URL + cnt.url}
                                    </div>
                                </div>
                                <div className="itm-ttl">
                                    <span onClick={() => props.history.push('/' + cnt.url)}>
                                        {cnt.title}
                                    </span>
                                </div>
                                <div className="itm-cnt">
                                    {cnt.description}
                                </div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </Wrapper >
    );
};

export default Search
