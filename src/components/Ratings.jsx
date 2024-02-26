import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Ratings(props) {
    const { voteAverage, voteCount } = props;
    let voteAvg = Math.floor(voteAverage / 2);
    let totalStars = [...Array(5)];

    return (
        <div className='d-flex py-3 align-items-center gap-3'>
            <div className='d-flex align-items-center gap-1'>
                {
                    totalStars.map((item, index) => {
                        return (
                            voteAvg > index ?
                                <FontAwesomeIcon className='text-warning' icon={solidStar} />
                                :
                                <FontAwesomeIcon icon={faStar} />
                        )
                    })
                }
            </div>
            <p className='mb-0'>{voteCount}</p>
        </div>
    );
}

export default Ratings;