import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStatus } from "../../interfaces/status";

import StatusService from "../../services/status.service";

export const getAllStatuses = createAsyncThunk("status/getAllStatuses", async () => {
  try {
    const statuses: IStatus[] = await StatusService.getAllStatuses();
    return statuses;
  } catch (error) {
    throw (error)
  }
});
export const createStatus = createAsyncThunk("status/createStatus", async (status: IStatus): Promise<IStatus> => {
  try {
    const newStatus: IStatus = await StatusService.createStatus(status);
    return newStatus;
  } catch (error) {
    throw (error)
  }
});
export const deleteStatus = createAsyncThunk("status/deleteStatus", async (statusId: string): Promise<IStatus> => {
  try {
    const deletedStatus = await StatusService.deleteStatus(statusId);
    return deletedStatus
  } catch (error) {
    throw (error)
  }
});
export const updateStatuses = createAsyncThunk("status/updateStatuses", async (data: [fromStatus: IStatus, toStatus: IStatus]): Promise<IStatus[]> => {
  try {
    const statuses = await StatusService.updateStatuses(data);
    return statuses
  } catch (error) {
    throw (error)
  }
});
export const resetWorkflowStatuses = createAsyncThunk("status/resetWorkflowStatuses", async (): Promise<IStatus[]> => {
  try {
    const statuses = await StatusService.resetWorkflowStatuses();
    return statuses
  } catch (error) {
    throw (error)
  }
});
