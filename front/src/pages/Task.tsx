import React, {useState, useEffect} from 'react';
import { Button, Table} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import api from '../services/api';
import '../styles/styles.css'
import Badge from 'react-bootstrap/Badge'

interface ITasks {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

export function Task() {

    const history = useHistory()
    const [tasks, setTasks] = useState<ITasks[]>([])

    async function loadTask() {
        const response = await api.get('/tasks')
        setTasks(response.data)
    }

    async function finishedTask(id: number) {
        await api.put(`/taskstatus/${id}`)
        loadTask()
    }

    async function deleteTask(id: number) {
        await api.delete(`/task/${id}`)
        loadTask()
    }

    useEffect(() => {
        loadTask()
    }, [])

    function newTask() {
        history.push('/adicionar_tarefa')
    }

    function editTask(id: number) {
        history.push(`/adicionar_tarefa/${id}`)
    }

    function viewTask(id: number) {
        history.push(`/tarefas/${id}`)
    }

    return (
        <>
            <div className="container">
                <div className="task-header">
                    <h1>Lista de Tarefas</h1>
                    <Button size="sm" variant="dark" onClick={newTask}>Nova Tarefa</Button>
                </div>
                <Table striped bordered hover className="text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(tasks => (
                            <tr key={tasks.id}>
                                <td>{tasks.id}</td>
                                <td>{tasks.title}</td>
                                <td>{tasks.description}</td>
                                <td>
                                    <Badge variant={tasks.status ? "success" : "warning"}>
                                        {tasks.status ? "FINALIZADO" : "PENDENTE"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button size="sm" variant="primary"
                                        disabled={tasks.status}
                                        onClick={() => editTask(tasks.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="success"
                                        disabled={tasks.status}
                                        onClick={() => finishedTask(tasks.id)}>Finalizar</Button>{' '}
                                    <Button size="sm" variant="secondary" 
                                        onClick={() => viewTask(tasks.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger"
                                        onClick={() => deleteTask(tasks.id)}
                                    >Remover</Button>{' '}
                                </td>
                            </tr>

                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </>
    )

}
