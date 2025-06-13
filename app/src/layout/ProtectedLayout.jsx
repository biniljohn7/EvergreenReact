import React, { Fragment } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { store } from "../redux/store";
import PageContainer from "../layout/PageContainer";

// Not used for my-account path
const ProtectedLayout = ({
  mainComponent: Component,
  allowedRoles = [],
  ...rest
}) => {
  const location = useLocation();
  const {
    isLogin,
    accessToken,
    isProfileCreated,
    userRoles,
    membershipStatus,
  } = store.getState().auth;
  // Not logged in
  if (!isLogin || !accessToken) return <Redirect to="/signin" />;

  // Not have active membership
  if (
    (membershipStatus === "expired" || membershipStatus === null) &&
    location.pathname !== "/dues"
  ) {
    return <Redirect to="/dues" />;
  }

  // Profile not created
  if (location.pathname !== "/my-account" && !isProfileCreated)
    return <Redirect to="/account" />;

  // Role not allowed
  if (
    allowedRoles.length > 0 &&
    (!Array.isArray(userRoles) ||
      !userRoles.some((role) => allowedRoles.includes(role)))
  ) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <PageContainer>
      <Fragment>
        <Component {...rest} />
      </Fragment>
    </PageContainer>
  );
};

export default ProtectedLayout;
