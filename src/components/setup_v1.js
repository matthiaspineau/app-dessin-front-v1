function component() {
    
        const state = {
            uniqId: `.comics-1`,
            prefix: 'comics',
            target: ''
        }
        const ui = {
            open: `.open`,
            close: `.close`,
            target: `${state.target}`
        }
        const method = {
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
        }
        const template = {
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
        const setup = {
            state: state,
            ui: ui,
            method: method,
            template: template
        }
    
        return setup
    }