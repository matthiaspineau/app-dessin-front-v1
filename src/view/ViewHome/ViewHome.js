import { PATH } from "../../config.js";

export function initView() {
    const appHome = viewHome()
    document.querySelector('#main').innerHTML = appHome.template.home

    // appHome.ui.bd_1.add
    document.querySelector(appHome.ui.bd_1).addEventListener('click', () => {
        
    })
}

const source = {
    source_media: PATH.URL_LOCAL_UPLOAD
};

function viewHome() {

    const state = {
        title: "home",
        author: "thomas pineau",
        pseudo: "totomaster",
        alias: "Déssinateur de saveur",
        status_actuel: "En vacanse",
        status_actuel_desc: "En vacanse apres de long et eprouvant projet, repos octoyer, bientot de retour"
    }
    const ui = {
        viewHome: '.view-home',
        bd_1: '.bd_1',
        bd_2: '.bd_2',
    }
    const method = {
        getDataJson: () => {

        }, 
        renderHome: () => {
            
        }
    }
    const template = {
        home: `
            <div class="view__home block-home">
                <div class="block-home__left">
                    <div>texte</div>
                    <div>${state.title}</div>
                    <div>${state.author}</div>
                    <div>${state.pseudo}</div>
                    <div>${state.alias}</div>
                    <div>${state.status_actuel_desc}</div>
                    <div class="go-view-comics">
                        <span class="bd_1" data-ref="la_gargonne">La gagonne</span>
                        <span class="bd_2" data-ref="jaco-vender">jaco vender</span>
                    </div>
                </div>
                <div class="block-home__right">
                    <img src="" alt />
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

