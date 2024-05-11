const authorizeButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");


document.addEventListener("DOMContentLoaded", authorizeUser);
window.addEventListener("popstate", authorizeUser);

authorizeButton.onclick = () => {
    window.location.href = '/auth/github';
}

logoutButton.onclick = () => {
    window.location.href = '/logout';
}

function authorizeUser() {
    fetch('/check-session')
    .then(response => response.json())
    .then(data => {
        if (data.isLoggedIn) {
            popupLogin.classList.remove('logged-out');
            main.classList.remove('active');
        } else {
            popupLogin.classList.add('logged-out');
    main.classList.add('active');
        }
    })
    .catch((error) => {
        popupLogin.classList.add('logged-out');
        main.classList.add('active');
        console.error(error);
      });
}
