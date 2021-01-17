let mainSlider = new Swiper('.mainSlider-container', {
    spaceBetween: 400,
    navigation: {
        nextEl:'.mainSlider-swiper-button-next',
        prevEl:'.mainSlider-swiper-button-prev',
    },
    breakpoints: {
        400: {
            spaceBetween: 250,
        },
        900: {
            spaceBetween: 200,
        },
        1200: {
            spaceBetween: 100,
        }
    }
});
let vacancySlider = new Swiper('.vacancySlider-container', {
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
        nextEl:'.vacancySlider-swiper-button-next',
        prevEl:'.vacancySlider-swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
        },
        520: {
            slidesPerView: 2,
        },
    }
});
