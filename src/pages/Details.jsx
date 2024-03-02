import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails, selectVideoDetails } from '../features/common/commonSlice';
import VideoPlayer from '../components/VideoPlayer';
import { showYear } from '../helper';
import Ratings from '../components/Ratings';
import GenreLinks from '../components/GenreLinks';

function Details(props) {
    const { type, id } = useParams();
    const dispatch = useDispatch();
    const { status, data, error } = useSelector(selectVideoDetails);

    console.log(data);

    useEffect(() => {
        if (type && id) {
            dispatch(fetchVideoDetails({ type: type, id: id }))
        }
    }, [type, id]);


    return (
        <div className='container-fluid py-5'>
            <div className='container'>
                <VideoPlayer videos={data?.videos.results} />
            </div>

            <div className="row py-5">
                <div className="col-lg-3">
                    <img className='img-fluid' src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} alt={data?.title || data?.name} />
                </div>
                <div className="col-lg-9 d-flex flex-column gap-2">
                    <div className='py-2'>
                        <h2 className='title display-3'>{data?.name || data?.original_name || data?.title || data?.original_title}</h2>
                        <h4>({showYear(data?.release_date || data?.last_air_date)})</h4>
                    </div>

                    <Ratings voteCount={data?.vote_count} voteAverage={data?.vote_average} />
                    <GenreLinks genres={data?.genres} streamType={type} />
                    <p>Production Companies: {
                        data?.production_companies.map((comp) => (
                            <span>{comp?.name} </span>
                        ))
                    } </p>
                    <p className='lead'>{data?.overview}</p>

                </div>
            </div>
        </div>
    );
}

export default Details;