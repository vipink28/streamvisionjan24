import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderDetails, selectHeaderDetails } from '../features/common/commonSlice';
import Ratings from './Ratings';
import { truncateText } from '../helper';
import GenreLinks from './GenreLinks';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';

function Header(props) {
    const { video, streamType } = props;
    const dispatch = useDispatch();
    const { status, data, error } = useSelector(selectHeaderDetails);
    const [showPlayer, setShowPlayer] = useState(false);
    console.log(video);
    useEffect(() => {
        if (video) {
            dispatch(fetchHeaderDetails({ type: streamType, id: video.id }))
        }
    }, [video])

    const handlePlay = () => {
        setShowPlayer(true);
    }
    return (
        <div className='position-relative vh-100'>
            {
                showPlayer ?
                    <VideoPlayer videos={data?.videos.results} />
                    :
                    <>
                        <img className='header-img' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />
                        <div className="caption">
                            <h2 className='title display-3'>{truncateText(data?.name || data?.original_name || data?.title || data?.original_title, 35)}</h2>
                            <h3 className='display-5 text-warning tagline'>{data?.tagline}</h3>
                            <p className='lead'>{truncateText(data?.overview, 180)}</p>
                            <GenreLinks genres={data?.genres} streamType={streamType} />
                            <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />
                            <button className='btn btn-danger' onClick={handlePlay}>Play Trailer</button>
                            <Link to={`/details/${streamType}/${data?.id}`} className='btn btn-info ms-2'>More Info</Link>
                        </div>
                        <div className='header-vignette'></div>
                        <div className='header-bottom-vignette'></div>
                    </>
            }
        </div>
    );
}

export default Header;