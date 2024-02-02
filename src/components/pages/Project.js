import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import styles from "./Project.module.css";
import { Fragment, useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectFrom from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import Search from "../service/Search";

const Project = () => {
  const { id } = useParams();
  const projectId = id.replace("project", "");

  const [project, setProject] = useState({});
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();
  const [deleteMessage, setDeleteMessage] = useState();
  const [type, setType] = useState();
  const [remainingBudget, setRemainingBudget] = useState(0);

  //Captação do Projeto a ser editado
  useEffect(() => {
    setTimeout(async () => {
      await fetch(
        `https://cost-server-kappa.vercel.app/projects/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [projectId]);

  //Editor de Projetos
  const editPost = async (project) => {
    setMessage("");
    //budget validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }
    await fetch(`https://cost-server-kappa.vercel.app/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        //Esconder formulario de edição dos projetos
        setShowProjectForm(false);
        //Esconder formulario de adicionar serviços
        setShowServiceForm(false);
        //message
        setMessage("Projeto atualizado");
        setType("success");
      })
      .catch((err) => console.log(err));
  };
  //Toggle de edição do projeto
  const toggleProjectFrom = () => {
    setShowProjectForm(!showProjectForm);
  };

  console.log(toggleProjectFrom)

  //Toggle de adicionar serviços
  const toggleServiceFrom = () => {
    setShowServiceForm(!showServiceForm);
  };

  //Criação de serviços
  //Criação de serviços
  const createService = async (project) => {
    setMessage("");
    //Ultimo serviço
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //Validação do valor máximo
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }
    //Adicionar o custo do serviço para o custo total
    project.cost = newCost;

    // Atualizar o restante do orçamento
    const remainingBudget = parseFloat(project.budget) - newCost;
    setRemainingBudget(remainingBudget);

    //Atualização do projeto
    await fetch(`https://cost-server-kappa.vercel.app/projects/${project.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        //Exibição dos serviços
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  };

  //Remoção de serviços
  const removeService = async (id, cost) => {
    setDeleteMessage("");
    let newServices = [...services];

    newServices = newServices.filter((service) => service.id !== id);

    let newProject = { ...project };

    newProject.services = newServices;

    newProject.cost = parseFloat(newProject.cost) - parseFloat(cost);

    await fetch(
      `https://cost-server-kappa.vercel.app/projects/${newProject.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setProject(newProject);
        setServices(newServices);
        setType("success");
        setMessage("Serviço removido com sucesso!");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const totalCost = services.reduce(
      (total, service) => total + parseFloat(service.cost),
      0
    );
    const budgetLeft = parseFloat(project.budget) - totalCost;
    setRemainingBudget(budgetLeft);
  }, [services, project]);

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectFrom}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento Inicial: </span>R${" "}
                    {parseFloat(project.budget).toLocaleString("pt-BR")}
                  </p>
                  <p>
                    <span>Orçamento Utilizado: </span>R${" "}
                    {project.cost.toLocaleString("pt-BR")}
                  </p>
                  <p>
                    <span>Orçamento Atual: </span>R${" "}
                    {remainingBudget.toLocaleString("pt-BR")}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectFrom
                    handleSubmit={editPost}
                    btnText="Salvar"
                    projectData={project}
                  />
                </div>
              )}
            </div>

            {/* //Formulario de serviços */}
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço: </h2>
              <button className={styles.btn} onClick={toggleServiceFrom}>
                {!showServiceForm ? "Adicionar" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Salvar"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Search filter={filter} setFilter={setFilter} />

            <Container customClass="start">
              {message && <Message type={type} msg={deleteMessage} />}
              {services.length > 0 &&
                services
                  .filter(
                    (service) =>
                      service.name
                        .toLowerCase()
                        .includes(filter.toLowerCase()) || filter === ""
                  )
                  .map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))}
              {services.length === 0 && <p>Não há serviços</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
