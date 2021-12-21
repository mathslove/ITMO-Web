class Post{
    static POSTS='POSTS';
    constructor(author, text) {
        this.author = author;
        this.text = text;
    }
}

function getScrollHeight(elm){
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
}

function onExpandableTextareaInput({ target:elm }){
    if( !elm.classList.contains('autoExpand') || !elm.nodeName === 'TEXTAREA' ) return
    var minRows = elm.getAttribute('data-min-rows')|0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)

    elm.rows = minRows
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
    elm.rows = minRows + rows - 1
}

function makePost(post){
    let newPost = "<div class=\"feedback-post\">\n" +
        "\t<p class=\"feedback-post__author\">"+post.author+"</p>\n" +
        "\t<p class=\"feedback-post__text\">\n"+ post.text +"\n\t</p>\n" +
        "</div>";
    document.getElementsByClassName("feedback-posts-block")[0].innerHTML += newPost;
    let posts = document.getElementsByClassName("feedback-posts-block")[0]
    if (posts.style.visibility === "hidden"){
        posts.style.visibility = "visible";
    }
}

function loadPosts(){
    let storage =  window.localStorage;
    if (storage.getItem(Post.POSTS) == null){
        storage.setItem(Post.POSTS, JSON.stringify([]));
    }
    let posts = JSON.parse(storage.getItem(Post.POSTS));
    posts.forEach((post, index)=>{
        makePost(JSON.parse(post));
    })
}

function addPostToStorage(post){
    let storage =  window.localStorage;
    let postJson = JSON.stringify(post);
    var posts = JSON.parse(storage.getItem(Post.POSTS) || "[]");
    posts.push(postJson);
    storage.setItem(Post.POSTS, JSON.stringify(posts));
}

function onFeedbackPost() {
    let textarea = document.getElementsByClassName("feedback-form__textarea")[0];
    let post = new Post("Anon", textarea.value);
    makePost(post);
    addPostToStorage(post);
    textarea.value = "";
}

document.addEventListener("DOMContentLoaded",loadPosts);
document.addEventListener('input', onExpandableTextareaInput)
document.addEventListener('onclick', onFeedbackPost)