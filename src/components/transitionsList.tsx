import { ITransition } from '../interfaces/transition';
import TransitionPreview from './transitionPreview';

const TransitionsList = (props: { transitions: ITransition[], onDeleteTransition: Function }) => {
    const { transitions, onDeleteTransition } = props

    return (
        <div className="transitions-container">
            <form>
                {transitions.map((transition: ITransition, idx: number) => {
                    return <TransitionPreview key={transition.name} idx={idx} transition={transition} onDeleteTransition={onDeleteTransition} />
                })}
            </form>
        </div>
    )
}

export default TransitionsList;
