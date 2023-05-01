document.querySelector('#app').innerHTML = `
    <div class="topbar">
        <ul class="nav-ul">
            <li class="nav-li"><a href="#" class="r-link" data-link="/" data-view="Home">Home</a></li>
        <ul>
    </div>
    <div id="main" class="main-view"></div>
`


// --------------------------------------------------------------
// old
// app - routing
const routes = {
    "/": { title: "Home", render: 'ViewHome' },
    "/about": { title: "About", render: 'ViewAbout' },
    "/contact": { title: "Contact", render: 'ViewContact' },
    "/groups": { title: "Groups", render: 'ViewGroups' },
    "/comics": { title: "Comics", render: 'ViewComics' },
};

function router(link) {

    let path = ''

    switch (routes[link].title) {
        case 'Home':
            path = './view/ViewHome/ViewHome.js'
        break;
        default:
            path = './view/ViewHome/ViewHome.js'
            break;
    }

    import(path)
        .then(module => {
            module.initView();
        })
        .catch(err => {
            console.error(err.message);
        });
};


window.addEventListener("DOMContentLoaded", router('/'));

for (const link of document.querySelectorAll(".r-link")) {
    link.addEventListener("click", e => {
        e.preventDefault();
        history.pushState("", "", e.target.dataset.link);
        router(e.target.dataset.link);
    });
}