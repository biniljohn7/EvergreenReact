import styled from 'styled-components'
import { HEADER_COLOR } from '../../helper/constant'
const HeaderWrapper = styled.div`

  .header-height {
    // height: 80px;
    top: 0;
    background: ${HEADER_COLOR};
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 768px) {
      padding: 20px 10px;
    }
  }

  .login-header {
    bottom: 0;
    background: ${HEADER_COLOR};

    a {
      color: #fffafae8;
      // color: #fffafab3;
      border-bottom: 3px solid transparent;
    }

    a:hover{
      cursor:pointer;
      color:#FFFFFF;
      border-bottom: 3px solid #FFFFFF;
    }
  }

  .login-header a.active {
    color:#FFFFFF;
    border-bottom: 3px solid #FFFFFF;
  }

  .image-size {
    width:50px;
    height:50px;
    border-radius:50%
  }

  .profile-image-size {
    width:50px;
    height:50px;
    border-radius:50%
  }

  row {
    margin-left: 0px;
    margin-right: 0px;
  }

  .title {
    line-height: 23.27px;
    letter-spacing: 2px;
    @media (max-width: 767px) {
     letter-spacing: 1px;
    }
  }

  .header-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  .download {
    background-color: #ffffff;
    // background-color: #34bebf;
    border-radius: 41px;
    color: ${HEADER_COLOR};
    // margin-top: -7px;
  }

  .download:hover {
    text-decoration: none;
    color: ${HEADER_COLOR}
  }

  .openBtn {
    cursor: pointer;
    font-size: 20px;
    color: #ffffff !important;
    padding: auto;
    border: none;
  }

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 201;
    top: 0;
    right: 0;
    background-color: #ffffff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  .sidenav .navMenu {
    padding: 3px 8px 10px 32px;
    text-decoration: none;
    font-size: 16px;
    display: block;
    transition: 0.3s;
    cursor: pointer;
    color: #000000;
  }
  .sidenav .navMenu a {
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

  // .sticky-header{
  //   position:fixed;
  //   left:0;
  //   top:0;
  //   width:100%;
  //   z-index:100;
  // }
  
  }
`
export default HeaderWrapper
