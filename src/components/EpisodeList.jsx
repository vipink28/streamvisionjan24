import React, { useEffect, useState } from 'react';
import axios from '../helper/axios';
import { requests } from '../helper/apirequests';
function EpisodeList(props) {
    const { seriesid, seasonNumber } = props;
    const [episodes, setEpisodes] = useState(null);

    const fetchSeasons = async (id, seasonNumber) => {
        const response = await axios.get(requests.getSeasons(id, seasonNumber));
        setEpisodes(response.data.episodes);
    }

    useEffect(() => {
        if (seriesid && seasonNumber) {
            fetchSeasons(seriesid, seasonNumber);
        }
    }, [seriesid, seasonNumber])

    return (
        <div className='py-3'>
            {
                episodes?.map((episode, index) => (
                    index < 10 ?
                        <div className='row'>
                            <div className='col-1'>{episode?.episode_number}</div>
                            <div className='col-1'><img className='img-fluid' src={`https://image.tmdb.org/t/p/original${episode?.still_path}`} /></div>
                            <div className='col-6'>{episode?.overview}</div>
                        </div> : ""
                ))
            }
        </div>
    );
}

export default EpisodeList;