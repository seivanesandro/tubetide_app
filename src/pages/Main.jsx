import React, {
    useEffect,
    useState
} from 'react';
// import PropTypes from 'prop-types'
//import Youtube from '../fetchApi/Youtube';

import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../utils/constantes';
import {
    getVideoDetails,
    getPopularVideos,
    searchVideos
} from '../fetchApi/ServiceYoutube';

// Comomponents commons
import Loading from '../components/common/load/Loading';
import ErrorCompoment from '../components/common/error/ErrorComponent';
import VideoDetails from '../components/video/VideoDetails';
import VideoList from '../components/video/VideoList';

const Show = keyframes`
    0%{
        opacity:0;
    }
    50%{
        opacity:0.5;
    }

    100%{
        opacity:1;
    }
`;

const ContainerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15rem;

    @media only screen and (${devices.mobileG}) {
        margin: 5rem 1rem;
    }

    @media only screen and (${devices.tablet}) {
        margin: 8rem 2rem;
    }

    @media only screen and (max-width: 600px) {
        margin: 5rem 1rem;
    }
`;

const ContainerError = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15rem;

    @media only screen and (${devices.mobileG}) {
        margin: 5rem 1rem;
    }

    @media only screen and (${devices.tablet}) {
        margin: 8rem 2rem;
    }

    @media only screen and (max-width: 600px) {
        margin: 5rem 1rem;
    }
`;

const StyleMain = styled.div`
    background: var(--bg-color);
    min-height: 90vh !important;
    padding: 5rem 5rem 0 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2rem;
    animation: ${Show} 1s ease-in;

    @media only screen and (${devices.portatilS}) {
        padding: 2rem !important;
    }
    @media only screen and (${devices.portatil}) {
        padding: 2rem !important;
    }

    @media only screen and (${devices.tablet}) {
        flex-direction: column !important;
        padding: 0.9rem !important;
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column !important;
        padding: 0.7rem !important;
    }

    @media only screen and (max-width: 500px) {
        flex-direction: column !important;
        padding: 0.7rem !important;
    }

    @media only screen and (${devices.iphone14}) {
        flex-direction: column !important;
        padding: 0.7rem !important;
    }
    @media only screen and (${devices.mobileG}) {
        flex-direction: column !important;
        padding: 0.7rem !important;
    }
`;

const LeftCol = styled.div`
    flex: 0.7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0.8rem 0.1rem 0.8rem;

    @media only screen and (${devices.tablet}) {
        flex: 2;
    }
`;

// Right col
const RightCol = styled.div`
    flex: 0.4;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
    background: var(--dark-color);

    overflow: scroll;

    overflow-x: hidden;
    height: 80vh;
    overflow-y: scroll;
`;

const WatchLaterTitle = styled.h5`
    color: var(--white-color);
    margin-bottom: 1rem;
    text-align: left;
`;

