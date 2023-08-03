let signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    axios.post(`/api/signup`)
    .then(function (response) {
        console.log(response.data);
    })
})