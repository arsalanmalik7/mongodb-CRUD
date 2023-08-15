
let posts = document.querySelector("#allPosts");
let createPost = document.querySelector("#createPost");

const axiosInstance = axios.create({ baseURL: '/api' });

axiosInstance.interceptors.response.use((response) => {
    console.log('response', response)
    document.cookie
    if (response.status === 401) {
        // redirect to login
        window.location.href = './login.html'
    }
})

createPost.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = event.target[0].value;
    let text = event.target[1].value;
    axiosInstance.post('/post', {
        title: title,
        text: text
    })
        .then(function (response) {
            let postCreated = document.createElement("div");
            let responseText = document.createElement("h1");
            postCreated.setAttribute("class", "postCreated")
            responseText.setAttribute("class", "responseText")
            responseText.innerText = response.data;
            postCreated.appendChild(responseText);

            let parent = event.target;
            parent.appendChild(postCreated)
            let grandParent = event.target.parentNode.parentNode;
            grandParent.style.overflow = 'hidden';


            setTimeout(() => {
                let postCreated = document.querySelector(".postCreated");
                grandParent.style.overflow = 'auto';
                postCreated.remove();
            }, 2000);
            getAllPosts();
        })


})
window.getAllPosts = function () {

    axiosInstance.get('/posts', {
        withCredentials: true
    })
        .then(function (response) {
            let allPosts = document.querySelector("#allPosts");
            let postHtml = '';
            response.data.map((eachPost) => {
                postHtml +=
                    `<div id='card-${eachPost.id}' class="post-card">
                <h3 class="titlePost">${eachPost.title}</h3>
                <p class="textPost"> ${eachPost.text} </p>
                <button  class="btn btn-primary" onclick="deletePost('${eachPost.id}') ">Delete</button>
                <button class="btn btn-primary" onclick="editPost('${eachPost.id}','${eachPost.title}','${eachPost.text}', )" >Edit</button>
            </div> 
            <br />`
            })
            allPosts.innerHTML = postHtml
        })
        .catch(function (response) {
            if (response.status === 401) {
                window.location.href = './login.html'
            }
        })
}
window.deletePost = function (postId) {

    console.log("delete: ", postId);

    axiosInstance.delete(`/post/${postId}`)
        .then(function (response) {


            let postCreated = document.createElement("div");
            let responseText = document.createElement("h1");
            postCreated.setAttribute("class", "postCreated")
            responseText.setAttribute("class", "responseText")
            responseText.innerText = response.data;
            postCreated.appendChild(responseText);
            let form = document.querySelector("#createPost");
            let parent = form.parentNode.parentNode;
            parent.appendChild(postCreated)
            parent.style.overflow = 'hidden';
            setTimeout(() => {
                let postCreated = document.querySelector(".postCreated");
                parent.style.overflow = 'auto';
                postCreated.remove();
            }, 2000);
            getAllPosts();

        })
}

window.editPost = function (postId, title, text) {

    let editForm = document.createElement("form");
    editForm.setAttribute("onsubmit", `updatePost('${postId}')`);
    editForm.setAttribute("class", "editForm")
    let titleofPost = document.createElement("input");
    titleofPost.setAttribute("value", `${title}`)
    titleofPost.setAttribute("id", `title-${postId}`)
    titleofPost.setAttribute("class", `titleofPost`)

    let textofPost = document.createElement("textarea");
    textofPost.value = text;
    textofPost.setAttribute("cols", 10)
    textofPost.setAttribute("rows", 8)
    textofPost.setAttribute("id", `text-${postId}`)
    textofPost.setAttribute("class", `textofPost`)
    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("class", "btn btn-primary")
    saveBtn.innerHTML = "Save Post";

    editForm.appendChild(titleofPost);
    editForm.appendChild(textofPost);
    editForm.appendChild(saveBtn);

    let form = document.querySelector("#createPost");
    let parent = form.parentNode.parentNode;

    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "formDiv");

    formDiv.appendChild(editForm);
    parent.appendChild(formDiv);

    parent.style.overflow = 'hidden';


}

window.updatePost = function (postId) {

    parent.sty.overflow = 'auto';
    const updatedTitle = document.querySelector(`#title-${postId}`).value;
    const updatedText = document.querySelector(`#text-${postId}`).value;

    axiosInstance.put(`/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    })
        .then(function (response) {
            console.log(response.data);

            getAllPosts();
        })
        .catch(function (error) {
            // handle error
            console.log("error in post submission");
        })
}


