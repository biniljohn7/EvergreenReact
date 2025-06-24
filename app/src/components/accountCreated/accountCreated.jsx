import React from "react";
import Wrapper from "./accountCreated.style";
import { Link, useLocation } from "react-router-dom";

export default function AccountCreated() {
  document.title = "Account Created - " + window.seoTagLine;

  return (
    <Wrapper>
      <div className="heading">Your account has been created!</div>
      <div className="body-txt">
        Account created successfully! &nbsp;
        <Link to="/signin">Log in.</Link>
      </div>
    </Wrapper>
  );
}
