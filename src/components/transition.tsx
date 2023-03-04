import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from '../store/store';
import { getAllTransitions } from '../store/transition/transition.action';
import TransitionsList from './transitionsList';
import { createTransition, deleteTransition } from '../store/transition/transition.action';
import { TransitionModel } from '../model/transition.model';
import { useForm, SubmitHandler } from "react-hook-form";
import { IStatus } from '../interfaces/status';
import { ITransition } from '../interfaces/transition';
import { updateStatuses } from '../store/status/status.action';

interface IFormInput {
    name: string;
    fromStatus: string;
    toStatus: string;
}

const Transition = () => {
    const statuses = useSelector(
        (state: RootStore) => state.statuses.statuses
    );
    const { register, handleSubmit, watch } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => createNewTransition(data);
    const [name, fromStatus, toStatus] = watch(['name', 'fromStatus', 'toStatus'])
    const transitions = useSelector(
        (state: RootStore) => state.transitions.transitions
    );
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllTransitions())
    }, [])


    const createNewTransition = async (data: IFormInput) => {
        const { name, fromStatus, toStatus } = data
        if (!statuses) return
        if (!name && !fromStatus && !toStatus) return
        let from: IStatus[]
        let to: IStatus[]
        const transition = new TransitionModel()
        transition.name = data.name
        if (transitions?.length && statuses) {
            const isTransitionExists = transitions.some((transition: ITransition) => transition.name === data.name)
            if (isTransitionExists) return
            from = statuses?.filter((status: IStatus) => status._id === data.fromStatus)
            to = statuses?.filter((status: IStatus) => status._id === data.toStatus)
            await onUpdateStatus(from[0], to[0], false)
        } else {
            from = statuses?.filter((status: IStatus) => status._id === data.fromStatus)
            to = statuses?.filter((status: IStatus) => status._id === data.toStatus)
            await onUpdateStatus(from[0], to[0], false)
        }
        transition.fromStatus = from[0]
        transition.toStatus = to[0]
        dispatch(createTransition(transition))
    }

    const onUpdateStatus = async (from: IStatus, to: IStatus, isDeleted: boolean) => {
        const fromStatus = { ...from }
        const toStatus = { ...to }
        if (!isDeleted) {
            if (fromStatus.isInitial || fromStatus.isFinal) {
                toStatus.isOrphan = false
                fromStatus.isFinal = false
            } else if (toStatus.isInitial) {
                fromStatus.isFinal = false
            }
        }
        if (isDeleted && transitions?.length) {
            const isFinal: ITransition[] = transitions.filter((transition: ITransition) => transition.fromStatus._id === fromStatus._id)
            const isOrphan: ITransition[] = transitions?.filter((transition: ITransition) => transition.toStatus._id === toStatus._id)
            if (!fromStatus.isFinal) {
                if (fromStatus.isInitial) {
                    toStatus.isOrphan = false
                } else {
                    toStatus.isOrphan = isOrphan.length > 1 ? false : true
                }
                fromStatus.isFinal = isFinal.length > 1 ? false : true;
            }
            if (!toStatus.isOrphan) {
                toStatus.isOrphan = isOrphan.length > 1 ? false : true
            }
        }
        dispatch(updateStatuses([fromStatus, toStatus]))
        return
    }
    const onDeleteTransition = async (transitionId: string, idx: number) => {
        dispatch(deleteTransition(transitionId))
        if (!transitions) return
        await onUpdateStatus(transitions[idx].fromStatus, transitions[idx].toStatus, true)
    }

    return (
        <div className="transitions-all-container">
            <h2>Add transition</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} />
                From: <select {...register("fromStatus")}>
                    <option></option>
                    {statuses?.map((status: IStatus) => {
                        if (status._id === toStatus) return
                        return <option key={status.name} value={status._id}>{status.name}</option>
                    })}
                </select>
                To: <select {...register("toStatus")}>
                    <option></option>
                    {statuses?.map((status: IStatus) => {
                        if (status._id === fromStatus) return
                        return <option key={status.name} value={status._id}>{status.name}</option>
                    })}
                </select>
                <input type="submit" value="add" />
            </form>
            {transitions && <TransitionsList transitions={transitions} onDeleteTransition={onDeleteTransition} />}
        </div>
    )
}

export default Transition;
