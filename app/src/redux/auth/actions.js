const authActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FORGOTPWD: 'FORGOTPWD',
  SET: 'SET',

  login: (user) => {
    return {
      type: authActions.LOGIN,
      isLogin: true,
      payload: user,
    }
  },
  logout: () => {
    return {
      type: authActions.LOGOUT,
      isLogin: false,
    }
  },
  forgotPwd: (memberId) => {
    return {
      type: authActions.FORGOTPWD,
      memberId: memberId,
    }
  },
  set: (obj) => {
    return {
      type: authActions.SET,
      data: obj,
    }
  },
}

export default authActions
