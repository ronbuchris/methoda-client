import { IStatus } from "../interfaces/status";
import axios from "axios";

const getAllStatuses = async () => {
  try {
    const { data } = await axios.get('/api/status/')
    return data
  } catch (err) {
    throw (err)
  }
};
const createStatus = async (status: IStatus): Promise<IStatus> => {
  try {
    const { data } = await axios.post('/api/status/', { status })
    return data
  } catch (err) {
    throw (err)
  }
};
const deleteStatus = async (statusId: string) => {
  try {
    const { data } = await axios.delete('/api/status/', { data: { statusId } })
    return data
  } catch (err) {
    throw (err)
  }
};
const updateStatuses = async (data: IStatus[]) => {
  try {
    const updatedStatuses = await axios.put('/api/status/', { data })
    return updatedStatuses.data
  } catch (err) {
    throw (err)
  }
};
const resetWorkflowStatuses = async () => {
  try {
    const { data } = await axios.delete('/api/status/reset')
    return data
  } catch (err) {
    throw (err)
  }
};

const StatusService = {
  getAllStatuses,
  createStatus,
  deleteStatus,
  updateStatuses,
  resetWorkflowStatuses
};

export default StatusService;
