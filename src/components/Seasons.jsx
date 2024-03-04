import React, { useEffect, useState } from 'react';
import EpisodeList from './EpisodeList';

function Seasons(props) {
    const { seasons, seriesid } = props;
    const [seasonNumber, setSeasonNumber] = useState(null);

    const handleSeasonChange = (e) => {
        let { value } = e.target;
        setSeasonNumber(Number(value));
    }

    useEffect(() => {
        if (seasons) {
            setSeasonNumber(seasons[0]?.season_number)
        }
    }, [seasons])

    return (
        <div className='container-fluid'>
            <div className='d-flex'>
                <h3>Season 1</h3>
                <select className='form-select w-auto ms-auto' onChange={handleSeasonChange}>
                    {
                        seasons?.map((season) => (
                            <option key={season?.id} value={season?.season_number}> {season?.name} </option>
                        ))
                    }
                </select>
            </div>

            <EpisodeList seriesid={seriesid} seasonNumber={seasonNumber} />
        </div>
    );
}

export default Seasons;