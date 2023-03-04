import { createSlice } from "@reduxjs/toolkit";
import { IStatus } from "../../interfaces/status";
import { getAllStatuses, createStatus, deleteStatus, updateStatuses, resetWorkflowStatuses } from "./status.action";

interface initialStateI {
  status?: IStatus | null;
  statuses?: IStatus[];
}

const initialState: initialStateI = {
  status: null,
  statuses: [],
};

const statusSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload;
    });
    builder.addCase(createStatus.fulfilled, (state, action) => {
      if (state.statuses) {
        state.statuses.push(action.payload)
      }
    });
    builder.addCase(deleteStatus.fulfilled, (state, action) => {
      const deletedStatus = action.payload
      state.statuses = state.statuses?.filter((status: IStatus) => status._id !== deletedStatus._id)
    });
    builder.addCase(updateStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload;
    });
    builder.addCase(resetWorkflowStatuses.fulfilled, (state, action) => {
      state.statuses = [];
    });
  },
});

export const statusActions = statusSlice.actions;
export default statusSlice.reducer;
