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
        medias: `.viewer-comics__medias`,
        loading: `.viewer-comics__loading`
    }
    const method = {
        open: () => {
            document.querySelector(ui.target).insertAdjacentHTML('beforeend', template.viewer)

            setTimeout(() => {
                document.querySelector(ui.loading).remove()
                document.querySelector(ui.viewer).insertAdjacentHTML('beforeend', template.viewerContent)
                let medias = ''
                state.comics.pages.forEach((page, i) => {
                    medias += `<div class="viewer-comics__media">
                    <img src="${state.source}/${state.comics.chemin}/${page}" alt="image" />
                    <div class="viewer-comics__media--pages">pages ${i + 1}</div>
                    </div>`
                })
                document.querySelector(ui.medias).innerHTML = medias
                document.querySelector(ui.close).addEventListener('click', method.close)
            }, 1000);
        },
        close: () => {
            document.querySelector(ui.viewer).remove()
        },
    }
    const template = {
        overlay_loading: ``,
        viewer: `<div class="viewer-comics">
                <div class="viewer-comics__overlay"></div>
                <div class="viewer-comics__loading">loading</div>
            </div>`,
        viewerContent: `<div class="viewer-comics__contain viewer-comics__grid">
            <div class="viewer-comics__settings">
                <h5>${state.comics.title}</h5>
                <span class="viewer-comics__close">refermer la bd</span>
            </div>
            <div class="viewer-comics__content">
                <div class="viewer-comics__medias"></div>
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

export { ComponentViewer }