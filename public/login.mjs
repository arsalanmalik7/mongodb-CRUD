let signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const resp = axios.post('/api/login', {
            email: email,
            password: password
        })
        console.log("resp: ", await resp.request);

        if (resp.status === 200) {
            window.location.href = './index.html';
        }

    } catch (error) {
        console.log(error)
    }

})




