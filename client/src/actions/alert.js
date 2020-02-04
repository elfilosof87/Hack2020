import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const SET_ALERT = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
