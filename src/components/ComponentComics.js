function ComponentComics(options) {
    const state = {
        source: options.source != undefined ? options.source : '',
        uiId: options.uiId != undefined ? options.uiId : Date.now(),
        index: options.index != undefined ? options.index : Date.now(),
        prefix: 'comics',
        target: options.target,
        data: options.data,
    }
    const ui = {
        open: `.open`,
        close: `.close`,
        target: `${state.target}`,
        btn1: `.btn-1__${state.index}`
    }
    const template = {
        comics: `<div class="${state.prefix} comics-grid" data-comics-ref="${state.data.ref}">
            <div class="area-media">
                <img src="${state.source}/${state.data.ref}/${state.data.affiche}" alt="" />
            </div>
            <div class="area-content">
                <div>${state.data.title}</div>
                <div>${state.data.description}</div>
            </div>
            <div class="area-action">
                <span class="btn-1__${state.index} showComics"
                    data-comics-ref="${state.data.ref}"
                    >
                    cliquer
                </span>
            </div>
        </div>`
    }
    const setup = {
        state: state,
        ui: ui,
        template: template
    }

    return setup
}

export { ComponentComics }