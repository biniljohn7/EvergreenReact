import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Wrapper } from './GiftsLists.style'
import { declineGift } from "../../../api/duesAPI";
//import { payment as enhancer } from "./enhancer";

const GiftDecline = (props) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [additionalReason, setAdditionalReason] = useState('');
    const [giftID,setGiftId] = useState(props.data.id);
    const [isDataOn,setDataOn] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [isSpinner, setSpinner] = useState(false);
    const [isNEroor, setNError] = useState(false);
    
    const reasons = [
        "My membership plan doesn't expire soon.",
        "I prefer other options at this time.",
        "Personal reasons, i dont want to disclose.",
        "I am not interested in continuing the membership.",
        "Other (please specify)"
    ];
    
    const handleReasonChange = (e) => {
        setDataOn(true);
        setSelectedReason(e.target.value);
        if (e.target.value !== "Other") {
            setAdditionalReason(''); 
        }
        
    };
    const handleAdditionalReasonChange = (e) => {
        setAdditionalReason(e.target.value);
        setDataOn(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);

        if(selectedReason === ''){
            setDataOn(false);
            setSpinner(false);
            return;
        }
        if(selectedReason === 'Other' && additionalReason === ''){
            setDataOn(false);
            setSpinner(false);
            return;
        }

        setDataOn(true);
        const formData = {
            giftId:giftID,
            reason: selectedReason,
            additionalReason: selectedReason === "Other" ? additionalReason : ''
        };

        if(isDataOn){
            declineGift({
                formData
            })
            .then((result) => {
                console.log(result)
                if (result.success === 1) {
                    setSuccess(true);
                    setSelectedReason('');
                    setAdditionalReason('');
                    //
                    props.remove(giftID);
                }else{
                    setNError(true);
                }
                setSpinner(false);
            })
            .catch((err) => {
                setNError(true);
                setSpinner(false);
            })
            .finally(() => {
                
                //props.closeDcln();
            });
        }
        return false;
    };
      
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="md"
            >
                
                <Wrapper>
                    <div
                        className={
                            "ptb-20 m-auto decline-modal" +
                            (window.innerWidth < 768
                                ? " plr-10 "
                                : window.innerWidth === 768
                                    ? " plr-15 "
                                    : " plr-20 ")
                        }
                    >
                        
                        {isSuccess ? (
                            <>
                                <div className="p-4 text-center">
                                    <p>You have declined the gift membership received!</p>
                                    <p className="decline-options submit text-center mb-0">
                                        <button type="button" className="btn-main btn-purple btn-long"  onClick={props.closeDcln} >OK</button>
                                    </p>
                                </div>
                                
                            </>
                        ):(
                            <>
                                <h5>Choose why you want to decline the gift membership? </h5>
                                <hr />
                                <form id="declineForm">
                                    {!isDataOn &&(
                                        <div className="alert alert-danger mt-5 p-2"><small>Please specify your reason!</small></div>
                                    )}
                                    {
                                        isNEroor?
                                                <div className="alert alert-danger mt-5 p-2"><small>Error! Please try again.</small></div>
                                        :null
                                    }
                                    {reasons.map((reason, index) => (
                                        <div className="decline-options" key={index}>
                                            <label>
                                                <input 
                                                type="radio" 
                                                name="reason" 
                                                value={reason === "Other (please specify)" ? "Other" : reason}
                                                checked={selectedReason === (reason === "Other (please specify)" ? "Other" : reason)}
                                                onChange={handleReasonChange}
                                                />
                                                {reason}
                                            </label>
                                        </div>
                                    ))}
                                    {selectedReason === "Other" && (
                                        <div  className="decline-options others-field">
                                            <textarea 
                                                rows = "2"
                                                value={additionalReason} 
                                                onChange={handleAdditionalReasonChange} 
                                                placeholder="Your reason"
                                                required
                                            >
                                                
                                            </textarea>
                                        </div>
                                    )}
                                    {
                                     !isSpinner?
                                        <div className="decline-options submit">
                                            <button type="button" className="btn-main btn-purple" onClick={handleFormSubmit}>Decline</button>
                                            <button type="button" className="btn-main btn-plain"  onClick={props.closeDcln} >cancel</button>
                                        </div>
                                        :
                                        <div className="decline-spinner-show">
                                            <div className="pix-spinner"></div>
                                        </div>
                                    }
                                    
                                </form>
                            </>
                        )}
                    </div>
                </Wrapper>
            </Modal>
        </div>
        
    );
};

//export default enhancer(GiftDecline);
export default GiftDecline;