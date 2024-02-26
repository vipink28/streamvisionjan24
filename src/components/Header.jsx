import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderDetails, selectHeaderDetails } from '../features/common/commonSlice';
import Ratings from './Ratings';
import { truncateText } from '../helper';

function Header(props) {
    const { video } = props;
    const dispatch = useDispatch();
    const { status, data, error } = useSelector(selectHeaderDetails);

    useEffect(() => {
        if (video) {
            dispatch(fetchHeaderDetails(video.id))
        }
    }, [video])
    return (
        <div className='position-relative vh-100'>
            <img className='header-img' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />
            <div className="caption">
                <h2 className='title display-3'>{truncateText(data?.name || data?.original_name || data?.title || data?.original_title, 35)}</h2>
                <h3 className='display-5 text-warning tagline'>{data?.tagline}</h3>
                <p className='lead'>{truncateText(data?.overview, 180)}</p>
                <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />
            </div>
            <div className='header-vignette'></div>
            <div className='header-bottom-vignette'></div>
        </div>
    );
}

export default Header;