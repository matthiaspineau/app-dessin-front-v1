document.querySelector('#app').innerHTML = `
    <div class="navigation">
        <div class="nav-mobile">
            <div class="nav-mobile__btn">Menu</div>
            <ul class="nav-ul">
                <li class="nav-li"><a href="#" class="r-link" data-link="/" data-view="Home">Home</a></li>
                <li class="nav-li"><a href="#" class="r-link" data-link="/comics" data-view="Comics">Comics</a></li>
                <li class="nav-li"><a href="#" class="r-link" data-link="/gallery" data-view="Gallery">Gallery</a></li>
            <ul>
        </div>
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
    "/gallery": { title: "Gallery", render: 'ViewGallery' },
    "/collection": { title: "Collection", render: 'ViewCollection' },
};

function router(link) {

    let path = ''

    switch (routes[link].title) {
        case 'Home':
            path = './view/ViewHome/ViewHome.js'
        break;
        case 'Comics':
            path = './view/ViewComics/ViewComics.js'
            break;
        case 'Gallery':
            path = './view/ViewGallery/ViewGallery.js'
        break;
        default:
            path = './view/ViewHome/ViewHome.js'
            break;
    }
    closeNavMobile()
    console.log(path)
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
        // history.pushState("", "", e.target.dataset.link);
        router(e.target.dataset.link);
    });
}

// window.addEventListener('popstate', function (event) {
// 	// Log the state data to the console
// 	console.log(event.state);
// });




// mobile nav
document.querySelector('.nav-mobile__btn').addEventListener('click', toggleNavMobile)

function toggleNavMobile() {
    let navMobile = document.querySelector('.nav-mobile')

    if (navMobile.classList.contains('is-open')) {
        navMobile.classList.remove('is-open')
    } else {
        navMobile.classList.add('is-open')
    }
}

function closeNavMobile() {
    document.querySelector('.nav-mobile').classList.remove('is-open')
}