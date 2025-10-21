import Youtube from './Youtube';

// Buscar vídeos com base em uma consulta
export const searchVideos = async (
    searchTerm,
    maxResults = 10
) => {
    try {
        const response = await Youtube.get(
            '/search',
            {
                params: {
                    part: 'snippet',
                    maxResults: maxResults,
                    q: searchTerm,
                    type: 'video' // FIXME: Para garantir que só retorne vídeos, não playlists ou canais
                }
            }
        );

        if (
            response.data.items &&
            response.data.items.length > 0
        ) {
            // Extrair os IDs dos vídeos para buscar detalhes adicionais
            const videoIds = response.data.items
                .map(item => item.id.videoId)
                .join(',');

            // Fazer uma segunda chamada para obter detalhes dos vídeos (incluindo duração)
            const detailsResponse =
                await Youtube.get('/videos', {
                    params: {
                        part: 'snippet,contentDetails,statistics',
                        id: videoIds
                    }
                });

            // Se conseguimos obter detalhes, retornar os detalhes completos
            if (
                detailsResponse.data.items &&
                detailsResponse.data.items
                    .length > 0
            ) {
                return detailsResponse.data.items;
            }

            // Se não conseguimos obter detalhes, retornar os resultados originais
            return response.data.items;
        }

        return [];
    } catch (error) {
        console.error(
            'Error on searching videos:',
            error
        );
        throw error;
    }
};

//buscar detalhes de um video especifico pelo ID
export const getVideoDetails = async videoId => {
    try {
        const response = await Youtube.get(
            '/videos',
            {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoId
                }
            }
        );
        return response.data.items[0];
    } catch (error) {
        console.error(
            'Error about video details:',
            error
        );
        throw error;
    }
};

// obter videos populares (para a pagina inicial)
export const getPopularVideos = async (
    maxResults = 15
) => {
    try {
        const response = await Youtube.get(
            '/videos',
            {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    maxResults
                }
            }
        );
        return response.data.items;
    } catch (error) {
        console.error(
            'Error about popular videos:',
            error
        );
        throw error;
    }
};
