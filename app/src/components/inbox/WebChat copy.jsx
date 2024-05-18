import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Modal, Button, Input } from 'reactstrap';
import Camera from '../../assets/images/camera_1x.png';
import Send from '../../assets/images/send_1x.png';
import ChatProfile from './ChatProfile';

const WebChat = () => {
  const [message, setMessage] = useState('');
  const [deleteArray, setDeleteArray] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const store = useSelector(state => state.store);
  const isDeleteOn = useSelector(state => state.isDeleteOn);
  const loader = useSelector(state => state.loader);
  const messageArray = useSelector(state => state.messageArray);
  const dispatch = useDispatch();

  const sendMessage = (flag, value) => {
    // Your sendMessage function implementation
  };

  const uploadImage = (e) => {
    // Your uploadImage function implementation
  };

  const deleteUserMessage = () => {
    // Your deleteUserMessage function implementation
  };

  const deleteRecentChat = () => {
    // Your deleteRecentChat function implementation
  };

  return (
    <React.Fragment>
      {messageArray &&
        messageArray.map((msg) => (
          <div key={msg.chatId} className="wp-100">
            <div
              className={
                msg.senderId === store.getState().auth.memberId
                  ? "mtb-5 d-flex justify-content-end height"
                  : "mtb-5 d-flex justify-content-start height"
              }
            >
              <div
                className={
                  msg.senderId === store.getState().auth.memberId
                    ? "messageDetailBox right_side red--text bg-white"
                    : "messageDetailBox left_side text-white red"
                }
                style={{ borderRadius: 16 }}
              >
                {msg.message && msg.message.trim() ? (
                  <div>{msg.message}</div>
                ) : (
                  <img
                    src={msg.chatImage}
                    height="75px"
                    width="100px"
                    className="object-fit-contain"
                    alt="sent_image"
                  />
                )}
                <div className="text-right fs-12 text-dark">
                  {msg.timestamp &&
                    moment(msg.timestamp.toDate()).format(
                      "MM/DD/yyyy hh:mm a"
                    )}
                </div>
              </div>
              {msg.senderId === store.getState().auth.memberId && (
                <input
                  type="checkbox"
                  id={msg.chatId}
                  name="delete_chat"
                  className={
                    "ml-7" +
                    (isDeleteOn ? " d-block " : " d-none ")
                  }
                  checked={deleteArray.includes(msg.chatId)}
                  style={{ height: "24px" }}
                  onChange={(e) => {
                    let arr = deleteArray;
                    if (e.target.checked) {
                      arr.push(msg.chatId);
                    } else {
                      const i = deleteArray.findIndex(
                        (el) => el === msg.chatId
                      );
                      if (i !== -1) {
                        arr.splice(i, 1);
                      }
                    }
                    setDeleteArray([...arr]);
                  }}
                />
              )}
            </div>
          </div>
        ))}

      <div className="ptb-10 plrp-3 d-flex box border-top align-items-center">
        <Input
          id="message_input"
          placeholder="Say something..."
          className="mlp-2 mrp-1 message_input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && message && message.length > 0) {
              sendMessage(false, null);
            }
          }}
        />
        <div className="image-upload mrp-3">
          <label htmlFor="file-input">
            <img
              alt="send_image"
              height="20px"
              width="20px"
              src={Camera}
              className="cursor-pointer"
            />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={uploadImage}
          />
        </div>
        <input
          type="image"
          src={Send}
          alt="send"
          width="20px"
          height="20px"
          id="send_message"
          onClick={() => {
            if (message && message.length > 0) {
              sendMessage(false, null);
            }
          }}
          disabled={loader || !(message && message.length > 0)}
        />
      </div>

      {deleteMessage && (
        <div>
          <div
            className="bg-light"
            style={{ height: window.innerHeight + "px" }}
          ></div>
          <Modal
            isOpen={deleteMessage}
            toggle={() => setDeleteMessage(!deleteMessage)}
            centered
            size="lg"
            className="signin"
          >
            <div className="ptb-50 plr-20 text-center text-bold">
              Are you sure want to delete?
              <div className="d-flex justify-content-center mt-15">
                <Button
                  color="danger"
                  onClick={() => {
                    setDeleteArray([]);
                    // setDelete(!isDeleteOn);
                    setDeleteMessage(!deleteMessage);
                  }}
                >
                  CANCEL
                </Button>
                <Button
                  color="success"
                  className="ml-7"
                  onClick={deleteUserMessage}
                  disabled={loader}
                >
                  DELETE
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {open && (
        <div>
          <div
            className="bg-light"
            style={{ height: window.innerHeight + "px" }}
          ></div>
          <Modal
            isOpen={open}
            toggle={() => setOpen(!open)}
            centered
            size="lg"
            className="signin"
          >
            <div className="ptb-50 plr-20 text-center text-bold">
              Are you sure want to delete chat?
              <div className="d-flex justify-content-center mt-15">
                <Button color="danger" onClick={() => setOpen(!open)}>
                  CANCEL
                </Button>
                <Button
                  color="success"
                  className="ml-7"
                  onClick={deleteRecentChat}
                  disabled={loader}
                >
                  DELETE
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {modal && memberId && (
        <ChatProfile
          memberId={memberId}
          isOpen={modal}
          toggle={() => {
            setModal(!modal);
            setMemberId(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default WebChat;