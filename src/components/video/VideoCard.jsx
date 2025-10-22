import React from 'react';
import PropTypes from 'prop-types';
import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../../utils/constantes';
import {
    FcLike,
    FcBinoculars
} from 'react-icons/fc';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const CardContainer = styled.div`
    background: var(--gray-color-secondary);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    animation: ${fadeIn} 0.6s ease-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 20px
            var(--primary-color);
        background: var(
            --secondary-color-alternative
        );
    }

    @media only screen and (${devices.mobileP}) {
        border-radius: 8px;
    }
`;

const ThumbnailContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    overflow: hidden;
    background: var(--black-color);
`;

const Thumbnail = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    ${CardContainer}:hover & {
        transform: scale(1.1);
    }
`;

const Duration = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: var(--white-color);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
`;

const CardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media only screen and (${devices.mobileP}) {
        padding: 0.8rem;
    }
`;

const VideoTitle = styled.h3`
    color: var(--white-color) !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    margin: 0 !important;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: none !important;

    @media only screen and (${devices.mobileP}) {
        font-size: 0.9rem !important;
    }
`;

const ChannelName = styled.p`
    color: var(--gray-color) !important;
    font-size: 0.85rem !important;
    margin: 0 !important;
    font-weight: 500 !important;

    @media only screen and (${devices.mobileP}) {
        font-size: 0.8rem !important;
    }
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;

    @media only screen and (${devices.mobileP}) {
        gap: 0.8rem;
    }
`;

const Stat = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--white-color);
    font-size: 0.8rem;

    @media only screen and (${devices.mobileP}) {
        font-size: 0.75rem;
    }
`;

const VideoCard = ({
    video,
    onVideoClick,
    formatDuration
}) => {
    const handleClick = () => {
        if (onVideoClick) {
            onVideoClick(video);
        }
    };

    const formatViews = views => {
        if (!views) return '0';
        const num = parseInt(views);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const formatLikes = likes => {
        if (!likes) return '0';
        const num = parseInt(likes);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return (
        <CardContainer onClick={handleClick}>
            <ThumbnailContainer>
                <Thumbnail
                    src={
                        video.snippet?.thumbnails
                            ?.high?.url ||
                        video.snippet?.thumbnails
                            ?.medium?.url ||
                        video.snippet?.thumbnails
                            ?.default?.url
                    }
                    alt={
                        video.snippet?.title ||
                        'Video thumbnail'
                    }
                    onError={e => {
                        e.target.src =
                            'https://via.placeholder.com/480x360?text=No+Image';
                    }}
                />
                <Duration>
                    {formatDuration(
                        video.contentDetails
                            ?.duration
                    )}
                </Duration>
            </ThumbnailContainer>

            <CardContent>
                <VideoTitle>
                    {video.snippet?.title}
                </VideoTitle>
                <ChannelName>
                    {video.snippet?.channelTitle}
                </ChannelName>

                <StatsContainer>
                    <Stat>
                        <FcBinoculars size={16} />
                        <span>
                            {formatViews(
                                video.statistics
                                    ?.viewCount
                            )}
                        </span>
                    </Stat>
                    <Stat>
                        <FcLike size={16} />
                        <span>
                            {formatLikes(
                                video.statistics
                                    ?.likeCount
                            )}
                        </span>
                    </Stat>
                </StatsContainer>
            </CardContent>
        </CardContainer>
    );
};

VideoCard.propTypes = {
    video: PropTypes.object.isRequired,
    onVideoClick: PropTypes.func.isRequired,
    formatDuration: PropTypes.func.isRequired
};

export default VideoCard;
