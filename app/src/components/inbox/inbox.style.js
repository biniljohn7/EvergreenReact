import styled from 'styled-components'

const Wrapper = styled.div`
  .nav-tabs .nav-link {
    color: #637381;
    border-color: #fff #fff #dee2e6 #fff;
    padding: 0.5rem 1rem 0.5rem 0;
  }

  .nav-tabs .nav-link.active {
    font-weight: bold;
  }

  .nav-link:hover {
    cursor: pointer;
  }

  .search {
    border: 1px solid #c4cdd5;
    border-radius: 20px;
  }

  .search:focus {
    outline: none;
  }

  .pwd {
    position: absolute;
    right: 20px;
    top: 30%;
  }

  .cancel {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .user {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  ul {
    padding-left: 0px;
  }

  li {
    margin: 0 auto;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .recent-chat {
    height: 95vh;
    overflow-y: scroll;
  }

  .photo {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  .bin {
    position: absolute;
    right: 0;
  }

  .profile_pic {
    height: 122px;
    width: 122px;
    border-radius: 50%;
    // object-fit: contain;
  }

  .chat_pic {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    @media (max-width: 768px) {
      height: 50px;
      width: 50px;
    }
  }

  .close {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 30%;
    overflow-y: scroll;
  }

  .chat-room {
    height: ${(props) => props.HEIGHT}px;
  }

  .message_list {
    max-height: 100%;
    overflow-y: scroll;
    scroll-snap-align: 'end';
    scroll-behavior: auto !important;
  }

  button {
    border: none;
  }

  button:disabled {
    cursor: not-allowed;
  }

  .message_list::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  .message_input {
    border: none;
    cursor: pointer;
  }

  .height {
    height: fit-content;
  }

  .messageDetailBox {
    height: 100%;
    padding: 10px;
    background-color: #a81815;
    max-width: 80%;
    // border: solid 1px rgba(139, 149, 154, 0.2);
  }
  .left_side {
    // border-bottom-left-radius: 20px;
    // border-top-right-radius: 20px;
    background-color: #153bf6;
  }
  .right_side {
    background-color: #ffffff;
    // border-bottom-right-radius: 20px;
    // border-top-left-radius: 20px;
  }

  .image-upload > input {
    display: none;
  }

  .delete_chat_right {
    position: absolute;
    right: 0;
  }

  .delete_chat_left {
    position: absolute;
    left: 0;
  }

  .option {
    position: absolute;
    right: 10px;
  }

  .dropdown-menu[x-placement^='top'],
  .dropdown-menu[x-placement^='right'],
  .dropdown-menu[x-placement^='bottom'],
  .dropdown-menu[x-placement^='left'] {
    left: auto !important;
    bottom: auto !important;
  }
`
export default Wrapper
