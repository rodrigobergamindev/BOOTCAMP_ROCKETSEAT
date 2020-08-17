const express = require('express')
const app = express()
const {uuid} = require('uuidv4')
const { response } = require('express')

port = 3333

app.use(express.json())

/**
 MÉTODOS HTTP:

 GET -> Buscar informações do backend
 POST -> Criar uma informação no backend
 PUT/PATCH ->  Alterar um conteúdo no backend
 DELETE -> Deletar uma informação no backend

 */

 /*
    TIPOS DE PARÂMETROS

    Query Params: Filtros e paginação
    Route Params: Identificar recursos na hora de atualizar ou deletar
    Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)

 */

  /*
    MIDDLEWARES

    Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição

 */

 const projects = []

 function logRequests(req,res, next) {

     const { method, url} = req;
     const logLabel = `[${method.toUpperCase()} ${url}]`

     console.log(logLabel)
     
     return next()
 }


 app.use(logRequests)

app.get('/projects', (req, res) => {
    
    const {title} = req.query;

    const results = title ? projects.filter(project => project.title.includes(title))
    : projects;

    return res.json(results)
})

app.post('/projects', logRequests, (req, res) => {
    const {title, owner} = req.body
    
    const project = { id: uuid(), title, owner }

    projects.push(project)

    return res.json(project).status(201)
})

app.put('/projects/:id', (req, res) => {

    const {id} = req.params
    const {title, owner} = req.body

    const projectIndex = projects.findIndex(project => project.id === id)
    console.log(projectIndex)
    if(projectIndex < 0) {
        return res.status(400).json({error: "Project not found"})
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;
    return res.status(200).json(project)
})

app.delete('/projects/:id', (req, res) => {
    const {id} = req.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0) {
        return res.status(400).json({error: "Project not found"})
    }

    const project = {
        id,
        title,
        owner
    }

    projects.splice(projectIndex, 1)
    return res.status(204).send()
})

app.listen(port, () => {
    console.log("Estamos on!")
})