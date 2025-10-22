import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import { useNavigate } from 'react-router-dom';
//import PropTypes from 'prop-types';
import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../utils/constantes';
import {
    getPopularVideos,
    searchVideos
} from '../fetchApi/ServiceYoutube';
import Loading from '../components/common/load/Loading';
import ErrorComponent from '../components/common/error/ErrorComponent';
import VideoCard from '../components/video/VideoCard';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const PageContainer = styled.div`
    min-height: 90vh;
    background: var(--bg-base);
    padding: 2rem 3rem;
    animation: ${fadeIn} 0.8s ease-in;

    @media only screen and (${devices.portatil}) {
        padding: 2rem;
    }

    @media only screen and (${devices.tablet}) {
        padding: 1.5rem;
    }

    @media only screen and (${devices.mobileG}) {
        padding: 1rem;
    }
`;

const PageTitle = styled.h1`
    color: var(--primary-color) !important;
    text-align: center;
    margin-bottom: 2rem !important;
    font-size: 2.5rem !important;
    text-shadow: 0 0 1rem
        var(--secondary-color-alternative) !important;

    @media only screen and (${devices.tablet}) {
        font-size: 2rem !important;
        margin-bottom: 1.5rem !important;
    }

    @media only screen and (${devices.mobileG}) {
        font-size: 1.5rem !important;
        margin-bottom: 1rem !important;
    }
`;

const VideosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;

    @media only screen and (${devices.portatilL}) {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    @media only screen and (${devices.portatil}) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    @media only screen and (${devices.tablet}) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    @media only screen and (${devices.mobileG}) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
`;

const MostViewedPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const lastQuery = useRef(null);

    // searchQuery state with localStorage initialization
    const [searchQuery, setSearchQuery] =
        useState(() => {
            const savedQuery =
                localStorage.getItem(
                    'mostViewedQuery'
                ) || '';
            return savedQuery;
        });

    // listener for navbar search events
    useEffect(() => {
        const handleMvSearch = event => {
            const query = event.detail;
            setSearchQuery(query);
            hasFetched.current = false; // Reset for new search
            lastQuery.current = null; // Reset for lastQuery
        };

        window.addEventListener(
            'mvSearch',
            handleMvSearch
        );
        return () => {
            window.removeEventListener(
                'mvSearch',
                handleMvSearch
            );
        };
    }, []);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                // try to load cache first
                const cachedVideos =
                    localStorage.getItem(
                        'mostViewedVideos'
                    );
                const cachedQuery =
                    localStorage.getItem(
                        'mostViewedQuery'
                    );

                // If cache exists and query matches, use cache WITHOUT checking refs
                if (
                    cachedVideos &&
                    cachedQuery ===
                        (searchQuery || '')
                ) {
                    setVideos(
                        JSON.parse(cachedVideos)
                    );
                    setLoading(false);
                    hasFetched.current = true;
                    lastQuery.current =
                        searchQuery;
                    return;
                }

                // if query is the same AND already fetched, block ONLY for new searches
                if (
                    hasFetched.current &&
                    lastQuery.current ===
                        searchQuery &&
                    cachedQuery !==
                        (searchQuery || '')
                ) {
                    return;
                }

                //mark as fetched BEFORE API call
                hasFetched.current = true;
                lastQuery.current = searchQuery;

                // if there is searchQuery, fetch videos by search
                let results;
                if (
                    searchQuery &&
                    searchQuery.trim() !== ''
                ) {
                    results = await searchVideos(
                        searchQuery,
                        12
                    );
                } else {
                    results =
                        await getPopularVideos(
                            12
                        );
                }

                setVideos(results);

                // Salvar no cache
                localStorage.setItem(
                    'mostViewedVideos',
                    JSON.stringify(results)
                );
                localStorage.setItem(
                    'mostViewedQuery',
                    searchQuery || ''
                );
                //FIXME: for DEBUGG
                //console.log('💾 Cache salvo');

                setLoading(false);
            } catch (err) {
                console.error('ERROR: ', err);
                hasFetched.current = false; // Reset in case of error

                // set error mensage more specific
                if (
                    err.response &&
                    err.response.status === 403
                ) {
                    setError(
                        'Your exceded the limit of videos per day. Please try again but.. tomorrow!'
                    );
                } else if (
                    err.response &&
                    err.response.status === 400
                ) {
                    setError(
                        'Invalid request, Please check your API cedentials.'
                    );
                } else {
                    setError(
                        'Failed to load videos. Please try later.'
                    );
                }

                setLoading(false);
            }
        };

        fetchVideos();
    }, [searchQuery]);

    // format duration from ISO 8601 to MM:SS or HH:MM:SS
    const formatDuration = duration => {
        if (!duration) return '0:00';

        const match = duration.match(
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

    const handleVideoClick = video => {
        try {
            // save all BEFORE marking flag
            localStorage.setItem(
                'currentVideoDetails',
                JSON.stringify(video)
            );
            localStorage.setItem(
                'currentVideoId',
                video.id
            );
            localStorage.setItem(
                'watchLaterVideos',
                JSON.stringify(videos)
            );

            // force sync do localStorage
            const verify = localStorage.getItem(
                'currentVideoDetails'
            );
            if (!verify) {
                console.error(
                    'ERRO:trouble with localstore please verify logs!'
                );
                return;
            }

            // mark flag AFTER confirming it saved
            sessionStorage.setItem(
                'fromMostViewed',
                'true'
            );

            // navigation to Main with setTimeout to ensure
            setTimeout(() => {
                navigate('/');
            }, 0);
        } catch (error) {
            console.error('ERROR:', error);
        }
    };

    if (loading) {
        return (
            <PageContainer>
                <PageTitle>
                    {searchQuery &&
                    searchQuery.trim() !== ''
                        ? `Searching for: "${searchQuery}"`
                        : 'Most Viewed Videos on YouTube'}
                </PageTitle>
                <LoadingContainer>
                    <Loading
                        $speedborder="0.7"
                        $fontsize="8"
                        $size="1"
                    />
                </LoadingContainer>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <PageTitle>
                    {searchQuery &&
                    searchQuery.trim() !== ''
                        ? `Search Results: "${searchQuery}"`
                        : 'Most Viewed Videos on YouTube'}
                </PageTitle>
                <ErrorContainer>
                    <ErrorComponent
                        errmessage={error}
                    />
                </ErrorContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer data-mv-search="true">
            <PageTitle>
                {searchQuery &&
                searchQuery.trim() !== ''
                    ? `Search Results: "${searchQuery}"`
                    : 'Most Viewed Videos on YouTube'}
            </PageTitle>
            <VideosGrid>
                {videos.map(video => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onVideoClick={
                            handleVideoClick
                        }
                        formatDuration={
                            formatDuration
                        }
                    />
                ))}
            </VideosGrid>
        </PageContainer>
    );
};

export default MostViewedPage;
