// import '../lib/bootstrap/bootstrap.min.css'
// import './css/base.css'
// import './css/style.css'
// import './css/nav.css'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="topbar">
        <ul class="nav-ul">
            <li class="nav-li"><a href="#" class="r-link" data-link="/" data-view="Home">Home</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/about" data-view="About">About</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/contact" data-view="Contact">Contact</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/groups" data-view="Contact">Groups</a></li>
            <li class="nav-li"><a href="#" class="r-link" data-link="/comics" data-view="Contact">Comics</a></li>
        <ul>
    </div>
    <div id="main" class="main-view"></div>
  </div>
`

// app - routing
const routes = {
    "/": { title: "Home", render: 'ViewHome' },
    "/about": { title: "About", render: 'ViewAbout' },
    "/contact": { title: "Contact", render: 'ViewContact' },
    "/groups": { title: "Groups", render: 'ViewGroups' },
    "/comics": { title: "Comics", render: 'ViewComics' },
};

function router() {
    let view = routes[location.pathname];
    console.log(view)
    if (view) {
        document.title = view.title;
        import(/* @vite-ignore */ './view/'+ view.render + '/'+ view.render + '.js')
            .then(module => {
            module.initView();
            })
            .catch(err => {
            console.error(err.message);
            });
    } else {
        history.replaceState("", "", "/");
        router();
    }
};


window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);

for (const link of document.querySelectorAll(".r-link")) {
    link.addEventListener("click", e => {
        e.preventDefault();
        history.pushState("", "", e.target.dataset.link);
        router();
    });
}