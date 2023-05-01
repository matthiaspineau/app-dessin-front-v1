import { PATH } from "../../config.js";
import { ComponentViewer } from "../../components/ComponentViewer.js"

const dataComics = [
    {
        ref: "la_gargonne",
        chemin: "la_gargonne/1200",
        pages: ["Pages_1.png","Pages_2.png","Pages_3.png","Pages_4.png","Pages_5.png"],
        title: "la Gargonne",
    },
    {
        ref: "jaco_vender",
        chemin: "jaco_vender/900",
        pages: ["Pages_1.png","Pages_2.png","Pages_3.png","Pages_4.png","Pages_5.png"],
        title: "Jaco Vender",
    }
]
const source = {
    medias: PATH.URL_LOCAL_MEDIAS
};

export function initView() {
    const appHome = viewHome()
    document.querySelector('#main').innerHTML = appHome.template.home

    document.querySelector(appHome.ui.bd_1).addEventListener('click', () => {
        // init viewer
        const viewer = ComponentViewer({
            source: source.medias,
            target: `.view-home`,
            comics: dataComics.find(element => element.ref == 'la_gargonne')
        })
        viewer.method.open()
    })
    document.querySelector(appHome.ui.bd_2).addEventListener('click', () => {
        // init viewer
        const viewer = ComponentViewer({
            source: source.medias,
            target: `.view-home`,
            comics: dataComics.find(element => element.ref == 'jaco_vender')
        })
        viewer.method.open()
    })
}

function viewHome() {

    const state = {
        title: "",
        author: "thomas pineau",
        pseudo: "TotoMaster",
        alias: "Déssinateur de saveur",
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
            <div class="view-home view__home block-home home_wallpaper">
                <div class="block-home__left">
                    <div class="pseudo">${state.pseudo} <span class="alias">${state.alias}</span></div>
                    <div class="status_actuel_desc">
                        En vacanse après de long et tempéteux projets, repos octoyer et bien mérité<br>
                        Bientot de retour<br>
                        Patienter avec ca
                    </div>
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

