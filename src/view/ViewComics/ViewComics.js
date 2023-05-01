import { PATH } from "../../config.js";
import { ComponentComics } from "../../components/ComponentComics.js"
import { ComponentViewer } from "../../components/ComponentViewer.js"

export function initView() {
    document.querySelector('#main').innerHTML = `<div class="view-comics"></div>`;
    viewComics()
}

const source = {
    medias: PATH.URL_LOCAL_MEDIAS
};

function viewComics() {

    const ui = {
        viewComics: '.view-comics',
    }
    const template = {
        home: `<div class="">
            <div class="contain-comics-collection"></div>
        </div>`
    }

    document.querySelector(ui.viewComics).innerHTML = template.home
    comicsCollection()
}


// comics collection
// => get data => init componentComics
function comicsCollection() {
    const state = {
        collection: []
    }
    const ui = {
        containComicsCollection: '.contain-comics-collection',
        comicsCollection: '.comics-collection',
        showComics: '.showComics'
    }
    const template = {
        comicsCollection: `<div class="comics-collection"></div>`
    }

    //
    document.querySelector(ui.containComicsCollection).innerHTML = template.comicsCollection
    

    // get local-data - comicsCollection
    fetch('../../../local-data/dataComicsCollection.json')
        .then(res => res.json())
        .then(data => {
            state.collection = data.collection
            // insert objet - componentComics
            state.collection.forEach((comics, index) => {
                let obj = ComponentComics({
                    source: source.medias,
                    index: index,
                    data: comics,
                    target: ui.comicsCollection
                })
                document.querySelector(ui.comicsCollection).insertAdjacentHTML('beforeend', obj.template.comics)
            });

            // events - show comics viewer
            document.querySelectorAll(ui.showComics).forEach(elt => {
                elt.addEventListener('click', (e) => {

                    // init viewer
                    const viewer = ComponentViewer({
                        source: source.medias,
                        target: `.view-home`,
                        comics: state.collection.find(element => element.ref == e.target.dataset.comicsRef)
                    })
                    viewer.method.open()
                })
            });
        })
    
}