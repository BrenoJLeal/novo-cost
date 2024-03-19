import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import styles from './Projects.module.css'
import Container from '../layout/Container'
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import Search from "../service/Search";
import { useNavigate } from "react-router-dom/dist";


const Projects = () => {
   
    
    const [projects,setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState ('')
    const [filter, setFilter] = useState("");

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }
    //Capta os projetos do banco de dados
    useEffect(() =>{
        setTimeout( async ()=>{
           await fetch(`http://localhost:5000/projects/`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                },
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            }).catch(err => console.log(err))
        },500)
  
    },[])

    //Deleta os projetosdobanco de dados
   async function removeProject(id){
        setProjectMessage('')
       await fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            },
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Erro ao remover o projeto');
            }
            // Atualiza a lista de projetos após a exclusão
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto removido com sucesso!')
            
        })
        .catch(err => console.log(err))
    };
    
    
    return ( 

        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton text='Criar Projeto' to='/newproject'/>
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Search filter={filter} setFilter={setFilter}/>
            <Container customClass="start">
            {projects.length >0 && 
            projects
            .filter((project) => project.name.toLowerCase().includes(filter.toLowerCase()) || filter === "")
            .map((project) =>(
                project && project.id && project.category && (
                    <ProjectCard 
                        id={project.id} 
                        name={project.name} 
                        budget={project.budget} 
                        category={project.category.name} 
                        key={project.id}
                        handleRemove={removeProject}
                        />
                )
            ))

            }
            {!removeLoading && <Loading/>}
            {removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}

            </Container>
        </div>
     );
}
 
export default Projects;
