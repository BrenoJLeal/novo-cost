
import styles from './Input.module.css'
const Input = ({type, text, name, placeholder,handleOnChange, value}) => {
    // const {type, text, name, placeholder,handleOnChange, value} = props
    return ( 
        <div className={styles.form_control}>
             <label htmlFor={name}>{text}</label>
            <input
                required 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value}
            />
        </div>
     );
}
 
export default Input;