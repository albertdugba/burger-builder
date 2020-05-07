import * as actionTypes from "../actions/actions";
import { UpdateObject } from "../../shared/utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return UpdateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return UpdateObject(state, {
    loading: false,
    token: action.idToken,
    userId: action.userId,
    error: action.error,
  });
};

const authFail = (state, action) => {
  return UpdateObject(state, { loading: false, error: action.error });
};

const authLogout = (state, action) => {
  return UpdateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
