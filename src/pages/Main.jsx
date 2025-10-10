import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types'
//import Youtube from '../fetchApi/Youtube';

import styled from 'styled-components';
import { devices } from '../utils/constantes';
import {  getVideoDetails, getPopularVideos } from '../fetchApi/ServiceYoutube';

// Comomponents commons
import Loading from '../components/common/load/Loading';
import ErrorCompoment from '../components/common/error/ErrorComponent';
//import MyButton from '../components/common/button/MyButton';
//import MyInput from '../components/common/input/MyInput';
import { FcBinoculars, FcComments, FcLike, FcShare } from 'react-icons/fc';

// TODO: add animation smooth

const StyleMain = styled.div`
    background: var(--black-color);
    min-height: 90vh !important;
    padding: 5rem 5rem 0 5rem;
    display: flex;

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
    padding: 2rem 0.8rem 2rem 0.8rem;
    gap: 1.5rem;
/*     background: var(--gray-color-secondary);
    height: 100%;  */

    @media only screen and (${devices.tablet}) {
        flex: 2;
    }
`;

const ContainerVideo = styled.div`
    background: var(--dark-color);
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const IframeVideo = styled.iframe`
    width: 100%;
    max-width: 900px;
    aspect-ratio: 16/9;
    box-shadow: 0 0 0.4rem var(--bg-base);

    @media only screen and (${devices.tablet}) {
        height: 300px;
    }

    @media only screen and (${devices.iphone14}) {
        height: 240px;
    }

    @media only screen and (${devices.mobileG}) {
        height: 240px;
    }
`;

const ContainerDescriptionVideo = styled.div`
    color: var(--white-color);
    margin-top: 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    background: var(--gray-color-secondary);
    height: auto;
    padding: 1.5rem;
    box-shadow: 0 0 0.3rem var(--bg-base);

    @media only screen and (${devices.iphone14}) {
        padding: 1rem !important;
    }
`;

const TitleVideo = styled.strong`
    font-size: 1.2rem;
    &.title-video {
        font-weight: bold;
    }
    &.subtitle-video {
        font-size: 0.9rem;
        font-weight: normal;
    }

    @media only screen and (${devices.iphone14}) {
        font-size: 1rem;
        &.subtitle-video {
            font-size: 0.8rem;
        }
    }
    @media only screen and (${devices.mobileG}) {
        font-size: 1rem;
        &.subtitle-video {
            font-size: 0.8rem;
        }
    }
`;
const ContianerIcons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;

    @media only screen and (${devices.iphone14}) {
        gap: 0.6rem;
    }
    @media only screen and (${devices.mobileG}) {
        gap: 0.6rem;
    }
    @media only screen and (${devices.mobileP}) {
        gap: 0.5rem;
    }
`;

const IconSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
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

const WatchLaterListContainer = styled.div`
    cursor: pointer;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
    background: var(--gray-color);
    color: var(--dark-color) !important;
    padding: 0.5rem;
    width: 96%;

    &:hover {
        background: var(--primary-color);
        box-shadow: 0 0 0.5rem var(--white-color);
        font-size: 1.1rem;
    }
`;

const WatchLaterThumb = styled.img``;
const ListVideoContainer = styled.div``;

const VideoTitle = styled.div`
    color: var(--white-color);
    font-weight: bold;
    font-size: 0.9rem;
    text-align: left;
`;

const VideoSubtitle = styled.div`
    color: var(--white-color);
    font-size: 0.8rem;
    text-align: left;
`;
const VideoDuration = styled.div`
color: var(--white-color);
font-size: 0.7rem;
text-align: left;
`;

