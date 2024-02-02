import styles from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const ProjectCard = ({id, name, budget, category, handleRemove}) => {
    
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }
    

    return ( 

        //Cards com informações do banco de dados
        <div className={styles.project_card} key={id}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: R$ {parseFloat(budget).toLocaleString('pt-BR')}</span>
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>


            <div className={styles.project_card_actions}>
                <Link  to={`/project${id}`}>
                    <button title='Editar' size='large'>
                        <BsPencil/>
                    </button>
                </Link>
                <button title='Excluir' onClick={remove} size='large' color="primary" >
                    <BsFillTrashFill/>
                </button>
            </div>
        </div>

    );
}
 
export default ProjectCard;