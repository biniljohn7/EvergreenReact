import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
//import { payment as enhancer } from "./enhancer";

const ChooseMember = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                size="lg"
                className="signup"
            >
                <Wrapper>
                    <div
                        className={
                            "ptb-50 m-auto " +
                            (window.innerWidth < 768
                                ? " plr-20 "
                                : window.innerWidth === 786
                                    ? " plr-30 "
                                    : " plr-40 ")
                        }
                    >
                        fghfgh  fgh fghfg h fghfgh gfh fghg fhh fgh dffhdg dfgdfg dfg ddfg
                    </div>
                </Wrapper>
            </Modal>
        </div>
    );
};

//export default enhancer(ChooseMember);
export default ChooseMember;