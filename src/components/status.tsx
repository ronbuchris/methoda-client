import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createStatus, deleteStatus, getAllStatuses, updateStatuses } from '../store/status/status.action';
import { AppDispatch, RootStore } from '../store/store';
import StatusesList from './statusesList';
import { useForm, SubmitHandler } from "react-hook-form";
import { IStatus } from '../interfaces/status';
import { StatusModel } from '../model/status.model';
import { deleteTransitions } from '../store/transition/transition.action';
import { ITransition } from '../interfaces/transition';
interface IFormInput {
    name: string;
}
const Status = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit: SubmitHandler<IFormInput> = data => createNewStatus(data);
    const statuses = useSelector(
        (state: RootStore) => state.statuses.statuses
    );
    const transitions = useSelector(
        (state: RootStore) => state.transitions.transitions
    );
    useEffect(() => {
        dispatch(getAllStatuses())
    }, [])

    const createNewStatus = (data: IFormInput) => {
        const status = new StatusModel()
        status.name = data.name
        if (statuses?.length) {
            const isStatusExists = statuses.some((status: IStatus) => status.name === data.name)
            if (isStatusExists) return
        } else {
            status.isInitial = true;
            status.isOrphan = false;
        }
        dispatch(createStatus(status))
    }

    const onDeleteStatus = (statusId: string, idx: number) => {
        dispatch(deleteStatus(statusId))
        dispatch(deleteTransitions(statusId))
    }

    const onValueChange = (newInit: IStatus) => {
        const status = statuses?.find((status: IStatus) => status.isInitial)
        const isOrphan = transitions?.filter((transition: ITransition) => transition.fromStatus._id === status?._id)
        if (!status) return
        const prevStatus = { ...status }
        const newInitStatus = { ...newInit }
        prevStatus.isInitial = false;
        prevStatus.isOrphan = isOrphan?.length ? false : true;
        newInitStatus.isInitial = true;
        newInitStatus.isOrphan = false;
        dispatch(updateStatuses([newInitStatus, prevStatus]))

    }

    return (
        <div className="statuses-container">
            <h2>Add status </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} />
                <input type="submit" value="add" />
            </form>
            {statuses && <StatusesList statuses={statuses} onDeleteStatus={onDeleteStatus} onValueChange={onValueChange} />}
        </div>
    )
}

export default Status;
