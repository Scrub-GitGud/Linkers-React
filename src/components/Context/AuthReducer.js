export const authReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "UNSET_LOADING":
        return {
          ...state,
          loading: false,
        };
      case "SET_LOGIN_LOADING":
        return {
          ...state,
          login_loading: action.payload
        };
      case "LOAD_USER":
        return {
          ...state,
          isAuth: true,
          user: action.payload,
          loading: false,
        };
      case "REGISTER_SUCCESS":
      case "LOGIN_SUCCESS":
        localStorage.setItem("linkers_token", action.payload.data.token);
        return {
          ...state,
          isAuth: true
        };
      case "LOAD_USER_ERROR":
      case "LOGIN_FAIL":
      case "LOGOUT":
        localStorage.removeItem("linkers_token");
        return {
          ...state,
          token: null,
          isAuth: false,
          user: null,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
}