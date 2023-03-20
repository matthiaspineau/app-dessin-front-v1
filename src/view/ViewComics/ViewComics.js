import { PATH } from "../../config.js";

export function initView() {
    document.querySelector('#main').innerHTML = `${template.view}
                                                <div class="bd"></div>
                                                <div class="viewer-comics"></div>`;
    viewComics()
}

const ressource = {
    pathUpload: PATH.urlUploadImg,
    sizeSmall: "original",
};

const state = {
    comicsArray: [],
    comicsCollection: {},
    comicsSelected: 0,
}

function viewComics() {

    const ui = {
        showGroups: '.container-list-comics',
    }

    const method = {
        showListComics: () => { // affichage list comics
            document.querySelector(ui.showGroups).innerHTML = 'loading'
            method.fetchGetMediaGroup().then((json) => {
                // mise a jour du state
                state.comicsCollection = json.data
              
                // insert et init cards comics
                let collection = state.comicsCollection
                for (const comicsId in collection) {
                    document.querySelector(ui.showGroups).insertAdjacentHTML('beforeend'
                        , cardComics(comicsId));
                        initCardComics(comicsId)
                }
                
            })
        },
        fetchGetMediaGroup: async () => { // requete list groups comics
               
            let data = {
                is_indexed: 1
            };
            data = JSON.stringify(data);

            const formData = new FormData();
            formData.append("controller", "MediaGroupsController");
            formData.append("action", "getGroupMediaCollection");
            formData.append("params", data);
        
            const req = await fetch(PATH.urlApi, {
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
    }

    // init
    method.showListComics()

}
// card comics, struture html
function cardComics(comicsId) {

    let comics = state.comicsCollection[comicsId]
    const comicsInfo = JSON.parse(comics.information)
    const comicsMedias = JSON.parse(comics.medias)

    const template = {
        card: `<div class="comics-cards border m-2 p-2">
            <div class="comics-cards__title">${comicsInfo.title}</div>
            <div class="comics-cards__description">${comicsInfo.description}</div>
            <div class="comics-cards__content"></div>
            <div class="comics-cards__action">
                <button class="comics-bd btn btn-primary btn-sm" data-id="${comics.id}">visionner</button>
            </div>
        </div>`,
    }

    return template.card
}

function initCardComics(comicsId) {
    
    const ui = {
        showInViewer: `.comics-bd[data-id="${comicsId}"]`
    }

    document.querySelector(ui.showInViewer).addEventListener('click', () => {
        state.comicsSelected = comicsId
        viewerComics()
    })
}

function viewerComics() {

    let comics = state.comicsCollection[state.comicsSelected]
    // console.log(comics)
    const comicsInfo = JSON.parse(comics.information)
    const comicsMedias = JSON.parse(comics.medias)

    const ui = {
        viewer: '.viewer-comics',
        overlay: '.overlay',
        dialog: '.dialog',
        close: '.close'
    }

    const template = {
        loading: `<div class="loading">loading</div>`,
        viewer: `<div class="overlay">
                    <div class="close">close</div>
                    <div class="dialog">dialog</div>
                </div>
                `,
    }

    const method = {
        destroyViewer: () => { // clean viewer innerHTML = ''
            document.querySelector(ui.viewer).innerHTML = ''
            document.querySelector(ui.viewer).style.display = 'none'
        },
        showMedia: () => { // affiche les img
            let html = ``
            comicsMedias.medias.forEach( media => {
                html += `<div class="border m-2 viewer-comics__media">
                            <img src="${ressource.pathUpload}original/${media.src}" alt="media" />
                        </div>`
            });
            document.querySelector(ui.dialog).innerHTML = html
        }
    }

    // init
    document.querySelector(ui.viewer).innerHTML = template.viewer
    document.querySelector(ui.viewer).style.display = 'block'
    method.showMedia()
    document.querySelector(ui.close).addEventListener('click', () => {
        method.destroyViewer()
    })


}


const template = {
    view: `<div class="container">
        <div>home</div>
        <div>liste groups</div>
        <div class="container-list-comics"></div>
    </div>`,
}




