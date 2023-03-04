import React, { useEffect } from "react";
import Status from "../components/status";
import Transition from "../components/transition";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { resetWorkflowStatuses } from "../store/status/status.action";
import { resetWorkflowTransitions } from "../store/transition/transition.action";
const Homepage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
    }, []);

    const resetWorkflow = () => {
        dispatch(resetWorkflowTransitions())
        dispatch(resetWorkflowStatuses())
    }
    return (
        <div className="home-page-container">
            <div className="app-title">Build a workflow</div>
            <div className="statuses-transitions">
                <Status />
                <Transition />
            </div>
            <div className="reset-button">
                <button onClick={() => resetWorkflow()} >RESET</button>
            </div>
        </div>
    );
};

export default Homepage;
