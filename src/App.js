import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import NewProject from './components/pages/NewProject';
import Company from './components/pages/Company';

import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/contact" element={<Contato/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
