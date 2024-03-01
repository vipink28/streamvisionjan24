import React from 'react';
import Ratings from './Ratings';
import { Link } from 'react-router-dom';

function Card(props) {
    const { video, streamType } = props;
    return (
        <Link to={`/details/${streamType}/${video?.id}`} className='card text-white'>
            <img className='card-img-top' src={`https://image.tmdb.org/t/p/original${video?.backdrop_path}`} alt="" />
            <div className="card-body">
                <h5 className='card-title'>{video?.name || video?.original_name || video?.title || video?.original_title}</h5>
                <Ratings voteAverage={video?.vote_average} voteCount={video?.vote_count} />
            </div>
        </Link>
    );
}

export default Card;