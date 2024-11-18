import React, { useState } from "react";
import { Modal } from "reactstrap";

import { Wrapper } from './GiftsLists.style'

import { selfAccept } from "../../../api/duesAPI";



const SomeoneModal = (props) => {
    // const [giftId, setGiftId] = useState(props.data.giftId);
    // const [isSuccess, setSuccess] = useState(false);
    const [isSpinner, setSpinner] = useState(false);
    // const [isNEroor, setNError] = useState(false);
    const[searchData, setSearchData] = useState(null);

    const keywordset = (e)=>{
        setSearchData(e.target.value);
    }

    const searchhandler = (e)=>{
        e.preventDefault();
        setSpinner(true); 
        
        const formdata = {
            //
        }
    }


    return (

        <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            centered
            size="md"
            className="decline-modal"
        >
            <Wrapper>
                <div className="self-alert-modal">
                    <h5>GIFT TO SOMEONE ELSE</h5>
                    <hr />
                    <form id="usersearchform">
                        <div className="serach-feild-container">
                            <label>Enter member name/ Email / Membership ID</label>
                            <input type="text" name="searchmember" id="searchmember" onChange={keywordset} />
                            <button type="button" className="btn-search" onClick={searchhandler}>
                                <span class="material-symbols-outlined">
                                    search
                                </span>
                            </button>
                        </div>
                    </form>
                    {
                        isSpinner ?
                            <div className="spinner-show">
                                <div className="pix-spinner"></div>
                            </div>
                        :
                        null
                     }
                     <br />
                </div>

            </Wrapper>
        </Modal>

    );
};

export default SomeoneModal;