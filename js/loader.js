class Image{
    static IMAGES="IMAGES"
    id;
    img;
}

function preloadImages(sources, load_callback, error_callback) {
    let counter = 0;

    function onLoad() {
        counter++;
        if (counter === sources.length) {
            load_callback()
        }
    }

    function onError() {
        counter++
        if (counter === sources.length) {
            error_callback()
        }
    }

    for(let source of sources) {
        let img = document.createElement('img');
        img.onload = onLoad;
        img.onerror = onError
        img.src = source;
    }
}

async function loadImages() {
    let repoURL = "https://github.com/usachova/pictures-for-site/blob/main/"
    let imgsURL = "https://my-json-server.typicode.com/usachova/pictures-for-site/bublik"
    let storage =  window.localStorage;
    let galleryDIV = document.getElementsByClassName("gallery-block")[0]
    addLoader(galleryDIV)

    let imgs = await fetch(imgsURL).then(response => response.json())
    let random_index = Math.floor(Math.random() * imgs.length)
    imgs.splice(random_index,1)
    storage.setItem(Image.IMAGES, JSON.stringify(imgs))

    let sources = imgs.map((img)=> repoURL+img.img+"?raw=true")
    preloadImages(sources, ()=>{
        let item = document.createElement("div")
        item.classList.add("gallery-block-item")
        let img = document.createElement("img")
        img.classList.add("gallery-block-item__img")
        item.appendChild(img)

        imgs.forEach((image, i)=>{
            item.id = image.id
            img.src = sources[i]
            galleryDIV.appendChild(item.cloneNode(true))
        })
        removeLoaders(galleryDIV)
    },
    ()=>{
        // galleryDIV.children = new HTMLCollection()
        galleryDIV.innerHTML = ""
        let msg = document.createElement("h2")
        msg.classList.add("title","page-block__title")
        msg.style.color = 'red'
        msg.textContent = "Ошибка!"
        galleryDIV.appendChild(msg)
    })

}

async function shakeRandomImages() {
    let storage =  window.localStorage;
    let imgs = JSON.parse(storage.getItem(Image.IMAGES));
    let img_id = imgs[Math.floor(Math.random() * imgs.length)].id;
    let img = document.getElementById(img_id)
    img.classList.add("shake");
    await new Promise(resolve => setTimeout(resolve, 500))
    img.classList.remove("shake")
}

function addLoader(el) {
    el.innerHTML += "        <div class=\"loader\"></div>\n"
}

function removeLoaders(el) {
    let loaderClassName = "loader"
    let loaderClasses = el.getElementsByClassName(loaderClassName)
    Array.prototype.forEach.call(loaderClasses,(loader, index) => {
        loader.style.display = "none"
    })
}

function delayedShake() {
    const submitCountdown = new Countdown(3, (seconds) => {
        let button = document.getElementById("petCatTrigger")
        button.classList.add("disabled")
        button.textContent = "Поглажу через " + seconds + "..."
    }, () => {
        shakeRandomImages()
        let button = document.getElementById("petCatTrigger")
        button.textContent = "Сделано)"
    });
}

document.addEventListener("DOMContentLoaded", loadImages);
