import { useEffect } from 'react'
import { ITransition } from '../interfaces/transition';

const TransitionPreview = (props: { transition: ITransition, idx: number, onDeleteTransition: Function }) => {
    const { transition, idx, onDeleteTransition } = props
    useEffect(() => {
    }, [])

    return (
        <div className="transition-container">
            <div className="transition-name">{transition.name} : </div>
            <div className="transition-name">{transition.fromStatus.name}</div>
            <div className="transition-name"> {'->'} </div>
            <div className="transition-name">{transition.toStatus.name}</div>
            <button className="delete-transition" onClick={() => onDeleteTransition(transition._id, idx)}>remove</button>
        </div>
    )
}

export default TransitionPreview;
