import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from './components/navbar/NavBar';
import Main from './pages/Main';
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
    const [searchQuery, setSearchQuery] =
        useState('');

    // estado para armazenar o histórico de pesquisa
    const [searchHistory, setSearchHistory] =
        useState([]);

    const handleSearch = query => {
        setSearchQuery(query);

        // Adicionar a consulta ao histórico
        setSearchHistory(prevHistory => {
            // Evita duplicatas no histórico
            if (!prevHistory.includes(query)) {
                return [...prevHistory, query];
            }
            return prevHistory;
        });
    };

    const handleClearHistory = () => {
        // Limpa o histórico de pesquisa
        setSearchHistory([]);

        // Redefine a consulta atual
        setSearchQuery('');
        
        // IMPORTANTE: Marca que o usuário clicou no brand para reiniciar a aplicação
        sessionStorage.setItem('brandClicked', 'true');
        
        // Limpa os dados salvos para garantir que os vídeos populares serão carregados
        localStorage.removeItem('currentVideoDetails');
        localStorage.removeItem('watchLaterVideos');
        localStorage.removeItem('lastSearchQuery');
        
        console.log("Reiniciando aplicação: clique no brand detectado");
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
                console.error(
                    'Error parsing saved user data:',
                    error
                );
            }
        }
    }, []);

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <AppStyle className="App">
            <NavBar
                onSearch={handleSearch}
                user={user}
                onLogout={handleLogout}
                onClearHistory={
                    handleClearHistory
                }
            />
            <Main searchQuery={searchQuery} />
            <ul
                invisible="true"
                style={{ display: 'none' }}
            >
                {searchHistory.map(
                    (item, idx) => (
                        <li key={idx}>{item}</li>
                    )
                )}
            </ul>
            <Footer name="Sandro Seivane" />
        </AppStyle>
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
