import React from 'react';
import { Link } from 'react-router-dom';

function GenreLinks(props) {
    const { genres, streamType } = props;
    return (
        <div className='d-flex py-1 gap-2'>
            {
                genres?.map((genre) => {
                    return <Link key={genre?.id} to={`/browsebygenre/${streamType}/${genre?.id}`} class="badge text-bg-warning text-decoration-none">{genre?.name}</Link>
                })
            }
        </div>
    );
}

export default GenreLinks;