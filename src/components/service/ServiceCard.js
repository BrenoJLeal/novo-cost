import styles from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
import { Button } from '@mui/material';
import { useEffect } from 'react';
const ServiceCard = ({id,name,cost,description,handleRemove}) => {
        
        const remove = (e) =>{
            e.preventDefault()
            handleRemove(id, cost)
        }
    
    return ( 
            <div className={styles.project_card}>
                <h4>{name}</h4>
                <p>
                    <span>Custo total: </span>R$ {parseFloat(cost).toLocaleString('pt-BR')}
                </p>
                <p>
                    <span>Descrição: </span>{description}
                </p>
                <div className={styles.project_card_actions}>
                    <button 
                    title='Excluir'
                    color="primary" 
                    size='large' 
                    onClick={remove}
                    >
                        <BsFillTrashFill/>
                    </button>
                </div>
            </div>
    );
}
 
export default ServiceCard;