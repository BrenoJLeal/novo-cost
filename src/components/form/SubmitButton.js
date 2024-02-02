
import styles from './SubmitButton.module.css'
const SubmitButton = ({text}) => {
    // const {type, text, name, placeholder,handleOnChange, value} = props
    return ( 
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}

export default SubmitButton;