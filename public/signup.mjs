let signupForm = document.querySelector(".signup");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let firstName = event.target[0].value;
    let lastName = event.target[1].value;
    let email = event.target[2].value;
    let password = event.target[3].value;
    axios.post('/api/signup', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
        .then(function (response) {
            console.log(response.data.message);
            let postCreated = document.createElement("div");
            let responseText = document.createElement("h1");
            postCreated.setAttribute("class", "postCreated")
            responseText.setAttribute("class", "responseText")
            responseText.innerText = response.data.message;
            console.log(response)
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


        }).catch(function (error) {
            console.log(error.response.data.message)
            let errorMsg = document.querySelector("#result");
            errorMsg.style.display = "block";
            errorMsg.innerHTML = error.response.data.message;
            setTimeout(() => {
                let errorMsg = document.querySelector("#result");
                errorMsg.style.display = "none";
            }, 5000);
        })

})