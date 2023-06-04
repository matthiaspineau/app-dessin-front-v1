import { PATH } from "../../config.js";
import { ComponentViewer } from "../../components/ComponentViewer.js"

export function initView() {
    document.querySelector('#main').innerHTML = `<div class="view-comics"></div>`;
    const view = viewComics()
    view.method.init()
}

const source = {
    api: PATH.URL_API,
    medias: PATH.URL_API_MEDIAS,
    size: 'small'
};

function viewComics() {

    const state = {
        comics: []
    }
    const ui = {
        viewComics: '.view-comics',
        comicsCollection: '.comics-collection',
        showComicsMedias: '.showComicsMedias'
    }
    const method = {
        init: async () => {
            document.querySelector(ui.viewComics).innerHTML = template.comicsCollection
            let result = await method.fetchMediaGroup(PATH.URL_API, [19, 20])
            state.comics = result.data

            let html = ''
            state.comics.forEach(item => {
                console.log(item)
                html += method.createComicsCards(item)
            });
            document.querySelector(ui.comicsCollection).innerHTML = html
            document.querySelectorAll(ui.showComicsMedias).forEach(elt => {
                elt.addEventListener('click', (e) => {
                    method.getViewerMedias(e)
                })
                
                
            });
            
        },
        getViewerMedias: async (e) => {
            let id = e.target.dataset.comicsId
            let item = state.comics.find(elt => elt.id == id)
            let idsMedias = JSON.parse(item.ids_medias).ids_medias
            let medias = await method.fetchMedia(PATH.URL_API, {ids: idsMedias, indexed: true})

            const viewComics = ComponentViewer({
                source: PATH.URL_API_MEDIAS,
                size: source.size,
                // target: options.target != undefined ? options.target : 'body',
                comics: item,
                medias: medias.data,
                ordering: idsMedias
            }) 
            viewComics.method.open()
        },
        createComicsCards: (item) => {
            let info = JSON.parse(item.information)
            let html = `<div class="comics-cards comics-grid" data-comics-id="${item.id}" data-comics-ref="${item.reference}">
                <div class="area-media">
                    <div class="area-media__content">
                        <img src="${source.medias}/${source.size}/${item.icone}" alt="icone bd" />
                    </div>
                </div>
                <div class="area-content">
                    <div>${info.title ?? 'titre'}</div>
                    <div>${info.description ?? 'description'}</div>
                </div>
                <div class="area-action">
                    <span class="showComicsMedias"
                        data-comics-ref="${item.reference}"
                        data-comics-id="${item.id}"
                        >
                        cliquer
                    </span>
                </div>
            </div>`

            return html
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
        initTemplate1: async () => {
            let result = await method.fetchMediaGroup(PATH.URL_API, [21])
            let groupMedia = result.data[0]
            // let params = {"id":['98', '99']}
            let params  = {"ids": JSON.parse(groupMedia.ids_medias).ids_medias}
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
        comicsCollection: `<div class="comics-collection"></div>`
    }
    

    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}