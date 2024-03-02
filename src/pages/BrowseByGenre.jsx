import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requests } from '../helper/apirequests';
import axios from '../helper/axios';
import Card from '../components/Card';


function BrowseByGenre(props) {
    const { type, genreid } = useParams();
    const [videoByGenre, setVideoByGenre] = useState(null);

    const fetchVideoByGenre = async (type, id) => {
        const response = await axios.get(requests.getVideoByGenre(type, id));
        setVideoByGenre(response.data.results)
    }

    useEffect(() => {
        if (type && genreid) {
            fetchVideoByGenre(type, genreid);
        }
    }, [type, genreid])


    return (
        <div className='container-fluid py-5'>
            <div className='d-flex justify-content-end mb-3'>
                <select className='form-select w-auto ms-auto'>
                    <option value="movie">Movie</option>
                    <option value="tv">Tv</option>
                </select>
                <select className='form-select w-auto ms-2'>
                    <option value="id">Action</option>
                </select>

            </div>

            <div className='row gy-4'>
                {
                    videoByGenre?.map((video) => (
                        <div className='col-lg-3'>
                            <Card video={video} streamType={type} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BrowseByGenre;