import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import { platform, requests } from '../helper/apirequests';
import { useParams } from 'react-router-dom';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import axios from '../helper/axios';
import Row from '../components/Row';

function Browse(props) {
    const { type } = useParams();
    const { status, data, error } = useSelector(type === "tv" ? selectNetflixOriginals : selectNowPlayingMovies);

    const [genreList, setGenreList] = useState(null);

    const dispatch = useDispatch();

    const fetchGenreList = async (type) => {
        const response = await axios.get(requests.getGenres(type));
        setGenreList(response.data.genres);
    }

    useEffect(() => {
        if (type) {
            fetchGenreList(type);
        }
    }, [type])


    useEffect(() => {
        if (type === "tv") {
            dispatch(fetchNetflixOriginals());
        } else {
            dispatch(fetchNowPlayingMovies());
        }
    }, [type])

    return (
        <div className='py-5'>
            {
                status === "success" ?
                    <Header video={data.results[Math.floor(Math.random() * 20)]} streamType={type} />
                    : <div>No Data</div>
            }

            {/* <Row title="abc" action="" selector="" /> */}
        </div>
    );
}

export default Browse;