import { PATH } from "../../config.js";

export function initView() {
    document.querySelector('#main').innerHTML = `${template.view}<div class="bd"></div>`;

    viewHome()
}

const ressource = {
    pathUpload: PATH.urlUploadImg,
    sizeSmall: "original",
};

const state = {
    comics: []
}

function viewHome() {

    const ui = {
        getGroups: document.querySelector('.act-1'),
        showGroups: document.querySelector('.result-1'),
        bd: document.querySelector('.bd'),
    }


    const method = {
        getMediaGroup: () => {
            ui.showGroups.innerHTML = 'loading'
            method.fetchMediaGroup().then((json) => {
                state.comics = json.data
                state.comics.forEach(item => {
                    ui.showGroups.insertAdjacentHTML('beforeend',  cardComics(item));
                    ComponentComics(item)
                });
            })
        },
        fetchMediaGroup: async () => {
               
            let data = {};
            data = JSON.stringify(data);

            let formData = new FormData();
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

    ui.getGroups.addEventListener('click', () => {
        console.log('click')
        method.getMediaGroup()
    })
}



const template = {
    view: `<div class="container">
        <div>home</div>
        <div>liste groups</div>
        <div>
            <button class="act-1 btn btn-primary btn-sm">rechercher</button>
        </div>
        <div class="result-1"></div>
    </div>`,
}

function ComponentComics(item) {
    
    const ui = {
        btnComicsBd: document.querySelector(`.comics-bd[data-id="${item.id}"]`),
        bd: document.querySelector('.bd')
    }

    const method = {
        comicsBd: (e) => {
            console.log('bd')
            state.comics.filter(item => {
                if (item.id == ui.btnComicsBd.dataset.id)  {
                    const comicsMedias = JSON.parse(item.medias)
                    console.log(comicsMedias)
                    // for (const media of comicsMedias){
                    //     ui.bd.insertAdjacentHTML('beforeend',  `<div class="border m-2"><img src="${media.src}" alt="" />${media.id}</div>`);
                    // }
                    ui.bd.innerHTML = ''
                    comicsMedias.medias.forEach(media => {

                        ui.bd.insertAdjacentHTML('beforeend',  `<div class="border m-2 c-media"><img src="${ressource.pathUpload}original/${media.src}" alt="" />${media.id}</div>`);
                    })
                    // ui.bd.innerHTML = ui.btnComicsBd.dataset.id
                }
            })
        }
    }

    const template = {
        bd: `<div></div>`,
        image: `<div class="border m-2"><img src="" alt="" /></div>`
    }


    ui.btnComicsBd.addEventListener('click', () => {
        method.comicsBd()
    })
}



function cardComics(item) {
    const comics = JSON.parse(item.information)
    const comicsMedias = JSON.parse(item.medias)
    // console.log(comics)
    // console.log(comicsMedias)

    const template = {
        card: `<div class="comics-cards border m-2 p-2">
            <div class="comics-cards__title">${comics.title}</div>
            <div class="comics-cards__description">${comics.description}</div>
            <div class="comics-cards__content"></div>
            <div class="comics-cards__action">
                <button class="comics-bd btn btn-primary btn-sm" data-id="${item.id}">visionner</button>
            </div>
        </div>`,
    }

    function render() {
        return template.card
    }

    return render()
}