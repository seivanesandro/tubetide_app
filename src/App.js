import { useEffect, useState } from 'react';
import {
    HashRouter as BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from './components/navbar/NavBar';
import Main from './pages/Main';
import MostViewedPage from './pages/MostViewedPage';
import Login from './pages/Login';
import Footer from './components/footer/Footer';
import styled from 'styled-components';

const AppStyle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

// Componente interno que usa o hook useAuth
const AppContent = () => {
    const [user, setUser] = useState(null);

    // estado para armazenar o histórico de pesquisa
    const [searchHistory, setSearchHistory] =
        useState([]);

    const handleClearHistory = () => {
        // Limpa o histórico de pesquisa
        setSearchHistory([]);

        // Limpar cache da MostViewedPage
        localStorage.removeItem(
            'mostViewedVideos'
        );
        localStorage.removeItem(
            'mostViewedQuery'
        );

        // Marca que o usuário clicou no brand para reiniciar a aplicação
        sessionStorage.setItem(
            'brandClicked',
            'true'
        );

        // Limpa os dados salvos para garantir que os vídeos populares serão carregados
        localStorage.removeItem(
            'currentVideoDetails'
        );
        localStorage.removeItem(
            'watchLaterVideos'
        );
        localStorage.removeItem(
            'lastSearchQuery'
        );
    };

    const handleLogin = userData => {
        setUser(userData);
        localStorage.setItem(
            'tubetide_user',
            JSON.stringify(userData)
        );
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('tubetide_user');
    };

    useEffect(() => {
        const savedUser = localStorage.getItem(
            'tubetide_user'
        );
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }, []);

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <BrowserRouter>
            <AppStyle className="App">
                <NavBar
                    user={user}
                    onLogout={handleLogout}
                    onClearHistory={
                        handleClearHistory
                    }
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Main />}
                    />
                    <Route
                        path="/most-viewed"
                        element={
                            <MostViewedPage />
                        }
                    />
                </Routes>
                <ul
                    invisible="true"
                    style={{ display: 'none' }}
                >
                    {searchHistory.map(
                        (item, idx) => (
                            <li key={idx}>
                                {item}
                            </li>
                        )
                    )}
                </ul>
                <Footer name="Sandro Seivane" />
            </AppStyle>
        </BrowserRouter>
    );
};

function App() {
    const GOOGLE_CLIENT_ID =
        process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider
            clientId={GOOGLE_CLIENT_ID}
        >
            <AppContent />
        </GoogleOAuthProvider>
    );
}

export default App;
