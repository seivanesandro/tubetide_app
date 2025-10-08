import React from 'react';
// import PropTypes from 'prop-types'

import styled from 'styled-components';
import { devices } from '../utils/constantes';

// Comomponents commons
//import Loading from '../components/common/load/Loading';
//import ErrorCompoment from '../components/common/error/ErrorComponent';
//import MyButton from '../components/common/button/MyButton';
//import MyInput from '../components/common/input/MyInput';
//import { FaSearch, FaEnvelope } from 'react-icons/fa';

const StyleMain = styled.div`
    background: var(--black-color);
    min-height: 90vh !important;
    padding: 5rem;
    border-radius: 1.5rem;
    display: flex;
    gap: 2rem;

    @media only screen and (${devices.portatilS}) {
        padding: 2rem !important;
    }
    @media only screen and (${devices.portatil}) {
        padding: 2rem !important;
    }

    @media only screen and (${devices.tablet}) {
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
    gap: 1.5rem;

    @media only screen and (${devices.tablet}) {
        flex: 2;
    }
`;

const ShareButton = styled.button``;
const ContainerVideo = styled.div``;
const IframeVideo = styled.iframe``;
const ContainerDescriptionVideo = styled.div``;
const TitleVideo = styled.strong``;
const ContianerIcons = styled.div``;

// Right col
const RightCol = styled.div`
    flex: 0.7;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    background: var(--dark-color);
`;

const WatchLaterTitle = styled.h5``;

const WatchLaterListContainer = styled.div``;
const WatchLaterThumb = styled.img``;
const ListVideoContainer = styled.div``;
const VideoTitle = styled.div``;
const VideoSubtitle = styled.div``;
const VideoDuration = styled.div``;

