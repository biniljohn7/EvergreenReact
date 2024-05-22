import React, { useState, useEffect } from "react";
import Wrapper from "./inbox.style";
import firebase from "../../firebaseChat";
import { store } from "../../redux/store";
import User_05 from "../../assets/images/user_05x.png";
import { Spinner, Modal, Button, Input } from "reactstrap";
import { ToastsStore } from "react-toasts";
import ChatProfile from "./ChatProfile";
import Camera from "../../assets/images/camera_1x.png";
import Send from "../../assets/images/send_1x.png";
import moment from "moment";
import Compressor from "compressorjs";
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
    }
    // setChatOn(true)

    if (store.getState().auth.chatMemberId) {
      // Check if document is exist
      let docRef = firebase
        .firestore()
        .collection("recent_chat")
        .doc(store.getState().auth.memberId.toString())
        .collection("users")
        .doc(store.getState().auth.chatMemberId.toString());

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setSelectedUser(doc.data());
          } else {
            setSelectedUser({
              memberId: store.getState().auth.chatMemberId,
              fullName: store.getState().auth.chatFullName,
              profileImage: store.getState().auth.chatProfileImage,
            });
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          setChatOn(false);
        });
    }
  }, [store.getState().auth.chatMemberId]);

  // useEffect(() => {
  // }, [recentChatArray])

  useEffect(() => {
    if (selectedUser) {
      setMessageArray([]);
      const senderId = store.getState().auth.memberId;
      const receiverId = selectedUser.memberId;

      const chatPath =
        senderId < receiverId
          ? senderId + "_" + receiverId
          : receiverId + "_" + senderId;

      const query = selectedUser.lastReadTime
        ? firebase
            .firestore()
            .collection("chats")
            .doc(chatPath)
            .collection("messages")
            .orderBy("timestamp")
            .where("timestamp", ">=", selectedUser.lastReadTime)
        : firebase
            .firestore()
            .collection("chats")
            .doc(chatPath)
            .collection("messages")
            .orderBy("timestamp");

      query.onSnapshot(
        (snapshot) => {
          let array = [];
          snapshot.forEach((doc) => {
            array.push(doc.data());
          });
          setMessageArray(array);
          // Add event listener
          // snapshot.docChanges().forEach((change) => {
          //   if (change.type === 'added') {
          //     // console.log('add event: ')
          //   }
          //   if (change.type === 'modified') {
          //     // console.log('Modified event: ')
          //   }
          //   if (change.type === 'removed') {
          //     // console.log('Removed event: ')
          //   }
          // })
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [selectedUser]);

  const getRecentChat = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("recent_chat")
      .doc(store.getState().auth.memberId.toString())
      .collection("users")
      .where("delete", "==", false)
      .orderBy("lastMessageTime", "desc")
      .onSnapshot(
        (snapshot) => {
          // Add recent chat
          let arr = [];
          snapshot.forEach((doc) => {
            arr.push(doc.data());
          });
          setRecentChat(arr);

          // Add event listener
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              // console.log('add event: ', change.doc.data())
            }
            if (change.type === "modified") {
              // console.log('Modified event: ', change.doc.data())
            }
            if (change.type === "removed") {
              // console.log('Removed event: ', change.doc.data())
            }
          });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
  };

  const deleteRecentChat = (wasLastMessage = false) => {
    setLoader(true);

    // Update the flag 'delete' to true
    firebase
      .firestore()
      .collection("recent_chat")
      .doc(store.getState().auth.memberId.toString())
      .collection("users")
      .doc(deleteChatId.toString())
      .update({
        delete: true,
        lastReadTime: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // Update the lastReadTime of opposite member
        firebase
          .firestore()
          .collection("users")
          .doc(deleteChatId.toString())
          .update({
            lastReadTime: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            deleteChatId = null;

            // Do not toggle the modal if this method is called from deleteUserMessage
            if (!wasLastMessage) {
              ToastsStore.info("Chat deleted successfully");
              setLoader(false);
              setOpen(!open);
            }
          });
      })
      .catch((error) => {
        deleteChatId = null;
        console.error("Error removing rececent chat: ", error);
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
      try {
        let batch = firebase.firestore().batch();
        let chatPath =
          store.getState().auth.memberId < selectedUser.memberId
            ? store.getState().auth.memberId + "_" + selectedUser.memberId
            : selectedUser.memberId + "_" + store.getState().auth.memberId;

        deleteArray.forEach((element) => {
          const msgRef = firebase
            .firestore()
            .collection("chats")
            .doc(chatPath)
            .collection("messages")
            .doc(element);
          batch.delete(msgRef);
        });

        batch
          .commit()
          .then(() => {
            ToastsStore.info("Messages deleted successfully");
            const query = selectedUser.lastReadTime
              ? firebase
                  .firestore()
                  .collection("chats")
                  .doc(chatPath)
                  .collection("messages")
                  .orderBy("timestamp", "desc")
                  .where("timestamp", ">=", selectedUser.lastReadTime)
                  .limit(1)
              : firebase
                  .firestore()
                  .collection("chats")
                  .doc(chatPath)
                  .collection("messages")
                  .orderBy("timestamp", "desc")
                  .limit(1);

            query.onSnapshot(
              (snapshot) => {
                if (snapshot && snapshot.docs.length > 0) {
                  const message = snapshot.docs[0].data();
                  let msg = {
                    lastMessageTime: message.timestamp,
                    isRead: true,
                    lastMessage:
                      message.message && message.message.trim()
                        ? message.message
                        : "Image",
                  };

                  updateRecentChatLog(
                    store.getState().auth.memberId,
                    selectedUser.memberId,
                    msg
                  );
                  updateRecentChatLog(
                    selectedUser.memberId,
                    store.getState().auth.memberId,
                    msg
                  );
                } else {
                  // Delete recent chat (No message left)
                  deleteChatId = selectedUser.memberId;
                  deleteRecentChat(true);
                }
              },
              (error) => {
                console.error(error);
              }
            );
          })
          .catch((err) => {
            console.error(err);
            // ToastsStore.error('Failed to delete messages')
          });
      } catch (err) {
        console.error(err);
        ToastsStore.error("Failed to delete messages");
      }

      setLoader(false);
      setDeleteMessage(!deleteMessage);
      setArray([]);
      setDelete(!isDeleteOn);
    }
  };

  const updateRecentChatLog = (firstId, secondId, lastMessage) => {
    // console.log('updateRecentChat', firstId, secondId, lastMessage)
    firebase
      .firestore()
      .collection("recent_chat")
      .doc(firstId.toString())
      .collection("users")
      .doc(secondId.toString())
      .set(lastMessage, { merge: true });
  };

  const sendMessage = (isImage, imageUrl) => {
    setLoader(true);
    // console.log('in send msg', selectedUser.memberId)
    try {
      let userRef = firebase
        .firestore()
        .collection("recent_chat")
        .doc(selectedUser.memberId.toString())
        .collection("users")
        .doc(store.getState().auth.memberId.toString());

      // Store user data under 'users' collection
      let userData = {
        chatIds: [selectedUser.memberId],
        email: selectedUser.email || "",
        fullName:
          store.getState().auth.firstName +
          " " +
          store.getState().auth.lastName,
        lastChatDate: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: isImage ? "" : message,
        memberId: store.getState().auth.memberId,
        mobileNumber: "",
        profileImage: store.getState().auth.profileImage || null,
        userRef: [userRef],
        chatImage: isImage ? imageUrl : "",
      };

      // console.log('userData ', userData)

      // Update recent message
      let receiverRecentMessage = {
        lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: false,
        lastMessage: isImage ? "Image" : message,
        fullName: selectedUser.fullName,
        profileImage: selectedUser.profileImage,
        memberId: selectedUser.memberId,
        delete: false,
      };

      // Update recent message
      let senderRecentMessage = {
        lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: false,
        lastMessage: isImage ? "Image" : message,
        fullName:
          store.getState().auth.firstName +
          " " +
          store.getState().auth.lastName,
        profileImage: store.getState().auth.profileImage || null,
        memberId: store.getState().auth.memberId,
        delete: false,
      };

      // If the message is the 1st entry
      if (messageArray.count === 0) {
        receiverRecentMessage.lastReadTime =
          firebase.firestore.FieldValue.serverTimestamp();
        senderRecentMessage.lastReadTime =
          firebase.firestore.FieldValue.serverTimestamp();
        userData.lastReadTime = firebase.firestore.FieldValue.serverTimestamp();
      }

      // console.log('receiverRM', receiverRecentMessage)
      // console.log('senderRM', senderRecentMessage)

      let dataDict = {
        message: isImage ? "" : message,
        receiverId: selectedUser.memberId,
        senderId: store.getState().auth.memberId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        chatImage: isImage ? imageUrl : "",
        senderName:
          store.getState().auth.firstName +
          " " +
          store.getState().auth.lastName,
      };

      // console.log('dataDict ', dataDict)

      const chatPath =
        store.getState().auth.memberId < selectedUser.memberId
          ? store.getState().auth.memberId + "_" + selectedUser.memberId
          : selectedUser.memberId + "_" + store.getState().auth.memberId;

      firebase
        .firestore()
        .collection("users")
        .doc(store.getState().auth.memberId.toString())
        .update(userData)
        .then(() => {
          updateRecentChatLog(
            store.getState().auth.memberId,
            selectedUser.memberId,
            receiverRecentMessage
          );

          updateRecentChatLog(
            selectedUser.memberId,
            store.getState().auth.memberId,
            senderRecentMessage
          );

          let messageCollection = firebase
            .firestore()
            .collection("chats")
            .doc(chatPath)
            .collection("messages")
            .doc();

          // console.log(
          //   'message collection ',
          //   messageCollection,
          //   messageCollection.id,
          // )
          dataDict.chatId = messageCollection.id;
          messageCollection.set(dataDict, { merge: true });

          // Add extra fields to message queue
          dataDict.fullName = senderRecentMessage.fullName;
          dataDict.profileImage = senderRecentMessage.profileImage;
          if (senderRecentMessage.lastReadTime) {
            dataDict.lastReadTime = senderRecentMessage.lastReadTime;
          } else {
            dataDict.lastReadTime = "";
          }

          firebase.firestore().collection("messageQueue").doc().set(dataDict);

          setMessage("");
          setLoader(false);
          // console.log('in end msg')
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          setLoader(false);
        });
    } catch (error) {
      console.error(error);
      setMessage("");
      ToastsStore.error("Failed to send message");
      setLoader(false);
    }
  };

  const uploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Upload image to cloud storage

      new Compressor(e.target.files && e.target.files[0], {
        quality: 0.8,
        success(result) {
          // console.log(result)
          // Points to the reference
          let imageRef = firebase
            .storage()
            .ref()
            .child(
              `chatImages/${store.getState().auth.memberId.toString()}/${
                result.size
              } bytes`
            );

          try {
            imageRef.put(result).then((snapshot) => {
              // console.log('Uploaded a blob or file!', snapshot)
              imageRef
                .getDownloadURL()
                .then((url) => {
                  // console.log('url ', url)
                  sendMessage(true, url);
                })
                .catch((error) => {
                  // Handle any errors
                  console.error(error);
                  ToastsStore.error("Failed to send an image");
                });
            });
          } catch (err) {
            console.error(err);
            ToastsStore.error("Failed to send an image");
          }
        },
        error(err) {
          console.error(err, err.message);
          ToastsStore.error("Failed to send an image");
        },
      });
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
                        toggle={() =>
                          setDropdownOpen((prevState) => !prevState)
                        }
                      >
                        <DropdownToggle className="text-dark bg-white">
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                            id="open_menu"
                          ></i>
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
                                msg.senderId === store.getState().auth.memberId
                                  ? "mtb-5 d-flex justify-content-end height"
                                  : "mtb-5 d-flex justify-content-start height"
                              }
                            >
                              <div
                                className={
                                  msg.senderId ===
                                  store.getState().auth.memberId
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
                                      "hh:mm a"
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
                              )}{" "}
                            </div>
                          </div>
                        );
                      })}
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
