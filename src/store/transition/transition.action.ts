// import TransitionService from "../../services/transition.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITransition } from "../../interfaces/transition";
import TransitionService from "../../services/transition.service";

export const getAllTransitions = createAsyncThunk("transition/getAllTransitions", async () => {
    try {
        const transitions: ITransition[] = await TransitionService.getAllTransitions();
        return transitions;
    } catch (error) {
        throw (error)
    }
});

export const createTransition = createAsyncThunk("transition/createTransition", async (transition: ITransition): Promise<ITransition> => {
    try {
        const newTransition: ITransition = await TransitionService.createTransition(transition);
        return newTransition;
    } catch (error) {
        throw (error)
    }
});

export const deleteTransition = createAsyncThunk("transition/deleteTransition", async (transitionId: string): Promise<any> => {
    try {
        const deletedTransition = await TransitionService.deleteTransition(transitionId);
        return deletedTransition
    } catch (error) {
        throw (error)
    }
});
export const deleteTransitions = createAsyncThunk("transition/deleteTransitions", async (transitionId: string): Promise<any> => {
    try {
        const deletedTransition = await TransitionService.deleteTransitions(transitionId);
        return deletedTransition
    } catch (error) {
        throw (error)
    }
});
export const resetWorkflowTransitions = createAsyncThunk("transition/resetWorkflowTransitions", async (): Promise<any> => {
    try {
        const deletedTransition = await TransitionService.resetWorkflowTransitions();
        return deletedTransition
    } catch (error) {
        throw (error)
    }
});
