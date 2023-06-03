import { PATH } from "../../config.js";
import { ComponentViewer } from "../../components/ComponentViewer.js"


const source = {
    api: PATH.URL_API,
    medias: PATH.URL_API_MEDIAS
};

function initView() {
    const appHome = viewHome()
    document.querySelector('#main').innerHTML = appHome.template.home
    appHome.method.initSwipper()

    appHome.method.initTemplate1()
}

function viewHome() {

    const state = {

    }
    const ui = {
        viewHome: '.view-home',
    }
    const method = {
        getDataJson: () => {

        }, 
        renderHome: () => {
            
        },
        fetchMediaGroup: async (url, ids) => {
        
            let data = { id: ids };
            data = JSON.stringify(data);
        
            let formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "getGroupMediaCollection");
            formData.append("params", data);
        
            const req = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });
        
            if (req.ok === true) {
                return req.json();
            } else {
                throw new Error("nouvelle erreur lors de la creation");
            }
            
        },
        fetchMedia: async (url, params) => {

            // let params = {"ids":['98', '99']}
            // let params = {"ids":['98', '99']}
            let data = {
               "controller": "MediaController",
               "action": "getMedias",
               "params":  JSON.stringify(params),
            }
            data = JSON.stringify(data)
        
            const req = await fetch(url ,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: data
            })
        
            if (req.ok === true) {
                return req.json()
            }
            throw new Error('nouvelle erreur lors de la creation')
        },
        initSwipper: () => {
            const swiper = new Swiper('.swiper', {
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
              
        },
        initTemplate1: async () => {
            let result = await method.fetchMediaGroup(PATH.URL_API, [21])
            let groupMedia = result.data[0]
            // let params = {"id":['98', '99']}
            let params  = {"ids": JSON.parse(groupMedia.ids_medias).ids_medias}
            let medias = await method.fetchMedia(PATH.URL_API, params)
            console.log(medias)
            let wrapperSlide = document.querySelector('.swiper-wrapper')
            let html = ''
            medias.data.forEach((media, index) => {
                html += `<div class="swiper-slide border">
                    <div class="centerImgInSlide">
                        <img src="${PATH.URL_API_MEDIAS}/small/${media.name}" alt="image ${index}" />
                    </div>
                    <div>${index}</div>
                </div>`
            });
            wrapperSlide.innerHTML = html

        }
    }
    const template = { 
        home: `<div class="view-home">
                <div class="container">
                    home page
                    <div class="templating template-1">
                        <div class="">
                            <h5>selection dessin</h5>
                            <div class="swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide border">Slide 1</div>
                                    <div class="swiper-slide border">Slide 2</div>
                                    <div class="swiper-slide border">Slide 3</div>
                                </div>
                                <div class="swiper-pagination"></div>

                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>

                                <div class="swiper-scrollbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }
    

    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}



export { initView }