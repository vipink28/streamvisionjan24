import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import { platform, requests } from '../helper/apirequests';
import { useParams } from 'react-router-dom';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import axios from '../helper/axios';
import Row from '../components/Row';
import { shuffle } from '../helper';

function Browse(props) {
    const { type } = useParams();
    const { status, data, error } = useSelector(type === "tv" ? selectNetflixOriginals : selectNowPlayingMovies);

    const [genreList, setGenreList] = useState(null);

    const dispatch = useDispatch();

    const fetchGenreList = async (type) => {
        const response = await axios.get(requests.getGenres(type));
        setGenreList(shuffle(response.data.genres));
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
            <div className='container-fluid'>
                {
                    genreList ?
                        genreList?.map((genre, index) => (
                            index < 6 ?
                                <Row title={genre?.name} isGenre={true} genre={genre} streamType={type} /> : ""
                        ))
                        : ""
                }
            </div>
        </div>
    );
}

export default Browse;