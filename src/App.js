import React from 'react';
import NavBar from './components/navbar/NavBar';
import Main from './pages/Main';
import Footer from './components/footer/Footer';
import styled from 'styled-components';

const AppStyle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

function App() {
    return (
        <AppStyle className="App">
            <NavBar />
            <h1>tubeTide</h1>
            <Main />
            <Footer name="Sandro Seivane" />
        </AppStyle>
    );
}

export default App;
