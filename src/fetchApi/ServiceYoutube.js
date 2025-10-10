import Youtube from "./Youtube";

// Buscar vídeos com base em uma consulta
export const searchVideos = async (query, maxResults = 15) => {

    try{
        const response = await Youtube.get("/search", {
            params: {
                part: "snippet",
                maxResults,
                q: query,
                type: "video",
            },
        });
        return response.data.items;
    }catch(error){
        console.error("Error fetching videos:", error);
        throw error;
    }
};


//buscar detalhes de um video especifico pelo ID
export const getVideoDetails = async (videoId) => {
    try{
        const response = await Youtube.get("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                id: videoId,
            },
        });
        return response.data.items[0];
    }catch(error){
        console.error("Error fetching video details:", error);
        throw error;
    }
};

// obter videos populares (para a pagina inicial)
export const getPopularVideos = async (maxResults = 15) => {
    try{
        const response = await Youtube.get("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                maxResults,
            },
        });
        return response.data.items;
    }catch(error){
        console.error("Error fetching popular videos:", error);
        throw error;
    }
};

