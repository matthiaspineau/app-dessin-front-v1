function component() {

    const state = {
        uniqId: `.comics-1`,
        prefix: 'comics',
        target: ''
    }

    const setup = {
        ui: {
            open: `.open`,
            close: `.close`,
            target: `${state.target}`
        },
        method: {
            open: () => {

            },
            close: () => {

            },
            salut: () => {
                console.log('salut')
                console.log(state.uniqId)
            },
            render: () => {
                document.querySelector(ui.target).innerHTML = template.comics
            }
        },
        template: {
            comics: `<div class="${state.prefix}">
                <div class="area-media">
                    <img src="" alt="" />
                </div>
                <div class="area-content">
                    <div>titre</div>
                    <div>le contenu de description /nle contenu de description /nle contenu de description /n </div>
                </div>
                <div class="area-action">cliquer</div>
            </div>`
        }
    }



return setup
}