const Main = ({ searchQuery }) => {
    // Estados para armazenar videos populares (watch later)
    const [
        watchLaterVideos,
        setWatchLaterVideos
    ] = useState([]);
    // estado para armazenar o video principal atual
    const [currentVideo, setCurrentVideo] =
        useState(null);

    // estado para controlar o loading
    const [loading, setLoading] = useState(true);

    // estado para controlar erros
    const [error, setError] = useState(null);

    // Adicionar este estado para manter a última pesquisa
    const [lastSearchTerm, setLastSearchTerm] =
        useState('');

    // IMPLEMENTAÇÃO NOVA: Função simplificada para garantir persistência após refresh
    useEffect(() => {
        const loadStateAfterRefresh =
            async () => {
                try {
                    setLoading(true);
                    console.log(
                        'Iniciando carregamento de estado após refresh'
                    );

                    // 1. Tentar carregar o vídeo salvo
                    const savedVideoJSON =
                        localStorage.getItem(
                            'currentVideoDetails'
                        );
                    let videoLoaded = false;

                    if (savedVideoJSON) {
                        try {
                            const savedVideo =
                                JSON.parse(
                                    savedVideoJSON
                                );
                            setCurrentVideo(
                                savedVideo
                            );
                            videoLoaded = true;
                            console.log(
                                'Vídeo carregado do localStorage:',
                                savedVideo.id
                            );
                        } catch (e) {
                            console.error(
                                'Erro ao carregar vídeo:',
                                e
                            );
                        }
                    }

                    // 2. Tentar carregar a lista de vídeos salva
                    const savedVideosJSON =
                        localStorage.getItem(
                            'watchLaterVideos'
                        );
                    let videosLoaded = false;

                    if (savedVideosJSON) {
                        try {
                            const savedVideos =
                                JSON.parse(
                                    savedVideosJSON
                                );
                            if (
                                savedVideos &&
                                savedVideos.length >
                                    0
                            ) {
                                setWatchLaterVideos(
                                    savedVideos
                                );
                                videosLoaded = true;
                                console.log(
                                    'Lista de vídeos carregada com sucesso:',
                                    savedVideos.length
                                );
                            }
                        } catch (e) {
                            console.error(
                                'Erro ao carregar lista de vídeos:',
                                e
                            );
                        }
                    }

                    // 3. Tentar carregar o termo de pesquisa
                    const savedSearch =
                        localStorage.getItem(
                            'lastSearchQuery'
                        );
                    if (savedSearch) {
                        setLastSearchTerm(
                            savedSearch
                        );
                        console.log(
                            'Termo de pesquisa carregado:',
                            savedSearch
                        );
                    }

                    // 4. Se não foi possível carregar do localStorage, carrega vídeos populares (somente primeira visita)
                    if (!videosLoaded) {
                        console.log(
                            'Carregando vídeos populares (primeira visita)'
                        );
                        const videos =
                            await getPopularVideos(
                                15
                            );
                        setWatchLaterVideos(
                            videos
                        );
                        localStorage.setItem(
                            'watchLaterVideos',
                            JSON.stringify(videos)
                        );

                        // Se não carregou vídeo, usar o primeiro dos populares
                        if (
                            !videoLoaded &&
                            videos &&
                            videos.length > 0
                        ) {
                            try {
                                const firstVideoId =
                                    getVideoIdFromResult(
                                        videos[0]
                                    );
                                if (
                                    firstVideoId
                                ) {
                                    const videoDetails =
                                        await getVideoDetails(
                                            firstVideoId
                                        );
                                    setCurrentVideo(
                                        videoDetails
                                    );
                                    localStorage.setItem(
                                        'currentVideoDetails',
                                        JSON.stringify(
                                            videoDetails
                                        )
                                    );
                                }
                            } catch (e) {
                                console.error(
                                    'Erro ao carregar primeiro vídeo:',
                                    e
                                );
                            }
                        }
                    }

                    setLoading(false);
                } catch (error) {
                    console.error(
                        'Erro ao carregar estado:',
                        error
                    );
                    setError(
                        'Falha ao carregar dados. Por favor, tente novamente mais tarde.'
                    );
                    setLoading(false);
                }
            };

        loadStateAfterRefresh();

        // Este efeito só deve executar uma vez ao montar o componente
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect para lidar com pesquisas
    useEffect(() => {
        const handleSearch = async () => {
            // CORREÇÃO CRÍTICA: Só executa se houver searchQuery OU se brandClicked for true
            // Isso evita executar no refresh normal da página
            const brandClicked =
                sessionStorage.getItem(
                    'brandClicked'
                ) === 'true';

            // Se não há searchQuery E não clicou no brand, NÃO FAZ NADA (mantém localStorage)
            if (!searchQuery && !brandClicked) {
                console.log(
                    'Sem ação necessária - mantendo estado atual'
                );
                return;
            }

            if (
                !searchQuery ||
                (searchQuery.trim() === '' &&
                    brandClicked)
            ) {
                try {
                    setLoading(true);
                    // Limpar o sessionStorage após uso
                    sessionStorage.removeItem(
                        'brandClicked'
                    );

                    // Limpar currentVideoId e lastSearchQuery do localStorage
                    localStorage.removeItem(
                        'currentVideoId'
                    );

                    // NOVA ALTERAÇÃO: Limpar a pesquisa salva quando clica no brand
                    localStorage.removeItem(
                        'lastSearchQuery'
                    );
                    setLastSearchTerm('');

                    // obter videos populares
                    const videos =
                        await getPopularVideos(
                            15
                        );
                    setWatchLaterVideos(videos);

                    //  Salvar os vídeos populares no localStorage para persistir após refresh
                    localStorage.setItem(
                        'watchLaterVideos',
                        JSON.stringify(videos)
                    );

                    // IMPORTANTE: Sempre carregar o primeiro vídeo após clicar no brand
                    if (videos.length > 0) {
                        const videoDetails =
                            await getVideoDetails(
                                videos[0].id
                            );
                        setCurrentVideo(
                            videoDetails
                        );

                        // Salvar o novo estado no localStorage
                        localStorage.setItem(
                            'currentVideoDetails',
                            JSON.stringify(
                                videoDetails
                            )
                        );
                        localStorage.setItem(
                            'currentVideoId',
                            videoDetails.id
                        );
                    }

                    setLoading(false);
                } catch (error) {
                    console.log(
                        'Failed to fetch videos. Please try again later.'
                    );
                    setError(error.message);
                    setLoading(false);
                }
                return;
            }

            // NOVA ALTERAÇÃO: Salvar a pesquisa atual no localStorage
            if (
                searchQuery &&
                searchQuery.trim() !== ''
            ) {
                localStorage.setItem(
                    'lastSearchQuery',
                    searchQuery
                );
                setLastSearchTerm(searchQuery);
            } else {
                // Se não tiver query nova, usar a salva (para manter persistência)
                const savedSearch =
                    localStorage.getItem(
                        'lastSearchQuery'
                    );
                if (savedSearch) {
                    setLastSearchTerm(
                        savedSearch
                    );
                }
            }

            // Código para pesquisa
            try {
                setLoading(true);
                console.log(
                    'Searching for:',
                    searchQuery
                );

                // Buscar vídeos relacionados à pesquisa
                const searchResults =
                    await searchVideos(
                        searchQuery
                    );
                console.log(
                    'Search results:',
                    searchResults
                );

                if (
                    searchResults &&
                    searchResults.length > 0
                ) {
                    // Atualizar a lista de vídeos com os resultados da pesquisa
                    setWatchLaterVideos(
                        searchResults
                    );

                    // SOLUÇÃO: Salvar os resultados de pesquisa no localStorage para persistir após refresh
                    localStorage.setItem(
                        'watchLaterVideos',
                        JSON.stringify(
                            searchResults
                        )
                    );

                    // Corrigindo a extração do ID do vídeo
                    const firstVideoId =
                        getVideoIdFromResult(
                            searchResults[0]
                        );

                    if (firstVideoId) {
                        try {
                            // Definir o primeiro resultado como o vídeo atual
                            const videoDetails =
                                await getVideoDetails(
                                    firstVideoId
                                );
                            setCurrentVideo(
                                videoDetails
                            );

                            // CRÍTICO: Salvar TODOS os dados no localStorage para persistir após refresh
                            localStorage.setItem(
                                'currentVideoId',
                                videoDetails.id
                            );
                            localStorage.setItem(
                                'currentVideoDetails',
                                JSON.stringify(
                                    videoDetails
                                )
                            );
                        } catch (detailsError) {
                            console.error(
                                'Error fetching video details:',
                                detailsError
                            );
                            // Fallback: usar as informações básicas do vídeo
                            setCurrentVideo(
                                searchResults[0]
                            );
                        }
                    } else {
                        setError(
                            'Invalid video ID from search results'
                        );
                    }
                } else {
                    setError(
                        'No videos found for this search query'
                    );
                }

                setLoading(false);
            } catch (error) {
                console.error(
                    'Search error:',
                    error
                );
                setError(
                    'Failed to search videos. Please try again.'
                );
                setLoading(false);
            }
        };

        handleSearch();
    }, [searchQuery]);

    // Funçao para extrair o ID do video de diferentes formatos de resposta
    const getVideoIdFromResult = videoResult => {
        // Verificar se o ID está na estrutura aninhada (comum para resultados de pesquisa)
        if (
            videoResult.id &&
            videoResult.id.videoId
        ) {
            console.log(
                'Found videoId in id.videoId:',
                videoResult.id.videoId
            );
            return videoResult.id.videoId;
        }

        // Verificar se o ID está diretamente disponível (comum para vídeos populares)
        if (
            videoResult.id &&
            typeof videoResult.id === 'string'
        ) {
            console.log(
                'Found direct id:',
                videoResult.id
            );
            return videoResult.id;
        }

        // Para outros formatos de resposta que podem surgir
        if (
            videoResult.snippet &&
            videoResult.snippet.resourceId &&
            videoResult.snippet.resourceId.videoId
        ) {
            console.log(
                'Found videoId in snippet.resourceId:',
                videoResult.snippet.resourceId
                    .videoId
            );
            return videoResult.snippet.resourceId
                .videoId;
        }

        console.error(
            'Could not extract video ID from:',
            videoResult
        );
        return null;
    };

    // funçao para definir um novo video como o video atual
    const handleSelectVideo = async videoId => {
        try {
            setLoading(true);

            // Salvar o ID do vídeo selecionado no localStorage
            localStorage.setItem(
                'currentVideoId',
                videoId
            );

            const videoDetails =
                await getVideoDetails(videoId);
            setCurrentVideo(videoDetails);

            // IMPORTANTE: Salvar também o vídeo atual completo no localStorage
            // para garantir que ele persista exatamente igual após o refresh
            try {
                localStorage.setItem(
                    'currentVideoDetails',
                    JSON.stringify(videoDetails)
                );

                // MUITO IMPORTANTE: Salvar também a lista de vídeos atual
                // para garantir que ela persista exatamente igual após o refresh
                localStorage.setItem(
                    'watchLaterVideos',
                    JSON.stringify(
                        watchLaterVideos
                    )
                );
            } catch (err) {
                console.error(
                    'Erro ao salvar estado:',
                    err
                );
            }

            setLoading(false);
        } catch (error) {
            console.log(
                'Failed to fetch video details. Please try again later.'
            );
            setError(error.message);
            setLoading(false);
        }
    };

    // funçao para compartilhar o video atual
    const handleShareVideo = videoId => {
        const shareUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (navigator.share) {
            navigator
                .share({
                    title: currentVideo.snippet
                        ?.title,
                    text: 'Confira este vídeo!',
                    url: shareUrl
                })
                .catch(error =>
                    console.log(
                        'Erro ao compartilhar:',
                        error
                    )
                );
        } else {
            // Fallback - copiar para área de transferência
            navigator.clipboard
                .writeText(shareUrl)
                .then(() =>
                    alert(
                        'Link copiado para a área de transferência!'
                    )
                )
                .catch(err =>
                    console.error(
                        'Erro ao copiar link:',
                        err
                    )
                );
        }
    };

    // Funçao para formatar a duraçao do video
    const formatDuration = duration => {
        // A duraçao vem no formato ISO 8601, ex: PT1H2M10S

        if (!duration) return '0:00';

        let match = duration.match(
            /PT(\d+H)?(\d+M)?(\d+S)?/
        );

        if (!match) return '0:00';

        let hours = (match[1] || '').replace(
            'H',
            ''
        );
        let minutes = (match[2] || '').replace(
            'M',
            ''
        );
        let seconds = (match[3] || '').replace(
            'S',
            ''
        );

        // preencher com zerosa a esquerda
        if (hours) {
            hours = hours.padStart(2, '0');
        }
        minutes =
            minutes.padStart(2, '0') || '00';
        seconds =
            seconds.padStart(2, '0') || '00';

        return hours
            ? `${hours}:${minutes}:${seconds}`
            : `${minutes}:${seconds}`;
    };

    // funçao para o loading
    if (loading) {
        return (
            <>
                <ContainerLoading className="container-loading">
                    <Loading
                        $speedborder="0.7"
                        $fontsize="8"
                        $size="1"
                    />
                </ContainerLoading>
            </>
        );
    }

    if (error) {
        return (
            <>
                <ContainerError className="container-error">
                    <ErrorCompoment
                        errmessage={error}
                    />
                </ContainerError>
            </>
        );
    }

    return (
        <>
            <StyleMain className="style-main">
                <LeftCol className="leftCol">
                    {currentVideo && (
                        <>
                            <VideoDetails
                                video={
                                    currentVideo
                                }
                                onShareVideo={
                                    handleShareVideo
                                }
                            />
                        </>
                    )}
                </LeftCol>

                <RightCol className="rightCol">
                    <WatchLaterTitle className="watch-later-title">
                        {searchQuery ||
                        lastSearchTerm
                            ? `Search results for: ${searchQuery || lastSearchTerm}`
                            : 'Watch Later'}
                    </WatchLaterTitle>

                    {watchLaterVideos.map(
                        video => {
                            const videoId =
                                video.id
                                    ?.videoId ||
                                video.id;
                            return (
                                <VideoList
                                    key={videoId}
                                    video={video}
                                    onVideoSelect={
                                        handleSelectVideo
                                    }
                                    formatDuration={
                                        formatDuration
                                    }
                                />
                            );
                        }
                    )}
                </RightCol>
            </StyleMain>
        </>
    );
};

Main.propTypes = {};

export default Main;
