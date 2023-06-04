function ComponentComics(options) {
    const state = {
        source: options.source != undefined ? options.source : '',
        uiId: options.uiId != undefined ? options.uiId : Date.now(),
        prefix: 'comics',
        target: options.target,
        // comics: options.data,
        comicsList: options.comicsList != undefined ? options.comicsList : [],
    }
    const ui = {
        open: `.open`,
        close: `.close`,
        target: `${state.target}`,
    }
    const method = {
        render: () => {
            let html = ''
            state.comicsList.forEach(comics => {
                html += method.createComicsCards(comics)
            });
            document.querySelector(ui.target).innerHTML = html
        },
        createComicsCards: (item) => {
            let html = `<div class="comics-component comics-grid" data-comics-ref="${item.ref}">
                <div class="area-media">
                    <div class="area-media__content">
                        <img src="${state.source}/${item.ref}/${item.affiche}" alt="" />
                    </div>
                </div>
                <div class="area-content">
                    <div>${item.title}</div>
                    <div>${item.description}</div>
                </div>
                <div class="area-action">
                    <span class="showComics"
                        data-comics-ref="${item.ref}"
                        >
                        cliquer
                    </span>
                </div>
            </div>`

            return html
        },
    }
    const template = {
        comicsWrapper: ``,
    }
    const setup = {
        state: state,
        ui: ui,
        method: method,
        template: template
    }

    return setup
}

export { ComponentComics }