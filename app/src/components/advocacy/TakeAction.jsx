import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import SignatureCanvas from 'react-signature-canvas'

import { takeAction } from '../../api/advocacyApi'
import Button from '../../UI/button/button'
import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";
import Wrapper from './advocacy.style'

const TakeAction = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [EnSign, setEnSign] = useState(false);
    const [data, setData] = useState(null);

    let Tst = Toast();
    let Spn = Spinner();
    let sigCanvas;

    function toggleSignForm() {
        setEnSign(!EnSign);
    }

    const uploadSignature = () => {
        setLoading(true)
        Spn.Show();

        const formData = new FormData()
        formData.append('signature', data)
        takeAction(formData, props.advocacy.advocacyId)
            .then((res) => {
                setLoading(false)
                Spn.Hide();
                if (res.success === 1) {
                    Tst.Success(res.message)
                    props.onSuccess()
                } else {
                    Tst.Error(res.message)
                }
            })
            .catch((err) => {
                console.error(err)
                setLoading(false)
                Spn.Hide();
                if (err.response && err.response.status === 401) {
                    props.logout()
                    Tst.Error('Session Expire! Please login again.');
                    setTimeout(() => props.history.push('/signin'), 800)
                } else {
                    Tst.Error('Something Went Wrong!');
                }
            })
    }

    return (
        <>
            {Tst.Obj}
            {Spn.Obj}
            <div>
                <div
                    className="bg-light"
                    style={{ height: window.innerHeight + 'px' }}
                >
                </div>
                <Modal
                    isOpen={props.isOpen}
                    toggle={props.toggle}
                    centered
                    size="lg"
                    className="signin"
                    backdrop="static"
                    keyboard={false}
                >
                    <Wrapper>
                        <section className="pa-30">
                            <label
                                className="cursor-pointer text-secondary"
                                onClick={props.toggle}
                            >
                                {'< Back'}
                            </label>
                            <h4 className="text-bold">{props.advocacy.title}</h4>
                            <p className="mt-10 text-secondary text-justify">
                                {props.advocacy.description}
                            </p>
                            <div className="mt-15 text-right">
                                {data && (
                                    <div>
                                        <img
                                            src={data}
                                            alt="signature"
                                            height="70px"
                                            width="100px"
                                            className="signature mb-7"
                                        />
                                    </div>
                                )}
                                <label
                                    className="cursor-pointer text-bold position-relative"
                                    onClick={toggleSignForm}
                                >
                                    Sign Here
                                </label>
                            </div>
                            <div className="text-center mt-15">
                                <Button
                                    className="button mt-20"
                                    name="SEND AN EMAIL"
                                    clicked={uploadSignature}
                                    disabled={isLoading || !data}
                                />
                            </div>
                        </section>
                    </Wrapper>
                </Modal>

                <Modal
                    isOpen={EnSign}
                    toggle={toggleSignForm}
                    centered
                    size="lg"
                    className="signin"
                    backdrop="static"
                    keyboard={false}
                >
                    <Wrapper>
                        <section className="pa-30">
                            <label
                                className="cursor-pointer text-secondary"
                                onClick={toggleSignForm}
                            >
                                {'< Back'}
                            </label>
                            <h4 className="text-bold">
                                Add Your Signature
                            </h4>
                            <span style={{
                                display: 'inline-block',
                                border: '3px solid #555',
                                borderRadius: '5px',
                                marginBottom: '25px'
                            }}>
                                <SignatureCanvas
                                    penColor='black'
                                    canvasProps={{
                                        dotSize: () => (this.minWidth + this.maxWidth) / .5,
                                        minWidth: 2,
                                        className: 'sigCanvas'
                                    }}
                                    ref={(ref) => { sigCanvas = ref }}
                                />
                            </span>

                            <div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <span
                                            className="btn"
                                            onClick={function () {
                                                setData(sigCanvas.toDataURL())
                                                toggleSignForm();
                                            }}
                                        >
                                            Submit
                                        </span>
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <span
                                            className="btn default btn-warning"
                                            onClick={function () {
                                                sigCanvas.clear();
                                            }}
                                        >
                                            Reset
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Wrapper>
                </Modal>
            </div>
        </>
    )
}

export default TakeAction
