import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularShows, selectPopularShows } from '../features/tv/tvSlice';
import Card from './Card';

function Row(props) {
    const { action, selector, title, streamType } = props;

    const popularShows = useSelector(selector);
    const collection = popularShows.data?.results;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action());
    }, [])

    return (
        <div className='py-3'>
            <h3 className='mb-3'>{title}</h3>
            <Swiper
                spaceBetween={20}
                slidesPerView={5}
            >
                {
                    collection?.map((video) => (
                        <SwiperSlide key={video?.id}>
                            <Card video={video} streamType={streamType} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default Row;