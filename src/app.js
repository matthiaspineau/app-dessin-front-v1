// import '../lib/bootstrap/bootstrap.min.css'
// import './css/base.css'
// import './css/style.css'
// import './css/nav.css'
// import { initView as viewHome } from "./view/ViewHome/ViewHome.js";
// import { initView as ViewAbout } from "./view/ViewAbout/ViewAbout.js";
// import { initView as ViewContact } from "./view/ViewContact/ViewContact.js";
// import { initView as ViewComics } from "./view/ViewComics/ViewComics.js";
// import { initView as ViewGroups } from "./view/ViewGroups/ViewGroups";


document.querySelector('#app').innerHTML = `
    <div class="topbar">
        <ul class="nav-ul">
            <li class="nav-li"><a href="#" class="r-link" data-link="/" data-view="Home">Home</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/comics" data-view="Contact">Comics</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/about" data-view="About">About</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/contact" data-view="Contact">Contact</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/groups" data-view="Contact">Groups</a></li>
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
        case 'About':
            path = './view/ViewAbout/ViewAbout.js'
        break;
        case 'Contact':
            path = './view/ViewContact/ViewContact.js'
        break;
        case 'Comics':
            path = './view/ViewComics/ViewComics.js'
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