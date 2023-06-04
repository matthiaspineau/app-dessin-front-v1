import { PATH } from "../../config.js";

function initView() {
    const appGallery = viewGallery()
    document.querySelector('#main').innerHTML = appGallery.template.gallery
    appGallery.method.initSwipper()

    // appGallery.method.initTemplate1()
    appGallery.method.renderGallery()
}

function viewGallery() {

    const state = {
        //groupsMedia: [19, 20, 21], // local
        groupsMedia: [21, 22, 23], // serveur
    }
    const ui = {
        viewGallery: '.view-gallery',
        galleryContain: '.gallery-contain'
    }
    const method = {
        renderGallery: async () => {
            let result = await method.fetchMediaGroup(PATH.URL_API, state.groupsMedia)
            let groupsMedia = result.data

            groupsMedia.forEach(group => {
                method.createGallery(group)
            })
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
        createGallery: async (group) => {
            let ids = JSON.parse(group.ids_medias).ids_medias
            let resultMedias = await method.fetchMedia(PATH.URL_API, {ids: ids, indexed: true})
            let medias = resultMedias.data

            // creation slide
            let slideHtml = ''
            medias.forEach((media, index) => {
                slideHtml += `<div class="swiper-slide border">
                    <div class="centerImgInSlide">
                        <img src="${PATH.URL_API_MEDIAS}/small/${media.name}" alt="image ${index}" />
                    </div>
                    <div>${index}</div>
                </div>`
            });

            let swiperHtml = `<div class="gallery__card">
                    <h5 class="gallery__title">${group.reference}</h5>
                    <div class="swiper swiper-${group.id}">
                        <div class="swiper-wrapper">
                            ${slideHtml}
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>`


            document.querySelector(ui.galleryContain).insertAdjacentHTML('beforeend', swiperHtml)
            method.initSwipper(`.swiper-${group.id}`)
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
        initSwipper: (target) => {
            new Swiper(target, {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
                // If we need pagination
                pagination: {
                  el: '.swiper-pagination',
                },
                // configuration test
                slidesPerView: 1,
                spaceBetween: 10,
            });
        },
        initTemplate1: async () => {
            let result = await method.fetchMediaGroup(PATH.URL_API, [21])
            let groupMedia = result.data[0]
            // let params = {"id":['98', '99']}
            let params  = {
                "ids": JSON.parse(groupMedia.ids_medias).ids_medias,
                "indexed": true
            }
            let medias = await method.fetchMedia(PATH.URL_API, params)

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
        gallery: `<div class="view-gallery">
                <div class="container">
                    gallery page
                    <div class="gallery-contain"></div>
                </div>
            </div>`,
        swiper: `<div class="templating template-1">
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