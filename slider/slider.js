let mainSlider = new Swiper('.mainSlider-container', {
    loop: true,
    spaceBetween: 200,
    navigation: {
        nextEl:'.mainSlider-swiper-button-next',
        prevEl:'.mainSlider-swiper-button-prev',
    },
    breakpoints: {
        900: {
            spaceBetween:50,
        },
    }
});
let vacancySlider = new Swiper('.vacancySlider-container', {
    spaceBetween: 30,
    slidesPerView: 2,
    navigation: {
        nextEl:'.vacancySlider-swiper-button-next',
        prevEl:'.vacancySlider-swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 2,
        },
    }
});
