import styled from 'styled-components'

const CommonWrapper = styled.div`
  .cancelmain {
    width: 20px;
    height: 20px;
    // float: right;
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .pwd {
    position: absolute;
    right: 15px;
    top: 56%;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-color: #f5f4f4;
    // background-color: #e7efff;
    padding: 20px 10px;
  }

  .flex-item {
    flex: 50%;
  }

  .camera {
    top: 29px;
    right: 5px;
  }

  .delete {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .profile_pic {
    height: 122px;
    width: 122px;
    border-radius: 50%;
    // object-fit: contain;
  }

  .active {
    background-color: #f5f4f4;
    // background-color: #e7efff;
  }

  .content-padding {
    padding: 15px 15px 11px 15px;
  }

  .react-switch {
    position: absolute !important;
    right: 7px;

    .react-switch-handle {
      height: 20px !important;
      width: 20px !important;
      top: -2.5px !important;
    }
  }

  .profile-switch {
    position: absolute !important;
    right: 0px !important;

    .react-switch-handle {
      height: 20px !important;
      width: 20px !important;
      top: -2.5px !important;
    }
  }

  .date-picker {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid rgba(112, 112, 112, 0.4);
    border-radius: 4px;
    opacity: 1;
  }

  .date-picker:focus {
    outline: none;
  }

  .file-upload {
    position: relative;
    display: block;
  }

  .file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width: 0;
    height: 100%;
    opacity: 0;
  }

  .openBtn {
    cursor: pointer;
    font-size: 20px;
    padding: auto;
    border: none;
  }

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 201;
    top: 0;
    left: 0;
    background-color: #ffffff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  .sidenav .navMenu {
    padding: 3px 10px 10px 7px;
    text-decoration: none;
    font-size: 16px;
    display: block;
    transition: 0.5s;
    cursor: pointer;
    color: #000000;
  }
  .sidenav .navMenu:hover {
    color: #f1f1f1;
  }
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    cursor: pointer;
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`

export default CommonWrapper
