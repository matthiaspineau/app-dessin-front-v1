export function storeComics() {
    document.querySelector('#main').innerHTML = `${template.view}
                                                <div class="bd"></div>
                                                <div class="viewer-bd"></div>`;

    viewComics()
}