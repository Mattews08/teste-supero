import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'

export function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>Supero Tasks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item className="nav-link" as={Link} to="/">Início</Nav.Item>
                        <Nav.Item className="nav-link" as={Link} to="/tarefas">Tarefas</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}