const Main = () => {

    // Estados para armazenar videos populares (watch later)
    const [watchLaterVideos, setWatchLaterVideos] = useState([]);
    // estado para armazenar o video principal atual
    const [ currentVideo, setCurrentVideo ] = useState(null);

    // estado para controlar o loading
    const [ loading, setLoading ] = useState(false);

    // estado para contro lar erros 
    const [ error, setError ] = useState(null);

    // funçao para carregar videos populares e definir o video atual ao montar o component com useEffect()
    useEffect(()=> {
        const fetchInitialData = async () => {
            try{
                setLoading(true);
                
                // obter videos populares
                const videos = await getPopularVideos(15);
                setWatchLaterVideos(videos);

                //defenir o primeiro video como o video atual
                if(videos.length > 0){
                    const videoDetails = await getVideoDetails(videos[0].id);
                    setCurrentVideo(videoDetails);
                }
                
                setLoading(false);
            } catch(error) {
                console.log("Failed to fetch videos. Please try again later.");
                setError(error.message);
                setLoading(false);
            }
        };
            fetchInitialData();
    },[]);

    // funçao para definir um novo video como o video atual
    const handleSelectVideo = async (videoId) => {
        try{
            setLoading(true);
            const videoDetails = await getVideoDetails(videoId);
            setCurrentVideo(videoDetails);
            setLoading(false);
        }catch(error){
            console.log("Failed to fetch video details. Please try again later.");
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
    const formatDuration = (duration) => {
        // A duraçao vem no formato ISO 8601, ex: PT1H2M10S

        if (!duration) return '0:00';

        let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        if (!match) return '0:00';

        let hours = (match[1] || '').replace('H', '');
        let minutes = (match[2] || '').replace('M', '');
        let seconds = (match[3] || '').replace('S', '');

        // preencher com zerosa a esquerda
        if (hours){
            hours = hours.padStart(2, '0');
        }
        minutes = minutes.padStart(2, '0') || '00';
        seconds = seconds.padStart(2, '0') || '00';

        return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    };

    // funçao para o loading
    if (loading) {
        return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center m-1'> 
                <Loading />
            </div>
        </>
        );
    };

    if (error) {
        return (
            <>
                <div className="d-flex flex-column align-items-center justify-content-center m-1">
                    <ErrorCompoment
                        errmessage={error}
                    />
                </div>
            </>
        );
    };

    return (
        <>
            <StyleMain className="main-container">
                <LeftCol className="leftCol">
                    {currentVideo && (
                        <>
                            <ContainerVideo className="container-video">
                                <IframeVideo
                                    src={`https://www.youtube.com/embed/${currentVideo.id}`}
                                    title={
                                        currentVideo
                                            .snippet
                                            ?.title ||
                                        'YouTube video player'
                                    }
                                    $frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="iframe-video"
                                ></IframeVideo>
                            </ContainerVideo>

                            <ContainerDescriptionVideo className="container-description-video">
                                <TitleVideo className="title-video">
                                    {
                                        currentVideo
                                            .snippet
                                            ?.title
                                    }
                                </TitleVideo>

                                <TitleVideo className="subtitle-video">
                                    {currentVideo.snippet?.description?.slice(
                                        0,
                                        110
                                    )}
                                    ...
                                </TitleVideo>

                                <ContianerIcons className="contianer-icons">
                                    <IconSpan>
                                        {' '}
                                        <FcLike size="20" />{' '}
                                        {currentVideo
                                            .statistics
                                            ?.likeCount ||
                                            0}
                                    </IconSpan>
                                    <IconSpan>
                                        <FcBinoculars size="20" />{' '}
                                        {currentVideo
                                            .statistics
                                            ?.viewCount ||
                                            0}
                                    </IconSpan>
                                    <IconSpan>
                                        <FcComments size="20" />
                                        {currentVideo
                                            .statistics
                                            ?.commentCount ||
                                            0}
                                    </IconSpan>
                                    <IconSpan
                                        title="share video"
                                        style={{
                                            margin: '0 8px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() =>
                                            handleShareVideo(
                                                currentVideo.id
                                            )
                                        }
                                    >
                                        <FcShare size='20'/>
                                    </IconSpan>
                                </ContianerIcons>
                            </ContainerDescriptionVideo>
                        </>
                    )}
                </LeftCol>

                <RightCol className="rightCol">
                    <WatchLaterTitle className="watch-later-title">
                        Watch Later
                    </WatchLaterTitle>

                    {watchLaterVideos.map(
                        video => {
                            const videoId =
                                video.id
                                    ?.videoId ||
                                video.id;
                            return (
                                <WatchLaterListContainer
                                    className="watch-later-list-container"
                                    key={videoId}
                                    onClick={() =>
                                        handleSelectVideo(
                                            videoId
                                        )
                                    }
                                >
                                    <WatchLaterThumb
                                        className="watch-later-thumb"
                                        src={
                                            video
                                                .snippet
                                                ?.thumbnails
                                                ?.default
                                                ?.url
                                        }
                                        onError={e => {
                                            e.target.onerror =
                                                null;
                                            e.target.src =
                                                'https://via.placeholder.com/120x90?text=No+Image';
                                        }}
                                        alt={
                                            video
                                                .snippet
                                                ?.title ||
                                            'Video thumbnail'
                                        }
                                    />
                                    <ListVideoContainer className="list-video-container">
                                        <VideoTitle className="video-title">
                                            {video.snippet?.title?.slice(
                                                0,
                                                100
                                            )}
                                            {video
                                                .snippet
                                                ?.title
                                                ?.length >
                                            100
                                                ? '...'
                                                : ''}
                                        </VideoTitle>
                                        <VideoSubtitle className="video-subtitle">
                                            {
                                                video
                                                    .snippet
                                                    ?.channelTitle
                                            }
                                        </VideoSubtitle>
                                        <VideoDuration className="video-duration">
                                            {formatDuration(
                                                video
                                                    .contentDetails
                                                    ?.duration
                                            )}
                                        </VideoDuration>
                                    </ListVideoContainer>
                                </WatchLaterListContainer>
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
