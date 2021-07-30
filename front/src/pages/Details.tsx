import React, {useState, useEffect} from 'react'
import { Badge, Button, Card } from 'react-bootstrap';
import {useHistory, useParams } from 'react-router-dom';
import api from '../services/api';

interface IParams {
    id: string;
}

interface ITasks {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

export function Details () {


    const history = useHistory()
    const { id } = useParams<IParams>()
    const [task, setTask] = useState<ITasks>()

    async function findTask() {
        const response = await api.get<ITasks>(`tasks/${id}`)
        setTask(response.data)
    }

    function backTasks() {
        history.goBack()
    }

    useEffect(() => {
        findTask()
    }, [id])

    return (
        <>
        <div className="container">
                <div className="task-header">
                    <h1>Detalhes da Tarefa</h1>
                    <Button size="sm" variant="dark" onClick={backTasks}>Voltar</Button>
                </div>
                <div className="container">
                    <Card>
                        <Card.Body>
                            <Card.Title>{ task ?.title }</Card.Title>
                            <Card.Text>{ task ?.description }
                            <br />
                            <Badge variant={task ?.status ? "success" : "warning"}>
                            {task ?.status ? "FINALIZADO" : "PENDENTE"}
                            </Badge>
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}