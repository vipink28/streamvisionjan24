import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../features/common/commonSlice';

function Details(props) {
    const { type, id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (type && id) {
            dispatch(fetchVideoDetails({ type: type, id: id }))
        }
    }, [type, id]);


    return (
        <div className='container-fluid py-5'>
            <h3>Details</h3>
        </div>
    );
}

export default Details;