import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { takeAction } from '../../api/advocacyApi'
import Button from '../../UI/button/button'
import { ToastsStore } from 'react-toasts'
import Wrapper from './advocacy.style'

const TakeAction = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const uploadSignature = () => {
    setLoading(true)

    const formData = new FormData()
    formData.append('signature', data)
    takeAction(formData, props.advocacy.advocacyId)
      .then((res) => {
        if (res.success === 1) {
          ToastsStore.info(res.message)
          setLoading(false)
          props.onSuccess()
        } else {
          ToastsStore.error(res.message)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        ToastsStore.error('Failed to take action!')
      })
  }

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + 'px' }}
      ></div>
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
                    src={URL.createObjectURL(data)}
                    alt="signature"
                    height="70px"
                    width="100px"
                    className="signature mb-7"
                  />
                </div>
              )}
              <label className="cursor-pointer text-bold position-relative">
                Sign Here
                <input
                  id="advocacyUpload"
                  className="file-upload__input"
                  name="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setData(e.target.files[0])
                    }
                  }}
                />
              </label>
            </div>
            <div className="text-center mt-15">
              <Button
                class="button mt-20"
                name="SEND AN EMAIL"
                clicked={uploadSignature}
                disabled={isLoading || !data}
              />
            </div>
          </section>
        </Wrapper>
      </Modal>
    </div>
  )
}

export default TakeAction
