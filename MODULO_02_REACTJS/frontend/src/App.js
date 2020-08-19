import React, {useState, useEffect} from 'react';
import api from './services/api'
import './App.css';
import Header from './components/Header'


/**
 TRÊS CONCEITOS MAIS IMPORTANTES DO REACT:

 COMPONENTE
 PROPRIEDADE
 ESTADO
 */


//useState retorna um array com duas posições
// 1. Variável com seu valor inicial
// 2. Função para atualizarmos esse valor

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])


  async function handleAddProject() {
    //setProjects([...projects, `Novo projeto - ${Date.now()}`])

    const response = await api.post('projects', {
      title: `Novo projeto - ${Date.now()}`,
      owner: "Rodrigo Bergamin"
    })
    
    const project = response.data;
    
    setProjects([...projects, project])
  }

  return (
    <div>
      <Header title="Projects">

        <ul>
          {projects.map((project, index) => {
            return (
              <li key={index}>{project.title}</li>
            )
          })}
        </ul>

          <button type="button" onClick={handleAddProject}>Add New Project</button>
      </Header>
    </div>
  );
}

export default App;
