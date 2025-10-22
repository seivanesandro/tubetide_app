import React, {
    useEffect,
    useState
} from 'react';
import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../utils/constantes';
import {
    getVideoDetails,
    getPopularVideos,
    searchVideos
} from '../fetchApi/ServiceYoutube';

// Components commons
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

// left col
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

const Main = () => {
    const [
        watchLaterVideos,
        setWatchLaterVideos
    ] = useState([]);
    const [currentVideo, setCurrentVideo] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] =
        useState('');

    // add state to keep last search
    const [lastSearchTerm, setLastSearchTerm] =
        useState('');

    // function to load state after refresh or navigation
    useEffect(() => {
        let isMounted = true;

        const loadStateAfterRefresh =
            async () => {
                if (!isMounted) return;

                try {
                    setLoading(true);

                    // check flags
                    const brandClicked =
                        sessionStorage.getItem(
                            'brandClicked'
                        );
                    const fromMostViewed =
                        sessionStorage.getItem(
                            'fromMostViewed'
                        );

                    // come from MostViewedPage
                    if (
                        fromMostViewed === 'true'
                    ) {
                        sessionStorage.removeItem(
                            'fromMostViewed'
                        );

                        const savedVideoJSON =
                            localStorage.getItem(
                                'currentVideoDetails'
                            );
                        const savedVideosJSON =
                            localStorage.getItem(
                                'watchLaterVideos'
                            );

                        if (savedVideoJSON) {
                            const videoToSet =
                                JSON.parse(
                                    savedVideoJSON
                                );
                            setCurrentVideo(
                                videoToSet
                            );
                        }
                        if (savedVideosJSON) {
                            setWatchLaterVideos(
                                JSON.parse(
                                    savedVideosJSON
                                )
                            );
                        }

                        setLoading(false);
                        return;
                    }

                    // navbrand clicked - reload popular videos
                    if (brandClicked === 'true') {
                        sessionStorage.removeItem(
                            'brandClicked'
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

                        if (
                            videos &&
                            videos.length > 0
                        ) {
                            const firstVideoId =
                                getVideoIdFromResult(
                                    videos[0]
                                );
                            if (firstVideoId) {
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
                        }

                        setLoading(false);
                        return;
                    }

                    //f5 or normal navigation
                    const savedVideoJSON =
                        localStorage.getItem(
                            'currentVideoDetails'
                        );
                    const savedVideosJSON =
                        localStorage.getItem(
                            'watchLaterVideos'
                        );
                    const savedSearch =
                        localStorage.getItem(
                            'lastSearchQuery'
                        );

                    if (savedVideoJSON) {
                        setCurrentVideo(
                            JSON.parse(
                                savedVideoJSON
                            )
                        );
                    }

                    if (savedVideosJSON) {
                        setWatchLaterVideos(
                            JSON.parse(
                                savedVideosJSON
                            )
                        );
                    } else {
                        // load popular videos if none in cache
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

                        if (
                            !savedVideoJSON &&
                            videos &&
                            videos.length > 0
                        ) {
                            const firstVideoId =
                                getVideoIdFromResult(
                                    videos[0]
                                );
                            if (firstVideoId) {
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
                        }
                    }

                    if (savedSearch) {
                        setLastSearchTerm(
                            savedSearch
                        );
                    }

                    setLoading(false);
                } catch (error) {
                    console.error(
                        'Error to loading state: ',
                        error
                    );
                    setError(
                        'Failed to load data. Please try again.'
                    );
                    setLoading(false);
                }
            };

        loadStateAfterRefresh();

        return () => {
            isMounted = false;
        };
    }, []);

    //listeners for search events from NavBar
    useEffect(() => {
        const handleMainSearch = event => {
            const query = event.detail;
            setSearchQuery(query);
        };

        window.addEventListener(
            'mainSearch',
            handleMainSearch
        );

        return () => {
            window.removeEventListener(
                'mainSearch',
                handleMainSearch
            );
        };
    }, []);

    // always execute search when searchQuery changes
    useEffect(() => {
        // Not to execute if came from MostViewedPage
        const fromMostViewed =
            sessionStorage.getItem(
                'fromMostViewed'
            );
        if (fromMostViewed === 'true') {
            return;
        }

        if (
            !searchQuery ||
            searchQuery.trim() === ''
        ) {
            return;
        }

        const handleSearch = async () => {
            try {
                setLoading(true);

                // save search term
                localStorage.setItem(
                    'lastSearchQuery',
                    searchQuery
                );
                setLastSearchTerm(searchQuery);

                // get search results
                const searchResults =
                    await searchVideos(
                        searchQuery
                    );

                if (
                    searchResults &&
                    searchResults.length > 0
                ) {
                    setWatchLaterVideos(
                        searchResults
                    );
                    localStorage.setItem(
                        'watchLaterVideos',
                        JSON.stringify(
                            searchResults
                        )
                    );

                    const firstVideoId =
                        getVideoIdFromResult(
                            searchResults[0]
                        );
                    if (firstVideoId) {
                        const videoDetails =
                            await getVideoDetails(
                                firstVideoId
                            );
                        setCurrentVideo(
                            videoDetails
                        );
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

    // function to extract video ID from different response formats
    const getVideoIdFromResult = videoResult => {
        // check if videoId is nested
        if (
            videoResult.id &&
            videoResult.id.videoId
        ) {
            return videoResult.id.videoId;
        }

        // check if ID is directly available (common for popular videos)
        if (
            videoResult.id &&
            typeof videoResult.id === 'string'
        ) {
            return videoResult.id;
        }

        // for other possible structures
        if (
            videoResult.snippet &&
            videoResult.snippet.resourceId &&
            videoResult.snippet.resourceId.videoId
        ) {
            return videoResult.snippet.resourceId
                .videoId;
        }
        return null;
    };

    // function to select video from the list
    const handleSelectVideo = async videoId => {
        try {
            setLoading(true);

            // save selected video ID in localStorage
            localStorage.setItem(
                'currentVideoId',
                videoId
            );

            const videoDetails =
                await getVideoDetails(videoId);
            setCurrentVideo(videoDetails);

            // Save state in localStorage
            try {
                localStorage.setItem(
                    'currentVideoDetails',
                    JSON.stringify(videoDetails)
                );

                // update watch later videos state in localStorage
                localStorage.setItem(
                    'watchLaterVideos',
                    JSON.stringify(
                        watchLaterVideos
                    )
                );
            } catch (err) {
                console.error(
                    'Error on save state: ',
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

    // function to share video
    const handleShareVideo = videoId => {
        const shareUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (navigator.share) {
            navigator
                .share({
                    title: currentVideo.snippet
                        ?.title,
                    text: 'Check out this video!',
                    url: shareUrl
                })
                .catch(error =>
                    console.log(
                        'Error sharing: ',
                        error
                    )
                );
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard
                .writeText(shareUrl)
                .then(() =>
                    alert(
                        'Link copy to clipboard!'
                    )
                )
                .catch(err =>
                    console.error(
                        'Error on copy link: ',
                        err
                    )
                );
        }
    };

    // funtion to format duration from ISO 8601 to MM:SS or HH:MM:SS
    const formatDuration = duration => {
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

        // fill with leading zeros
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

    // function for loading state
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
            <StyleMain
                className="style-main"
                data-main-search="true"
            >
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
