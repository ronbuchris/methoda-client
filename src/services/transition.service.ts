import axios from "axios";
import { ITransition } from "../interfaces/transition";

const getAllTransitions = async () => {
  try {
    const { data } = await axios.get('http://localhost:3030/api/transition/')
    return data
  } catch (err) {
    throw (err)
  }
};
const createTransition = async (transition: ITransition): Promise<ITransition> => {
  try {
    const { data } = await axios.post('http://localhost:3030/api/transition/', { transition })
    return data
  } catch (err) {
    throw (err)
  }
};
const deleteTransition = async (transitionId: string) => {
  try {
    const { data } = await axios.delete('http://localhost:3030/api/transition/', { data: { transitionId } })
    return data
  } catch (err) {
    throw (err)
  }
};
const deleteTransitions = async (statusId: string) => {
  try {
    const { data } = await axios.delete('http://localhost:3030/api/transition/deleteMany', { data: { statusId } })
    return data
  } catch (err) {
    throw (err)
  }
};
const resetWorkflowTransitions = async () => {
  try {
    const { data } = await axios.delete('http://localhost:3030/api/transition/reset')
    return data
  } catch (err) {
    throw (err)
  }
};
const TransitionService = {
  getAllTransitions,
  createTransition,
  deleteTransition,
  deleteTransitions,
  resetWorkflowTransitions
};

export default TransitionService;