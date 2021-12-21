
window.addEventListener("load", (event) => {
    document.getElementById("meta-info").innerHTML = Number((performance.now()/1000).toFixed(2)) + "s";
});

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};
// window.addEventListener("load", (event) =>{
//     var parser = document.createElement('a');
//     parser.href = document.location.href;
//     let active_menu_item = parser.pathname.split('/')[2].split('.')[0];
//     let items = document.getElementsByClassName("header-inner-menu__item");
//     for (var i = 0; i < items.length; i++){
//     //    бред не так всё должно быть, лучше уже захардкодить
//     }
// });
