import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom';
const LinkButton = (props) => {
    const {to, text} = props;
    return ( 
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
     );
}
 
export default LinkButton;