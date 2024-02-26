import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, fetchPopularShows, selectNetflixOriginals, selectPopularShows } from '../features/tv/tvSlice';
import Header from '../components/Header';
import Row from '../components/Row';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import { platform } from '../helper/apirequests';

function Homescreen(props) {
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(selectNetflixOriginals);

    useEffect(() => {
        dispatch(fetchNetflixOriginals());
    }, [])

    return (
        <>
            {
                status === "success" ?
                    <Header video={data.results[Math.floor(Math.random() * 20)]} />
                    : <div>No Data</div>
            }
            <div className='container-fluid'>
                <Row title="Now Playing Movies" action={fetchNowPlayingMovies} selector={selectNowPlayingMovies} streamType={platform.movie} />

                <Row title="Netflix Shows" action={fetchNetflixOriginals} selector={selectNetflixOriginals} streamType={platform.tv} />

                <Row title="Popular Shows" action={fetchPopularShows} selector={selectPopularShows} streamType={platform.tv} />

            </div>
        </>
    );
}

export default Homescreen;