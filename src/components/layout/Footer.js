import styles from './Footer.module.css'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom';
const Footer = () => {
    return ( 
        <footer  className={styles.footer}>
            <ul className={styles.social_list}>
                <Link to='https://wa.me/83998372676' target='_blank' className={styles.social_Link}><FaWhatsapp/></Link>

                <Link to='https://www.instagram.com/brebs.leal/' target='_blank' className={styles.social_Link}><FaInstagram/></Link>

                <Link to='https://github.com/BrenoJLeal' target='_blank' className={styles.social_Link}><FaGithub/></Link>

                <Link to='https://www.linkedin.com/in/breno-leal-1558a0289/' target='_blank' className={styles.social_Link}><FaLinkedin/></Link>
            </ul>
            <p className={styles.copy_right}><span>Costs</span> &copy; 2024</p>
        </footer>
     );
}
 
export default Footer;