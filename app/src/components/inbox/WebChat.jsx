import React, { useState, useEffect } from "react";
import Wrapper from "./inbox.style";
import { store } from "../../redux/store";
import User_05 from "../../assets/images/user_05x.png";
import { Spinner, Modal, Button, Input } from "reactstrap";
import { ToastsStore } from "react-toasts";
import ChatProfile from "./ChatProfile";
import Camera from "../../assets/images/camera_1x.png";
import Send from "../../assets/images/send_1x.png";
import moment from "moment";
import Compressor from "compressorjs";
import {msgTxtSend, msgImgSend} from "../../api/inboxAPI";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// To delete chat
let deleteChatId;

// To see profile
let memberId;

// Set fixed height of chat room according to device height
// const HEIGHT =
//   window.innerWidth > 1024
//     ? (((window.innerHeight * 95) / 100) * 83) / 100 + 18
//     : (((window.innerHeight * 95) / 100) * 81) / 100 + 95

/*  Set fixed height of chat room accrording to device height
 155 is the result of summation of following height
 1. The portion where receiver's photo and name are dislayed along with other options
 2. The portion where input to send the message is given

 35 is the random yet appropriate number used to set the height of chat room
 */
const HEIGHT = window.innerHeight - 155 - 35;

const WebChat = (props) => {
  const [recentChatArray, setRecentChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  // const [sending, setIsSending] = useState(false)
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  // Delete message array
  const [deleteArray, setArray] = useState([]);

  // Display checkbox if this state is on
  const [isDeleteOn, setDelete] = useState(false);

  // Display Menu to let the user select option
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Select chat from recent chat to view messages
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageArray, setMessageArray] = useState([]);

  // Message to be sent
  const [message, setMessage] = useState("");

  // Manage confirmation modal where user deletes messages
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    // console.log('fetch recent chat')
    getRecentChat();
    return () => {
      //your cleanup code codes here
      setSelectedUser(null);
    };
  }, []);

  useEffect(() => {
    if (messageArray && messageArray.length > 0) {
      let messageBody = document.getElementById("message_list_scroll");

      if (messageBody) {
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight;
      }
    }
  }, [messageArray]);

  useEffect(() => {
    // console.log('in chat', store.getState().auth.chatMemberId)

    if (store.getState().auth.chatMemberId) {
      // Check if document is exist
    }
  }, [store.getState().auth.chatMemberId]);

  useEffect(() => {
    if (selectedUser) {
      // console.log('fetch message')
      setMessageArray([]);
      const senderId = store.getState().auth.memberId;
      const receiverId = selectedUser.memberId;
    }
  }, [selectedUser]);

  const getRecentChat = () => {
    setLoading(true);
    
  };

  const deleteRecentChat = (wasLastMessage = false) => {
    setLoader(true);

    // Update the flag 'delete' to true
    
  };

  const deleteUserMessage = () => {
    if (deleteArray && deleteArray.length > 0) {
      setLoader(true);
      

      setLoader(false);
      setDeleteMessage(!deleteMessage);
      setArray([]);
      setDelete(!isDeleteOn);
    }
  };

  const updateRecentChatLog = (firstId, secondId, lastMessage) => {
    // console.log('updateRecentChat', firstId, secondId, lastMessage)
  };

  const sendMessage = (isImage, imageUrl) => {
    setLoader(true);
    msgSend(body)
      .then((res) => {
        setLoading(false)

      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        ToastsStore.error("Failed to send message")
      })
  };

  const uploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
    }
  };

  return loading ? (
    <div className="text-center mt-20">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper HEIGHT={HEIGHT}>
      <div className="row mlr-0">
        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 pr-10 pl-0">
          {recentChatArray && recentChatArray.length > 0 ? (
            <div className="border plr-10 recent-chat">
              {recentChatArray.map((chat, index) => {
                return (
                  <div
                    className={
                      "d-flex ptb-10 cursor-pointer position-relative " +
                      (index !== 0 ? " border-top" : "")
                    }
                    key={index}
                  >
                    <img
                      src={chat.profileImage || User_05}
                      alt="user"
                      className="photo mr-10"
                      onClick={(e) => {
                        memberId = chat.memberId;
                        setModal(!modal);
                      }}
                    />
                    <div
                      className="wp-75"
                      onClick={(e) => {
                        if (
                          !selectedUser ||
                          chat.memberId !== selectedUser.memberId
                        ) {
                          setMessage("");
                          setMessageArray([]);
                          setArray([]);
                          setDelete(false);
                          setDropdownOpen(false);
                          setSelectedUser(chat);
                        }
                      }}
                    >
                      <div className="text-bold">{chat.fullName}</div>
                      <div>
                        {chat.lastMessage.toString().length > 20
                          ? chat.lastMessage.toString().substr(0, 20) + "..."
                          : chat.lastMessage.toString().substr(0, 20)}
                      </div>
                    </div>
                    <div className="bin">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={(e) => {
                          deleteChatId = chat.memberId;
                          setOpen(!open);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="ptb-50 border plr-20 text-bold text-center">
              No chat found
            </div>
          )}
        </div>

        {selectedUser ? (
          <React.Fragment>
            <div className="plr-0 col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 border position-relative">
              <div className="d-flex border-bottom ptb-7 plr-10 cursor-pointer">
                <img
                  src={selectedUser.profileImage || User_05}
                  className="chat_pic"
                  alt="profile_pic"
                  onClick={(e) => {
                    memberId = selectedUser.memberId;
                    setModal(!modal);
                  }}
                />
                <label
                  className="text-bold mlp-3 mtp-2"
                  onClick={(e) => {
                    memberId = selectedUser.memberId;
                    setModal(!modal);
                  }}
                >
                  {selectedUser.fullName}
                </label>
                <div className="option d-flex align-items-baseline">
                  <i
                    className={
                      "fa fa-times mr-10" +
                      (isDeleteOn ? " visible " : " invisible ")
                    }
                    aria-hidden="true"
                    onClick={(e) => {
                      setDelete(false);
                      setArray([]);
                      setDropdownOpen(false);
                    }}
                  ></i>
                  <i
                    className={
                      "fa fa-trash mr-10" +
                      (isDeleteOn && deleteArray.length > 0
                        ? " visible "
                        : " invisible ")
                    }
                    aria-hidden="true"
                    onClick={(e) => setDeleteMessage(!deleteMessage)}
                  ></i>

                  <div>
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={() => setDropdownOpen((prevState) => !prevState)}
                    >
                      <DropdownToggle className="text-dark bg-white">
                        <i
                          className="fa fa-ellipsis-v"
                          aria-hidden="true"
                          id="open_menu"
                        ></i>
                      </DropdownToggle>
                      <DropdownMenu
                        style={{
                          right: -50,
                        }}
                      >
                        <DropdownItem
                          className="item"
                          onClick={() => {
                            if (!isDeleteOn) {
                              setDelete(!isDeleteOn);
                            }
                          }}
                        >
                          Delete Messages
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              {/* Display message */}
              <div className="chat-room bg-light plr-15 ptb-10">
                <div className="message_list" id="message_list_scroll">
                  {messageArray &&
                    messageArray.map((msg, index) => {
                      return (
                        <div key={msg.chatId} className="wp-100">
                          <div
                            className={
                              msg.senderId === store.getState().auth.memberId
                                ? "mtb-5 d-flex justify-content-end height"
                                : "mtb-5 d-flex justify-content-start height"
                            }
                          >
                            {/* {msg.senderId !==
                              store.getState().auth.memberId && (
                              <input
                                type="checkbox"
                                id={index}
                                name="delete_chat"
                                className={
                                  'mr-7' +
                                  (isDeleteOn ? ' d-block ' : ' d-none ')
                                }
                                checked={deleteArray.includes(msg.chatId)}
                                style={{ height: '24px' }}
                                onChange={(e) => {
                                  console.log('clicked checkbox')
                                  //     console.log(e.target.checked, index)
                                  let arr = deleteArray
                                  if (e.target.checked) {
                                    arr.push(msg.chatId)
                                  } else {
                                    const i = deleteArray.findIndex(
                                      (el) => el === msg.chatId,
                                    )
                                    if (i !== -1) {
                                      arr.splice(i, 1)
                                    }
                                  }

                                  setArray([...arr])
                                }}
                              />
                            )} */}
                            <div
                              className={
                                msg.senderId === store.getState().auth.memberId
                                  ? "messageDetailBox right_side red--text bg-white"
                                  : "messageDetailBox left_side text-white red"
                              }
                              style={{ borderRadius: 16 }}
                            >
                              {msg.message && msg.message.trim() ? (
                                <div className="">{msg.message}</div>
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
                                {/* {moment(msg.timestamp.toDate()).format(
                    'MM-DD-YYYY hh:mm A',
                  )} */}
                                {msg.timestamp &&
                                  moment(msg.timestamp.toDate()).format(
                                    "MM/DD/yyyy hh:mm a"
                                  )}
                              </div>
                            </div>
                            {msg.senderId ===
                              store.getState().auth.memberId && (
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
                                  // console.log('clicked checkbox')
                                  //     console.log(e.target.checked, index)
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
                                  setArray([...arr]);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {/* {sending && <div className="text-center">Sending...</div>} */}
                </div>
              </div>
              <div className="ptb-10 plrp-3 d-flex box border-top align-items-center">
                <Input
                  id="message_input"
                  placeholder="Say something..."
                  className="mlp-2 mrp-1 message_input"
                  value={message}
                  // type="textarea"
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
                  onClick={(e) => {
                    if (message && message.length > 0) {
                      sendMessage(false, null);
                    }
                  }}
                  disabled={loader || !(message && message.length > 0)}
                ></input>
              </div>
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
                        onClick={(e) => {
                          setArray([]);
                          setDelete(!isDeleteOn);
                          setDeleteMessage(!deleteMessage);
                        }}
                      >
                        CANCEL
                      </Button>
                      <Button
                        color="success"
                        className="ml-7"
                        onClick={(e) => deleteUserMessage()}
                        disabled={loader}
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </React.Fragment>
        ) : null}
      </div>

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
                <Button color="danger" onClick={(e) => setOpen(!open)}>
                  CANCEL
                </Button>
                <Button
                  color="success"
                  className="ml-7"
                  onClick={(e) => deleteRecentChat()}
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
          toggle={(e) => {
            setModal(!modal);
            memberId = null;
          }}
        />
      )}
    </Wrapper>
  );
};

export default WebChat;
