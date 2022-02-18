import { createSlice } from "@reduxjs/toolkit";

export const respondentSlice = createSlice({
  name: "respondent",
  initialState: {
    respondents: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getRespondentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getRespondentSuccess: (state, action) => {
      state.isFetching = false;
      state.respondents = action.payload;
    },
    getRespondentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addRespondentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addRespondentSuccess: (state, action) => {
      state.isFetching = false;
      state.respondents.push(action.payload);
    },
    addRespondentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getRespondentStart,
  getRespondentSuccess,
  getRespondentFailure,
  addRespondentStart,
  addRespondentSuccess,
  addRespondentFailure,
} = respondentSlice.actions;

export default respondentSlice.reducer;
