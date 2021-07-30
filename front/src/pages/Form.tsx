import React, {useState, useEffect, ChangeEvent} from 'react';
import {Button, Dropdown, Form} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import api from '../services/api';
import '../styles/styles.css'

interface IForm {
    id: any;
    title: string;
    description: string;
    status: string;
}

interface IParams {
    id: string;
}

export function FormTask() {

    const history = useHistory()
    const {id} = useParams<IParams>()
    const [model, setModel] = useState<IForm>({
        id: '',
        title: '',
        description: '',
        status: ''
    })

    function updateModel(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            model.id = id
            const response = await api.put(`/task/${id}`, model)
        } else {

            const response = await api.post('/task', model)
        }

        backTasks()
    }

    async function findTask(id: string) {
        const response = await api.get(`tasks/${id}`)
        setModel({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            status: response.data.status
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            findTask(id)
        }
    }, [id])

    function backTasks() {
        history.goBack()
    }

    return (
        <>
            <div className="container">
                <div className="task-header">
                    <h1>Nova Tarefas</h1>
                    <Button size="sm" variant="dark" onClick={backTasks}>Voltar</Button>
                </div>
                <div className="container">
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={model.title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={model.description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateModel(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )

}