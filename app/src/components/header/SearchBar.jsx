import React, { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Toast from "../../UI/Toast/Toast";
import Wrapper from "./search.style";

function SearchBar(props) {
    let Spn = Spinner();
    const Tst = Toast();

    const showResult = (e) => {

        const srhKey = document.getElementById('srchKey').value;

        if(srhKey) {
            props.changeURL(`/search/${srhKey}`);  
            props.toggle();          
        }

        e.preventDefault();
        return false;
    }

    useEffect(() => {}, []);

    return (
        <div>
            <Wrapper>
                <div 
                    className={`search-overlay ${props.isOpen ? 'visible' : ''}`}
                    onClick={() => props.toggle()}
                ></div>

                <div className={`search-bar ${props.isOpen ? 'active' : ''}`}>
                    <div
                        className="cursor-pointer text-bold close"
                        onClick={() => props.toggle()}
                    >
                        X
                    </div>
                    <div className="containers">
                        <div className="web-srch">
                            <div className="srch-bar">
                                <form 
                                    action="" 
                                    onSubmit={(e) => {showResult(e)}}
                                >
                                    <input
                                        type="text"
                                        name="key"
                                        className="key-inp"
                                        id="srchKey"
                                    />
                                    <button
                                        type="button"
                                        className="srch-btn"
                                        onClick={(e) => {showResult(e)}}
                                    >
                                        <span className="material-symbols-outlined">
                                        search
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default SearchBar;