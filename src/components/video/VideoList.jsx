import React from 'react'
import PropTypes from 'prop-types'
import styled, {
    keyframes
} from 'styled-components';

const ScaleAnimation = keyframes`
    from {
        transform: scaleY(0);
    }

    to {
        transform: scaleY(1);
    }
`;

const WatchLaterListContainer = styled.div`
    cursor: pointer !important;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.8rem;
    background: var(--gray-color);
    color: var(--dark-color) !important;
    padding: 0.5rem;
    width: 96%;
    animation: ${ScaleAnimation} 0.8s ease-out;

    &:hover {
        background: var(--primary-color);
        box-shadow: 0 0 0.5rem var(--white-color);
        transform: scaleY(1.09);
        transition: all 0.3s ease-in-out;
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




const VideoList = ({
    video,
    onVideoSelect,
    formatDuration
}) => {

    const videoId = video.id?.videoId || video.id;
    
    return (
        <>
            <WatchLaterListContainer
                className="watch-later-list-container"
                key={videoId}
                onClick={() =>
                    onVideoSelect(videoId)
                }
            >
                <WatchLaterThumb
                    className="watch-later-thumb"
                    src={
                        video.snippet?.thumbnails
                            ?.default?.url
                    }
                    onError={e => {
                        e.target.onerror = null;
                        e.target.src =
                            'https://via.placeholder.com/120x90?text=No+Image';
                    }}
                    alt={
                        video.snippet?.title ||
                        'Video thumbnail'
                    }
                />
                <ListVideoContainer className="list-video-container">
                    <VideoTitle className="video-title">
                        {video.snippet?.title?.slice(
                            0,
                            100
                        )}
                        {video.snippet?.title
                            ?.length > 100
                            ? '...'
                            : ''}
                    </VideoTitle>
                    <VideoSubtitle className="video-subtitle">
                        {
                            video.snippet
                                ?.channelTitle
                        }
                    </VideoSubtitle>
                    <VideoDuration className="video-duration">
                        {video.contentDetails
                            ?.duration
                            ? formatDuration(
                                  video
                                      .contentDetails
                                      .duration
                              )
                            : 'N/A'}
                    </VideoDuration>
                </ListVideoContainer>
            </WatchLaterListContainer>
        </>
    );
};

VideoList.propTypes = {
    video: PropTypes.object.isRequired,
    onVideoSelect: PropTypes.func.isRequired,
    formatDuration: PropTypes.func.isRequired
};

export default VideoList