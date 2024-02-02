import { useState, useEffect } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'
const ProjectForm = ({handleSubmit, projectData, btnText}) => {
    const [categories,setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() =>{
        async function fetchData(){
            await fetch('https://cost-server-kappa.vercel.app/categories',
        {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
        }
        fetchData()
    },[])

    const submit = (e) =>{
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    const handleChange = (e) =>{
        setProject({...project, [e.target.name]: e.target.value})
    }
    const handleSelect = (e) =>{
        setProject({
            ...project, 
            category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
        
    }
    
    return ( 
        <form onSubmit={submit} className={styles.form}>
                <Input 
                    type="text" 
                    text="Nome do projeto:" 
                    name='name' 
                    placeholder="Insira o nome do projeto"
                    value={project.name ? project.name: ''}
                    handleOnChange={handleChange}
                />
                <Input 
                    type="number" 
                    text="Orçamento do projeto:" 
                    name='budget'
                    placeholder="Insira o orçamento total"
                    value={project.budget ? project.budget: ''}
                    handleOnChange={handleChange}
                />
                <Select 
                    name='category_id' 
                    text='Selecione a categoria:'  
                    options={categories}
                    value={project.category ? project.category.id: ''}
                    handleOnChange={handleSelect}
                />
                <SubmitButton text={btnText}/>
            
        </form>
    );
}

export default ProjectForm;
