import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bannerImg1 from '../../../assets/banner1.png';
import bannerImg2 from '../../../assets/banner2.png';
import bannerImg3 from '../../../assets/banner3.png';

const slides = [
  { img: bannerImg1 },
  { img: bannerImg2 },
  { img: bannerImg3  },
];

const Banner = () => {
  return (
    <div className="overflow-hidden rounded-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        stopOnHover
        renderIndicator={(onClick, isSelected, idx, label) => (
          <li
            onClick={onClick}
            key={idx}
            className={`mx-1 inline-block h-2 w-2 rounded-full cursor-pointer ${
              isSelected ? 'bg-lime-400' : 'bg-white/40'
            }`}
            title={label}
          />
        )}
        renderArrowPrev={(onClick, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClick}
              title={label}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              <span className="sr-only">{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClick, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClick}
              title={label}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition"
            >
              <span className="sr-only">{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )
        }
      >
        {slides.map(({ img, caption }) => (
          <div key={caption} className="relative">
            <img
              src={img}
              alt={caption}
              className="h-[500px] md:h-[600px] w-full object-cover select-none"
            />
            {/* Caption overlay */}
            <div className=" flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg tracking-wide text-center px-4">
                {caption}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
