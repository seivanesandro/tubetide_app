import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { devices } from '../../utils/constantes';
import { FcBinoculars, FcComments, FcLike, FcShare } from 'react-icons/fc';

const ScaleAnimation = keyframes`
    from {
        transform: scale(0.7);
    }

    to {
        transform: scale(1);
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
    animation: ${ScaleAnimation} 1s ease-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.3s ease-in-out;
    }

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
    margin-top: 0.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    background: var(--gray-color-secondary);
    width: 100%;
    max-width: 900px;
    box-sizing: border-box;
    padding: 1.5rem 2.9rem;
    box-shadow: 0 0 0.3rem var(--bg-base);
    animation: ${ScaleAnimation} 1s ease-out;
    overflow: hidden;

    &:hover {
        background: var(
            --secondary-color-alternative
        );
    }

    @media only screen and (${devices.iphone14}) {
        padding: 1rem !important;
    }
    @media only screen and (${devices.mobileP}) {
        padding: 0.5rem !important;
    }
`;

const TitleVideo = styled.strong`
    font-size: 1.2rem;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    display: block;

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

const VideoDetails = ({
    video,
    onShareVideo
}) => {
    return (
        <>
            <ContainerVideo className="container-video">
                <IframeVideo
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={
                        video.snippet?.title ||
                        'YouTube video player'
                    }
                    $frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="iframe-video shadow"
                ></IframeVideo>
            </ContainerVideo>

            <ContainerDescriptionVideo className="container-description-video shadow">
                <TitleVideo className="title-video">
                    {video.snippet?.title}
                </TitleVideo>

                <TitleVideo className="subtitle-video">
                    {video.snippet?.description?.slice(
                        0,
                        110
                    )}
                    ...
                </TitleVideo>

                <ContianerIcons className="contianer-icons">
                    <IconSpan>
                        {' '}
                        <FcLike size="20" />{' '}
                        {video.statistics
                            ?.likeCount || 0}
                    </IconSpan>
                    <IconSpan>
                        <FcBinoculars size="20" />{' '}
                        {video.statistics
                            ?.viewCount || 0}
                    </IconSpan>
                    <IconSpan>
                        <FcComments size="20" />
                        {video.statistics
                            ?.commentCount || 0}
                    </IconSpan>
                    <IconSpan
                        title="share video"
                        style={{
                            margin: '0 8px',
                            cursor: 'pointer'
                        }}
                        onClick={() =>
                                onShareVideo(video.id)
                        }
                    >
                        <FcShare size="20" />
                        Share Video
                    </IconSpan>
                </ContianerIcons>
            </ContainerDescriptionVideo>
        </>
    );
};

VideoDetails.propTypes = {
    video: PropTypes.object,
    onShareVideo: PropTypes.func
};

export default VideoDetails