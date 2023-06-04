function ComponentSwipper() {
    
    const state = {
        item: ``,
        swiper: {}
    }
    const ui = {
        item: `.item`,
    }
    const method = {
        item: () => {
        },
        initSwiper: () => {
            state.swiper = new Swiper('.swiper', {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
              
                // If we need pagination
                pagination: {
                  el: '.swiper-pagination',
                },
              
                // Navigation arrows
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              
                // And if we need scrollbar
                scrollbar: {
                  el: '.swiper-scrollbar',
                },

                // configuration test
                slidesPerView: 1,
                spaceBetween: 10,
                // using "ratio" endpoints
                // breakpoints: {
                //     '@0.75': {
                //     slidesPerView: 2,
                //     spaceBetween: 20,
                //     },
                //     '@1.00': {
                //     slidesPerView: 3,
                //     spaceBetween: 40,
                //     },
                //     '@1.50': {
                //     slidesPerView: 4,
                //     spaceBetween: 50,
                //     },
                // }
            });
              
        }
    }
    const template = {
        item: `<div class=""></div>`
    }
    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}

export { ComponentSwipper }