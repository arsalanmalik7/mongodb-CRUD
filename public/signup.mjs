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
            console.log(response);


        }).catch(function (error) {
            console.log(error.response.data.message)
            let errorMsg = document.querySelector("#result");
            errorMsg.innerHTML = error.response.data.message;
        })

})