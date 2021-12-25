import modal from '../../../hoc/modal';
import './Spinner.css';

function Spinner() {
    return (
        <div className="spinner">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default modal(Spinner);