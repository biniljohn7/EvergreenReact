import React, { useState, useEffect } from "react";
import Wrapper from "./inbox.style";
import { store } from "../../redux/store";
import User_05 from "../../assets/images/user_05x.png";
import { Spinner, Modal, Button, Input } from "reactstrap";
import { ToastsStore } from "react-toasts";
import ChatProfile from "./ChatProfile";
import Camera from "../../assets/images/camera_1x.png";
import Send from "../../assets/images/send_1x.png";
import {
  txtSendApi,
  msgLoadApi,
  imgSendApi,
  recentChatsApi,
  chatDeleteApi,
  msgDeleteApi,
} from "../../api/inboxAPI";
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
//   window.innerWidth < 768
//     ? (((window.innerHeight * 95) / 100) * 75) / 100 + 50
//     : (((window.innerHeight * 95) / 100) * 75) / 100 + 120

const HEIGHT = (window.innerHeight * 95) / 100 - 125;

const MobileChat = (props) => {
  const [recentChatArray, setRecentChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [isChatOn, setChatOn] = useState(false);

  // Select chat from recent chat to view messages
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [message, setMessage] = useState("");

  // Delete message array
  const [deleteArray, setArray] = useState([]);

  // Display checkbox if this state is on
  const [isDeleteOn, setDelete] = useState(false);

  // Display Menu to let the user select option
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Manage confirmation modal where user deletes messages
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    getRecentChat();
    return () => {
      //your cleanup code here
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
    if (store.getState().auth.chatMemberId) {
      setChatOn(true);
      setSelectedUser({
        memberId: store.getState().auth.chatMemberId,
        fullName: store.getState().auth.chatFullName,
        profileImage: store.getState().auth.chatProfileImage,
      });
    }
  }, [store.getState().auth.chatMemberId]);

  // useEffect(() => {
  // }, [recentChatArray])

  useEffect(() => {
    if (selectedUser) {
      setMessageArray([]);
      setLoading(true);
      msgLoadApi({
        id: selectedUser.memberId,
        pgn: 0,
      })
        .then((res) => {
          if (res.status === "ok") {
            setLoading(false);
            setMessageArray(res.data.messages);
          } else {
            this.error({ message: res.message });
          }
        })
        .catch((err) => {
          showErr(err);
        });
    }
  }, [selectedUser]);

  const showErr = (err) => {
    console.error(err);
    if (err.response) {
      if (err.response.status === 401) {
        props.logout();
        ToastsStore.error("Session Expire! Please login again.");
        setTimeout(() => props.history.replace("/signin"), 800);
      } else {
        setLoading(false);
        ToastsStore.error("Something went wrong!");
      }
    } else if (err.request) {
      setLoading(false);
      ToastsStore.error("Unable to connect to server!");
    } else {
      setLoading(false);
      ToastsStore.error("Something went wrong!");
    }
  };

  const getRecentChat = (body) => {
    setLoading(true);
    recentChatsApi(body)
      .then((res) => {
        setRecentChat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const deleteRecentChat = (wasLastMessage = false) => {
    setLoader(true);
    chatDeleteApi(deleteChatId)
      .then((res) => {
        if (res.status === "ok") {
          deleteChatId = null;
          setLoader(false);
          setRecentChat(
            recentChatArray.filter((chat) => chat.memberId !== deleteChatId)
          );
          if (selectedUser.memberId === deleteChatId) {
            setSelectedUser(null);
          }
          if (!wasLastMessage) {
            ToastsStore.info("Chat deleted successfully");
            setOpen(!open);
          }
        } else {
          this.error({ message: res.message });
        }
      })
      .catch((err) => {
        showErr(err);
        if (!wasLastMessage) {
          ToastsStore.error("Failed to delete chat");
          setLoader(false);
          setOpen(!open);
        }
      });
  };

  const deleteUserMessage = () => {
    if (deleteArray && deleteArray.length > 0) {
      setLoader(true);
      msgDeleteApi({
        partner: selectedUser.memberId,
        id: deleteArray,
      })
        .then((res) => {
          if (res.status === "ok") {
            setMessageArray(
              messageArray.filter(
                (message) => !deleteArray.includes(message.id)
              )
            );
          } else {
            this.error({ message: res.message });
          }
        })
        .catch((err) => {
          showErr(err);
        });

      setLoader(false);
      setDeleteMessage(!deleteMessage);
      setArray([]);
      setDelete(!isDeleteOn);
    }
  };

  const sendMessage = () => {
    var msgArr;
    setLoader(true);
    txtSendApi({
      message: message,
      recipient: selectedUser.memberId,
    })
      .then((res) => {
        if (res.status === "ok") {
          msgArr = messageArray;
          msgArr.push(res.data);
          setMessageArray(msgArr);
          setMessage("");
          setLoader(false);
        } else {
          this.error({ message: res.message });
        }
      })
      .catch((err) => {
        showErr(err);
      });
  };

  const uploadImage = (e) => {
    var img, msgArr;
    if (e.target.files && e.target.files[0]) {
      img = e.target.files[0];
      if (/\.(jpe*g|png|gif)$/.test(img.name)) {
        setLoader(true);
        const formData = new FormData();
        formData.append("recipient", selectedUser.memberId);
        formData.append("image", img);
        imgSendApi(formData)
          .then((res) => {
            if (res.status === "ok") {
              msgArr = messageArray;
              msgArr.push(res.data);
              setMessageArray(msgArr);
              setMessage("");
              setLoader(false);
            } else {
              this.error({ message: res.message });
            }
          })
          .catch((err) => {
            showErr(err);
          });
      }
    }
  };

  return loading ? (
    <div className="text-center mt-20">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper HEIGHT={HEIGHT}>
      <div className="row mlr-0">
        {isChatOn ? (
          selectedUser ? (
            <React.Fragment>
              <div
                className="text-danger cursor-pointer hover-underline"
                onClick={(e) => setChatOn(false)}
              >
                Back
              </div>
              <div className="recent-chat plr-0 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 border position-relative">
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
                  {selectedUser.type == "group" ? (
                    ""
                  ) : (
                    <div className="option d-flex align-items-baseline">
                      <i
                        className={
                          "material-symbols-outlined mr-10" +
                          (isDeleteOn ? " visible " : " invisible ")
                        }
                        aria-hidden="true"
                        onClick={(e) => {
                          setDelete(false);
                          setArray([]);
                          setDropdownOpen(false);
                        }}
                      >
                        close_small
                      </i>
                      <i
                        className={
                          "material-symbols-outlined mr-10" +
                          (isDeleteOn && deleteArray.length > 0
                            ? " visible "
                            : " invisible ")
                        }
                        aria-hidden="true"
                        onClick={(e) => setDeleteMessage(!deleteMessage)}
                      >
                        delete
                      </i>

                      <div>
                        <Dropdown
                          isOpen={dropdownOpen}
                          toggle={() =>
                            setDropdownOpen((prevState) => !prevState)
                          }
                        >
                          <DropdownToggle className="text-dark bg-white">
                            <i
                              className="material-symbols-outlined"
                              aria-hidden="true"
                              id="open_menu"
                            >
                              more_vert
                            </i>
                          </DropdownToggle>
                          <DropdownMenu
                          // style={{
                          //   right: -50,
                          // }}
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
                  )}
                </div>

                {/* Display message */}
                <div className="chat-room bg-light plr-15 ptb-10">
                  <div className="message_list" id="message_list_scroll">
                    {messageArray &&
                      messageArray.map((msg, index) => {
                        return (
                          <div key={index} className="wp-100">
                            <div
                              className={
                                msg.isSent
                                  ? "mtb-5 d-flex justify-content-end height"
                                  : "mtb-5 d-flex justify-content-start height"
                              }
                            >
                              <div
                                className={
                                  msg.isSent
                                    ? "messageDetailBox right_side red--text bg-white"
                                    : "messageDetailBox left_side text-white red"
                                }
                                style={{ borderRadius: 16 }}
                              >
                                {msg.text && msg.text.trim() ? (
                                  <div className="">{msg.text}</div>
                                ) : (
                                  <img
                                    src={msg.msgImg}
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
                                  {msg.time && msg.shortTime}
                                </div>
                              </div>
                              {msg.isSent && (
                                <input
                                  type="checkbox"
                                  id={msg.id}
                                  name="delete_chat"
                                  className={
                                    "ml-7" +
                                    (isDeleteOn ? " d-block " : " d-none ")
                                  }
                                  checked={deleteArray.includes(msg.id)}
                                  style={{ height: "24px" }}
                                  onChange={(e) => {
                                    // console.log('clicked checkbox')
                                    //     console.log(e.target.checked, index)
                                    let arr = deleteArray;
                                    if (e.target.checked) {
                                      arr.push(msg.id);
                                    } else {
                                      const i = deleteArray.findIndex(
                                        (el) => el === msg.id
                                      );
                                      if (i !== -1) {
                                        arr.splice(i, 1);
                                      }
                                    }
                                    setArray([...arr]);
                                  }}
                                />
                              )}{" "}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                {selectedUser.type == "group" ? (
                  selectedUser.gpAdmin ? (
                    <button
                      className="btn"
                      onClick={(e) => {
                        setMessage("");
                        setMessageArray([]);
                        setArray([]);
                        setDelete(false);
                        setDropdownOpen(false);
                        setSelectedUser(selectedUser.gpAdmin);
                      }}
                    >
                      Message to group admin
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  <div className="ptb-10 plrp-3 d-flex box border-top align-items-center">
                    <Input
                      id="message_input"
                      placeholder="Say something..."
                      className="mlp-2 mrp-1 message_input"
                      value={message}
                      // type="textarea"
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (
                          e.key === "Enter" &&
                          message &&
                          message.length > 0
                        ) {
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
                      onClick={(e) => {
                        if (message && message.length > 0) {
                          sendMessage(false, null);
                        }
                      }}
                      disabled={loader || !(message && message.length > 0)}
                    ></input>
                  </div>
                )}
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
          ) : null
        ) : (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 plr-0">
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
                            setSelectedUser(chat);
                            setArray([]);
                            setDelete(false);
                            setDropdownOpen(false);
                            setChatOn(true);
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
                      {chat.type == "group" ? (
                        ""
                      ) : (
                        <div className="bin">
                          <i
                            className="material-symbols-outlined"
                            aria-hidden="true"
                            onClick={(e) => {
                              deleteChatId = chat.memberId;
                              setOpen(!open);
                            }}
                          >
                            delete
                          </i>
                        </div>
                      )}
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
        )}
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

export default MobileChat;
