import { PATH } from "../../config.js";


const source = {
    api: PATH.URL_API,
    medias: PATH.URL_API_MEDIAS
};

function initView() {
    const appHome = viewHome()
    document.querySelector('#main').innerHTML = appHome.template.home

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

    }
    const template = { 
        home: `<div class="view-home">
                <div class="container">
                    home page
                    <h5>TotoMaster site : dessin</h5>
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