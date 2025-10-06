import React from 'react';
import NavBar from './components/navbar/NavBar';
import Main from './pages/Main';
import styled from 'styled-components';

const AppStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;

`;

function App() {
    return (
        <AppStyle className="App">
            <NavBar />
            <h1>tubetide_app</h1>
            <Main />
        </AppStyle>
    );
}

export default App;
