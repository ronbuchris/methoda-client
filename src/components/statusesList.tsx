import { IStatus } from '../interfaces/status';
import StatusPreview from './statusPreview';
interface IFormInput {
    name: string;
}

const StatusesList = (props: { statuses: IStatus[], onDeleteStatus: Function, onValueChange: Function }) => {
    const { statuses, onDeleteStatus, onValueChange } = props

    return (
        <div className="statuses-container">
            <form>
                {statuses.map((status: IStatus, idx: number) => {
                    return <StatusPreview key={status.name} idx={idx} status={status} onDeleteStatus={onDeleteStatus} onValueChange={onValueChange} />
                })}
            </form>
        </div>
    )
}

export default StatusesList;
