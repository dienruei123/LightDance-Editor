import { registerActions } from "../registerActions";
// types
import { State } from "../models";
import client from "../../client";
// gql
import { SHIFT_TIME } from "../../graphql";

const actions = registerActions({
  /**
   * Shift frame time from startFrame to endFrame += shiftTime
   * @param {State} state
   * @param {object} payload
   */
  shiftFrameTime: async (
    state: State,
    payload: {
      type: string;
      startTime: number;
      endTime: number;
      shiftTime: number;
    }
  ) => {
    const { type, startTime, endTime, shiftTime } = payload;
    try {
      await client.mutate({
        mutation: SHIFT_TIME,
        variables: {
          shiftPosition: !!(type === "position" || type === "both"),
          shiftControl: !!(type === "control" || type === "both"),
          move: shiftTime,
          end: endTime,
          start: startTime,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
});

export const { shiftFrameTime } = actions;
