import { createSlice } from "@reduxjs/toolkit";
import { ITransition } from "../../interfaces/transition";
import { createTransition, deleteTransition, getAllTransitions, deleteTransitions, resetWorkflowTransitions } from "./transition.action";

interface initialStateI {
  transitions?: ITransition[];
}

const initialState: initialStateI = {
  transitions: [],
};

const transitionSlice = createSlice({
  name: "transitions",
  initialState,
  reducers: {
    setTransitions: (state, action) => {
      state.transitions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTransitions.fulfilled, (state, action) => {
      state.transitions = action.payload;
    });
    builder.addCase(createTransition.fulfilled, (state, action) => {
      if (state.transitions) {
        state.transitions.push(action.payload)
      }
    });
    builder.addCase(deleteTransition.fulfilled, (state, action) => {
      const deletedTransition = action.payload
      state.transitions = state.transitions?.filter((transition: ITransition) => transition._id !== deletedTransition._id)
    });
    builder.addCase(deleteTransitions.fulfilled, (state, action) => {
      if (action.payload) {
        state.transitions = action.payload;
      }
    });
    builder.addCase(resetWorkflowTransitions.fulfilled, (state, action) => {
      state.transitions = [];
    });
  },
})

export const transitionActions = transitionSlice.actions;
export default transitionSlice.reducer;
