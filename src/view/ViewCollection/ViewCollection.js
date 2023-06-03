import { PATH } from "../../config.js";

const source = {
    medias: PATH.URL_LOCAL_MEDIAS
};

function initView() {
    const viewCollection = viewCollection()
    document.querySelector('#main').innerHTML = viewCollection.template.view
}

function viewCollection() {

    const state = {

    }
    const ui = {
        view: '.view-collection',
    }
    const method = {
        getDataJson: () => {

        }, 
        renderHome: () => {
            
        }
    }
    const template = { 
        view: `<div class="view-collection">
                <div class="view-collection__contain container"><div>
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