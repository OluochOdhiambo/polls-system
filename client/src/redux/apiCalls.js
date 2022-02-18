import { userRequest, publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import {
  getRespondentStart,
  getRespondentSuccess,
  getRespondentFailure,
  addRespondentStart,
  addRespondentSuccess,
  addRespondentFailure,
} from "./respondentRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
  window.location.reload();
};

export const signOut = async (dispatch) => {
  dispatch(logout());
};

export const getRespondents = async (dispatch) => {
  dispatch(getRespondentStart());
  try {
    const res = await userRequest.get("/respondents");
    dispatch(getRespondentSuccess(res.data));
  } catch (err) {
    dispatch(getRespondentFailure());
  }
};

export const addRespondent = async (respondent, dispatch) => {
  dispatch(addRespondentStart());
  try {
    const res = await userRequest.post(`/respondents`, respondent);
    dispatch(addRespondentSuccess(res.data));
    window.alert(`${respondent._id} added successfully`);
  } catch (err) {
    dispatch(addRespondentFailure());
    console.log(err);
  }
};
