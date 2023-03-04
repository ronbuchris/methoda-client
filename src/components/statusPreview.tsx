import React, { useEffect } from 'react'
import { IStatus } from '../interfaces/status';

const StatusesPreview = (props: { status: IStatus, idx: number, onValueChange: Function, onDeleteStatus: Function }) => {
    const { status, idx, onValueChange, onDeleteStatus } = props
    useEffect(() => {
    }, [])

    return (
        <div className="status-container">
            <label>
                <input type="radio" name="radio-status" value={status.name} checked={status.isInitial} onChange={() => onValueChange(status)} />
                <div className="status-name">{status.name}</div>
                {status.isInitial && <div className="status-name">[INIT]</div>}
                {status.isFinal && <div className="status-name">[FINAL]</div>}
                {status.isOrphan && <div className="status-name">[ORPHAN]</div>}
                <button className="delete-status" onClick={() => onDeleteStatus(status._id, idx)}>remove</button>
            </label>
        </div>
    )
}

export default StatusesPreview;
