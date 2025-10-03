import React from 'react';
import Main from './pages/Main';
import styled from 'styled-components';
import { devices } from './utils/constantes';

const AppStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
    padding: 2rem;

    @media only screen and (${devices.tablet}) {
        padding: 1rem;
    }
`;

function App() {
    return (
        <AppStyle className="App">
            <h1>tubetide_app</h1>
            <Main />
        </AppStyle>
    );
}

export default App;
