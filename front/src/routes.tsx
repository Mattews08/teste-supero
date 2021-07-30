import React from 'react';
import {Switch, Route} from 'react-router-dom';

import { Home } from './pages/Home';
import { Task } from './pages/Task';
import { FormTask } from './pages/Form';
import { Details } from './pages/Details'


export function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/tarefas" exact component={Task}/>
            <Route path="/adicionar_tarefa" exact component={FormTask}/>
            <Route path="/adicionar_tarefa/:id" exact component={FormTask}/>
            <Route path="/tarefas/:id" exact component={Details}/>
        </Switch>
    );
}
