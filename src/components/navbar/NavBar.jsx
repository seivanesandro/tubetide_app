import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../images/logo.png';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { GrLogin } from 'react-icons/gr';
import { IoMdPerson } from 'react-icons/io';

const ImgStyle = styled.img`
    width: 130px;
    height: auto;
`;

function OffcanvasExample() {
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
                                <Form className="form-style d-flex justify-content-end flex-grow-1">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search for video..."
                                        className="form-search me-2"
                                        aria-label="Search"
                                    />
                                    <Button
                                        className="search-btn-style"
                                        variant="outline-light"
                                    >
                                        Search
                                    </Button>
                                </Form>
                                <Nav className="justify-content-start flex-grow-1">
                                    <Nav.Link
                                        href="#action1"
                                        className={({
                                            isActive
                                        }) =>
                                            isActive
                                                ? 'nav-link active'
                                                : 'nav-link'
                                        }
                                    >
                                        <AiOutlineHome
                                            style={{
                                                fontSize:
                                                    '1.8rem'
                                            }}
                                        />
                                    </Nav.Link>
                                    <Nav.Link
                                        href="#action2"
                                        className={({
                                            isActive
                                        }) =>
                                            isActive
                                                ? 'nav-link active'
                                                : 'nav-link'
                                        }
                                    >
                                        <GrLogin
                                            style={{
                                                fontSize:
                                                    '1.7rem'
                                            }}
                                        />
                                    </Nav.Link>
                                    <Nav.Link
                                        href="#action2"
                                        className={({
                                            isActive
                                        }) =>
                                            isActive
                                                ? 'nav-link active'
                                                : 'nav-link'
                                        }
                                    >
                                        <IoMdPerson
                                            style={{
                                                fontSize:
                                                    '1.7rem'
                                            }}
                                        />
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default OffcanvasExample;
