import React, { useState } from 'react';
import {
    Link,
    useLocation,
    //useNavigate
} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../images/logo.png';
import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';
import { IoHomeSharp } from 'react-icons/io5';

const ImgStyle = styled.img`
    width: 130px;
    height: auto;
`;

function OffcanvasExample({
    user,
    onLogout,
    onClearHistory
}) {
    const [searchTerm, setSearchTerm] =
        useState('');
    const location = useLocation();
    //const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // Navegação simples sem busca global
        if (searchTerm.trim()) {
            if (location.pathname === '/') {
                // Se estamos na Main, procurar vídeos no Main
                const mainElement =
                    document.querySelector(
                        '[data-main-search]'
                    );
                if (mainElement) {
                    const event = new CustomEvent(
                        'mainSearch',
                        { detail: searchTerm }
                    );
                    window.dispatchEvent(event);
                }
            } else if (
                location.pathname ===
                '/most-viewed'
            ) {
                // Se estamos na MostViewedPage, procurar lá
                const mvElement =
                    document.querySelector(
                        '[data-mv-search]'
                    );
                if (mvElement) {
                    const event = new CustomEvent(
                        'mvSearch',
                        { detail: searchTerm }
                    );
                    window.dispatchEvent(event);
                }
            }
        }
    };

    // Adicione esta função que estava faltando
    const handleClearAndReset = e => {
        e.preventDefault();
        setSearchTerm('');
        if (onClearHistory) {
            onClearHistory();
        }
        // recharge the page to reset any state
        window.location.reload();
    };

    return (
        <>
            {['xl'].map(expand => (
                <Navbar
                    key={expand}
                    expand={expand}
                    data-bs-theme="dark"
                    className="bg-dark  mb-3"
                    style={{
                        background:
                            'linear-gradient(to bottom, #3fbbf3 20%, #095074ff 85%)'
                    }}
                >
                    <Container
                        fluid
                        style={{
                            marginTop: '0.3rem',
                            marginBottom: '0.3rem'
                        }}
                    >
                        <Navbar.Brand
                            href="#"
                            className="ms-5"
                            onClick={
                                handleClearAndReset
                            }
                            title="Click to clear search history"
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <ImgStyle
                                src={logo}
                                alt="logo"
                                style={{
                                    maxWidth:
                                        '100%',
                                    width: '100px',
                                    height: '90px'
                                }}
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            style={{
                                outline: 'none',
                                border: 'none',
                                boxShadow: 'none',
                                color: '#fff'
                            }}
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{
                                background:
                                    '#000000',
                                opacity: 0.7
                            }}
                        >
                            <Offcanvas.Header
                                closeButton
                                className="text-light m-5"
                            ></Offcanvas.Header>

                            <Offcanvas.Body>
                                <Form
                                    className="form-style d-flex justify-content-end flex-grow-1"
                                    onSubmit={
                                        handleSubmit
                                    }
                                >
                                    <Form.Control
                                        type="search"
                                        placeholder="Search for video..."
                                        className="form-search me-2"
                                        aria-label="Search"
                                        value={
                                            searchTerm
                                        }
                                        onChange={e =>
                                            setSearchTerm(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                    />
                                    <Button
                                        className="search-btn-style"
                                        variant="outline-light"
                                        type="submit"
                                    >
                                        Search
                                    </Button>
                                </Form>
                                <Nav className="navbar-nav mb-3 mx-5 align-items-end">
                                    <Nav.Link
                                        as={Link}
                                        to="/"
                                    >
                                        <IoHomeSharp size={30}/>
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/most-viewed"
                                    >
                                        Most
                                        Viewed
                                    </Nav.Link>
                                </Nav>

                                {user && (
                                    <Nav className="justify-content-start flex-grow-1">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={
                                                    user.picture
                                                }
                                                alt={
                                                    user.name
                                                }
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius:
                                                        '50%',
                                                    marginRight:
                                                        '5px'
                                                }}
                                            />
                                            <span
                                                style={{
                                                    color: 'white',
                                                    marginRight:
                                                        '15px'
                                                }}
                                            >
                                                {
                                                    user.name
                                                }
                                            </span>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={
                                                    onLogout
                                                }
                                            >
                                                <IoMdLogOut size="28" />
                                            </Button>
                                        </div>
                                    </Nav>
                                )}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default OffcanvasExample;
