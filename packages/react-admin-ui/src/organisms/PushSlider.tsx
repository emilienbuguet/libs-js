import Push from '../molecules/Push';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Row from '../atoms/Row';
import { WithItems } from '../withs';
import { AsComponent } from '../as';

SwiperCore.use([Pagination]);

export function PushSlider({ className, items = [] }: PushSliderProps) {
    return (
        <Row className={className}>
            <Swiper pagination={{ clickable: true }}>
                {items.map((itemsProps, index) => (
                    <SwiperSlide key={`slide-${index}`}>
                        <Push {...itemsProps} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Row>
    );
}

export interface PushSliderProps extends AsComponent, WithItems {}

// noinspection JSUnusedGlobalSymbols
export default PushSlider;
