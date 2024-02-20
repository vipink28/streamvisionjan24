import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import Header from '../components/Header';

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

            </div>
        </>
    );
}

export default Homescreen;