'use client';

import { Carousel } from '@mantine/carousel';
import Image from 'next/image';
import CustomButton from './CustomButton';

type Slide = {
  image: string;
  content: string;
  image_position: 'left' | 'right' | 'top' | 'bottom';
  content_position: 'left' | 'right' | 'top' | 'bottom';
  button: React.ReactNode;
};

export default function CustomCarousel() {
  const data: Slide[] = [
    {
      image: '/images/card.png',
      content: 'Text content',
      image_position: 'left',
      content_position: 'right',
      button: <CustomButton title="Go to" />,
    },
    {
      image: '/images/card.png',
      content: 'Text content',
      image_position: 'top',
      content_position: 'bottom',
      button: <CustomButton title="Go to" />,
    },
    {
      image: '/images/card.png',
      content: 'Text content',
      image_position: 'right',
      content_position: 'left',
      button: <CustomButton title="Go to" />,
    },
    {
      image: '/images/card.png',
      content: 'Text content',
      image_position: 'bottom',
      content_position: 'top',
      button: <CustomButton title="Go to" />,
    },
  ];

  const isVertical = (pos: string) => pos === 'top' || pos === 'bottom';

  return (
    <Carousel height={'85vh'} withIndicators>
      {data.map((slide, index) => {
        const vertical = isVertical(slide.image_position);

        return (
          <Carousel.Slide key={index}>
            <div
              className={`w-full h-[85vh] bg-[linear-gradient(180deg,#D1E7FF_0%,#FAFAFA_90%)]
              flex ${vertical ? 'flex-col' : 'flex-row'}
              items-center justify-center gap-10 px-10`}
            >
              {/* IMAGE */}
              {(slide.image_position === 'left' ||
                slide.image_position === 'top') && (
                <Image
                  src={slide.image}
                  alt="slide-image"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              )}

              {/* CONTENT */}
              <div className="max-w-md text-center flex flex-col gap-4">
                <p className="text-lg font-medium">{slide.content}</p>
                {slide.button}
              </div>

              {/* IMAGE (RIGHT / BOTTOM) */}
              {(slide.image_position === 'right' ||
                slide.image_position === 'bottom') && (
                <Image
                  src={slide.image}
                  alt="slide-image"
                  width={220}
                  height={220}
                  className="object-contain"
                />
              )}
            </div>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
