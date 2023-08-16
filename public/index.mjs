let signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await axios.post('/api/login', {
            email: email,
            password: password
        })

        console.log("resp: ", response.status);

        if ( (response.status) === 200) {
            window.location.href = './main.html';
        }

    } catch (response) {
        console.log(response)
    }

})




