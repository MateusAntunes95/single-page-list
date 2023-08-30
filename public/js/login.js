document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    axios.post('/api/login', formData)
        .then(response => {
            token = response.data.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            document.getElementById('modal_login').style.display = "none";
        })
        .catch(error => {
            console.error('Erro no login:', error.response.data);
        });
});
