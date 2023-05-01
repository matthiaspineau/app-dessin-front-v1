function ComponentViewer(options = {}) {
    
    const state = {
        source: options.source != undefined ? options.source : '',
        target: options.target != undefined ? options.target : 'body',
        comics: options.comics != undefined ? options.comics : {},
    }
    const ui = {
        viewer: `.viewer-comics`,
        target: `${state.target}`,
        close: `.viewer-comics__close`,
        content: `.viewer-comics__content`,
        medias: `.viewer-comics__medias`
    }
    const method = {
        udapteTemplateMedia: () => {
            let medias = ''
            state.comics.pages.forEach(page => {
                medias += `<div class="viewer-comics__media">
                            <img src="${state.source}/${state.comics.ref}/${page}" alt="image" />
                        </div>`
           })
           document.querySelector(ui.medias).innerHTML = medias 
        },
        open: () => {
            document.querySelector(ui.target).insertAdjacentHTML('beforeend', template.viewer)
            document.querySelector(ui.close).addEventListener('click', method.close)
            method.udapteTemplateMedia()
        },
        close: () => {
            document.querySelector(ui.viewer).remove()
        },
    }
    const template = {
        viewer: `<div class="viewer-comics">
                <div class="viewer-comics__overlay"></div>
                <div class="viewer-comics__contain viewer-comics__grid">
                    <div class="viewer-comics__settings">
                        <h5>${state.comics.title}</h5>
                        <span class="viewer-comics__close">close</span>
                    </div>
                    <div class="viewer-comics__content">
                        <div class="viewer-comics__medias"></div>
                    </div>
                </div>
            </div>`,
    }
    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}

export { ComponentViewer }