const Main = props => {
    return (
        <>
            <StyleMain className="main-container">
                <LeftCol className="leftCol">
                    {/*FIXME: maybe must to be delete */}
                    <ShareButton className="share-button">
                        share buton
                    </ShareButton>

                    <ContainerVideo
                        style={{
                            background: '#000',
                            borderRadius: '1rem',
                            overflow: 'hidden'
                        }}
                        className="container-video"
                    >
                        {/* Video embed */}
                        <IframeVideo
                            width="60%"
                            height="380"
                            src="https://www.youtube.com/embed/your_video_id"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="iframe-video"
                        ></IframeVideo>
                    </ContainerVideo>

                    <ContainerDescriptionVideo
                        style={{
                            color: '#fff',
                            marginTop: '1rem',
                            textAlign: 'left'
                        }}
                        className="container-description-video"
                    >
                        <TitleVideo className="title-video">
                            The Avengers - "I'm
                            Always Angry" - Hulk
                            SMASH
                        </TitleVideo>

                        <ContainerDescriptionVideo
                            style={{
                                marginTop:
                                    '0.5rem',
                                fontSize:
                                    '0.95rem',
                                color: '#aaa'
                            }}
                            className="container-description-video"
                        >
                            SMASH Scene - Movie
                            CLIP HD
                        </ContainerDescriptionVideo>

                        <ContianerIcons className="contianer-icons">
                            {/* Social icons */}
                            <span
                                style={{
                                    margin: '0 8px'
                                }}
                            >
                                🎧
                            </span>
                            <span
                                style={{
                                    margin: '0 8px'
                                }}
                            >
                                🐦
                            </span>
                            <span
                                style={{
                                    margin: '0 8px'
                                }}
                            >
                                💬
                            </span>
                            <span
                                style={{
                                    margin: '0 8px'
                                }}
                            >
                                🔗
                            </span>
                        </ContianerIcons>
                    </ContainerDescriptionVideo>
                </LeftCol>
                <RightCol className="rightCol">
                    <WatchLaterTitle
                        style={{
                            color: '#fff',
                            marginBottom: '1rem'
                        }}
                        className="watch-later-title"
                    >
                        Watch Later
                    </WatchLaterTitle>

                    <WatchLaterListContainer className="watch-later-list-container">
                        <WatchLaterThumb
                            src="/thumb1.jpg"
                            alt="thumb"
                            style={{
                                width: 70,
                                borderRadius:
                                    '0.5rem'
                            }}
                            className="watch-later-thumb"
                        />
                        <ListVideoContainer className="list-video-container">
                            <VideoTitle
                                style={{
                                    color: '#fff',
                                    fontWeight:
                                        'bold'
                                }}
                                className="video-title"
                            >
                                The Avengers -
                                Hulk SMASH
                            </VideoTitle>
                            <VideoSubtitle
                                style={{
                                    color: '#aaa',
                                    fontSize:
                                        '0.9rem'
                                }}
                                className="video-subtitle"
                            >
                                Scene - Movie CLIP
                                HD
                            </VideoSubtitle>
                            <VideoDuration
                                style={{
                                    color: '#888',
                                    fontSize:
                                        '0.8rem'
                                }}
                                className="video-duration"
                            >
                                22:33
                            </VideoDuration>
                        </ListVideoContainer>
                    </WatchLaterListContainer>

                    <WatchLaterListContainer className="watch-later-list-container">
                        <WatchLaterThumb
                            src="/thumb1.jpg"
                            alt="thumb"
                            style={{
                                width: 70,
                                borderRadius:
                                    '0.5rem'
                            }}
                            className="watch-later-thumb"
                        />
                        <ListVideoContainer className="list-video-container">
                            <VideoTitle
                                style={{
                                    color: '#fff',
                                    fontWeight:
                                        'bold'
                                }}
                                className="video-title"
                            >
                                The Avengers -
                                Hulk SMASH
                            </VideoTitle>
                            <VideoSubtitle
                                style={{
                                    color: '#aaa',
                                    fontSize:
                                        '0.9rem'
                                }}
                                className="video-subtitle"
                            >
                                Scene - Movie CLIP
                                HD
                            </VideoSubtitle>
                            <VideoDuration
                                style={{
                                    color: '#888',
                                    fontSize:
                                        '0.8rem'
                                }}
                                className="video-duration"
                            >
                                22:33
                            </VideoDuration>
                        </ListVideoContainer>
                    </WatchLaterListContainer>

                    <WatchLaterListContainer className="watch-later-list-container">
                        <WatchLaterThumb
                            src="/thumb1.jpg"
                            alt="thumb"
                            style={{
                                width: 70,
                                borderRadius:
                                    '0.5rem'
                            }}
                            className="watch-later-thumb"
                        />
                        <ListVideoContainer className="list-video-container">
                            <VideoTitle
                                style={{
                                    color: '#fff',
                                    fontWeight:
                                        'bold'
                                }}
                                className="video-title"
                            >
                                The Avengers -
                                Hulk SMASH
                            </VideoTitle>
                            <VideoSubtitle
                                style={{
                                    color: '#aaa',
                                    fontSize:
                                        '0.9rem'
                                }}
                                className="video-subtitle"
                            >
                                Scene - Movie CLIP
                                HD
                            </VideoSubtitle>
                            <VideoDuration
                                style={{
                                    color: '#888',
                                    fontSize:
                                        '0.8rem'
                                }}
                                className="video-duration"
                            >
                                22:33
                            </VideoDuration>
                        </ListVideoContainer>
                    </WatchLaterListContainer>

                    <WatchLaterListContainer className="watch-later-list-container">
                        <WatchLaterThumb
                            src="/thumb1.jpg"
                            alt="thumb"
                            style={{
                                width: 70,
                                borderRadius:
                                    '0.5rem'
                            }}
                            className="watch-later-thumb"
                        />
                        <ListVideoContainer className="list-video-container">
                            <VideoTitle
                                style={{
                                    color: '#fff',
                                    fontWeight:
                                        'bold'
                                }}
                                className="video-title"
                            >
                                The Avengers -
                                Hulk SMASH
                            </VideoTitle>
                            <VideoSubtitle
                                style={{
                                    color: '#aaa',
                                    fontSize:
                                        '0.9rem'
                                }}
                                className="video-subtitle"
                            >
                                Scene - Movie CLIP
                                HD
                            </VideoSubtitle>
                            <VideoDuration
                                style={{
                                    color: '#888',
                                    fontSize:
                                        '0.8rem'
                                }}
                                className="video-duration"
                            >
                                22:33
                            </VideoDuration>
                        </ListVideoContainer>
                    </WatchLaterListContainer>
                </RightCol>
            </StyleMain>
        </>
    );
};

Main.propTypes = {};

export default Main;
