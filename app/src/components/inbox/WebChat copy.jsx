import React, { useState, useEffect } from 'react';
import { Button, Input, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal } from 'reactstrap';
import moment from 'moment';
import Compressor from 'compressorjs';
import axios from 'axios'; // Using axios for API calls
import { useSelector, useDispatch } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import Wrapper from './Wrapper';
import User_05 from './User_05.png';
import Camera from './camera.png';
import Send from './send.png';
import ChatProfile from './ChatProfile';

// Your previous state selectors and action imports

const WebChat = () => {
  const [message, setMessage] = useState('');
  const [messageArray, setMessageArray] = useState([]);
  const [recentChatArray, setRecentChatArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [isDeleteOn, setDelete] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const HEIGHT = window.innerHeight;

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchRecentChats = async () => {
    try {
      const response = await axios.get('/api/recent_chats', {
        params: { memberId: auth.memberId }
      });
      setRecentChatArray(response.data);
    } catch (error) {
      console.error('Error fetching recent chats:', error);
    }
  };

  useEffect(() => {
    fetchRecentChats();
  }, []);

  const sendMessage = async (isImage, imageUrl) => {
    setLoader(true);
    try {
      const userData = {
        chatIds: [selectedUser.memberId],
        email: selectedUser.email || '',
        fullName: `${auth.firstName} ${auth.lastName}`,
        lastChatDate: new Date(),
        lastMessage: isImage ? '' : message,
        memberId: auth.memberId,
        mobileNumber: '',
        profileImage: auth.profileImage || null,
        chatImage: isImage ? imageUrl : '',
      };

      const receiverRecentMessage = {
        lastMessageTime: new Date(),
        isRead: false,
        lastMessage: isImage ? 'Image' : message,
        fullName: selectedUser.fullName,
        profileImage: selectedUser.profileImage,
        memberId: selectedUser.memberId,
        delete: false,
      };

      const senderRecentMessage = {
        lastMessageTime: new Date(),
        isRead: false,
        lastMessage: isImage ? 'Image' : message,
        fullName: `${auth.firstName} ${auth.lastName}`,
        profileImage: auth.profileImage || null,
        memberId: auth.memberId,
        delete: false,
      };

      if (messageArray.length === 0) {
        receiverRecentMessage.lastReadTime = new Date();
        senderRecentMessage.lastReadTime = new Date();
        userData.lastReadTime = new Date();
      }

      const dataDict = {
        message: isImage ? '' : message,
        receiverId: selectedUser.memberId,
        senderId: auth.memberId,
        timestamp: new Date(),
        chatImage: isImage ? imageUrl : '',
        senderName: `${auth.firstName} ${auth.lastName}`,
      };

      const chatPath =
        auth.memberId < selectedUser.memberId
          ? `${auth.memberId}_${selectedUser.memberId}`
          : `${selectedUser.memberId}_${auth.memberId}`;

      await axios.post('/api/messages', {
        userData,
        receiverRecentMessage,
        senderRecentMessage,
        dataDict,
        chatPath
      });

      setMessage('');
      setLoader(false);
    } catch (error) {
      console.error('Error sending message:', error);
      ToastsStore.error('Failed to send message');
      setLoader(false);
    }
  };

  const uploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.8,
        success(result) {
          const formData = new FormData();
          formData.append('file', result);

          axios.post('/api/upload', formData)
            .then((response) => {
              sendMessage(true, response.data.url);
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
              ToastsStore.error('Failed to send an image');
            });
        },
        error(err) {
          console.error(err.message);
          ToastsStore.error('Failed to send an image');
        },
      });
    }
  };

  return loader ? (
    <div className="text-center mt-20">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper HEIGHT={HEIGHT}>
      <div className="row mlr-0">
        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 pr-10 pl-0">
          {recentChatArray && recentChatArray.length > 0 ? (
            <div className="border plr-10 recent-chat">
              {recentChatArray.map((chat, index) => (
                <div
                  className={
                    'd-flex ptb-10 cursor-pointer position-relative ' +
                    (index !== 0 ? ' border-top' : '')
                  }
                  key={index}
                >
                  <img
                    src={chat.profileImage || User_05}
                    alt="user"
                    className="photo mr-10"
                    onClick={() => {
                      setModal(true);
                    }}
                  />
                  <div
                    className="wp-75"
                    onClick={() => {
                      if (!selectedUser || chat.memberId !== selectedUser.memberId) {
                        setMessage('');
                        setMessageArray([]);
                        setDelete(false);
                        setDropdownOpen(false);
                        setSelectedUser(chat);
                      }
                    }}
                  >
                    <div className="text-bold">{chat.fullName}</div>
                    <div>
                      {chat.lastMessage.toString().length > 20
                        ? chat.lastMessage.toString().substr(0, 20) + '...'
                        : chat.lastMessage.toString().substr(0, 20)}
                    </div>
                  </div>
                  <div className="bin">
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        setOpen(true);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
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
                  onClick={() => setModal(true)}
                />
                <label
                  className="text-bold mlp-3 mtp-2"
                  onClick={() => setModal(true)}
                >
                  {selectedUser.fullName}
                </label>
                <div className="option d-flex align-items-baseline">
                  <i
                    className={
                      'fa fa-times mr-10' +
                      (isDeleteOn ? ' visible ' : ' invisible ')
                    }
                    aria-hidden="true"
                    onClick={() => {
                      setDelete(false);
                      setDropdownOpen(false);
                    }}
                  ></i>
                  <i
                    className={
                      'fa fa-trash mr-10' +
                      (isDeleteOn && deleteArray.length > 0 ? ' visible ' : ' invisible ')
                    }
                    aria-hidden="true"
                    onClick={() => setDeleteMessage(!deleteMessage)}
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
                        ></i>
                      </DropdownToggle>
                      <DropdownMenu style={{ right: -50 }}>
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
              <div className="chat-room bg-light plr-15 ptb-10">
                <div className="message_list" id="message_list_scroll">
                  {messageArray &&
                    messageArray.map((msg) => (
                      <div key={msg.chatId} className="wp-100">
                        <div
                          className={
                            msg.senderId === auth.memberId
                              ? 'mtb-5 d-flex justify-content-end height'
                              : 'mtb-5 d-flex justify-content-start height'
                          }
                        >
                          <div
                            className={
                              msg.senderId === auth.memberId
                                ? 'messageDetailBox right_side red--text bg-white'
                                : 'messageDetailBox left_side text-white red'
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
                                moment(msg.timestamp).format(
                                  'MM/DD/yyyy hh:mm a'
                                )}
                            </div>
                          </div>
                          {msg.senderId === auth.memberId && (
                            <input
                              type="checkbox"
                              id={msg.chatId}
                              name="delete_chat"
                              className={
                                'ml-7' + (isDeleteOn ? ' d-block ' : ' d-none ')
                              }
                              checked={deleteArray.includes(msg.chatId)}
                              style={{ height: '24px' }}
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
                                setArray([...arr]);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="ptb-10 plrp-3 d-flex box border-top align-items-center">
                <Input
                  id="message_input"
                  placeholder="Say something..."
                  className="mlp-2 mrp-1 message_input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message && message.length > 0) {
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
                ></input>
              </div>
            </div>
            {deleteMessage && (
              <div>
                <div
                  className="bg-light"
                  style={{ height: window.innerHeight + 'px' }}
                ></div>
                <Modal
                  isOpen={deleteMessage}
                  toggle={() => setDeleteMessage(!deleteMessage)}
                  centered
                  size="lg"
                  className="signin"
                >
                  <div className="ptb-50 plr-20 text-center text-bold">
                    Are you sure you want to delete?
                    <div className="d-flex justify-content-center mt-15">
                      <Button
                        color="danger"
                        onClick={() => {
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
          </React.Fragment>
        ) : null}
      </div>
      {open && (
        <div>
          <div
            className="bg-light"
            style={{ height: window.innerHeight + 'px' }}
          ></div>
          <Modal
            isOpen={open}
            toggle={() => setOpen(!open)}
            centered
            size="lg"
            className="signin"
          >
            <div className="ptb-50 plr-20 text-center text-bold">
              Are you sure you want to delete chat?
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
            memberId = null;
          }}
        />
      )}
    </Wrapper>
  );
};

export default WebChat;
