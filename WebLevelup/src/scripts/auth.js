document.addEventListener("DOMContentLoaded", authorizeUser);
window.addEventListener("popstate", authorizeUser);

loginButton.onclick = () => {
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
            login.style.visibility = 'hidden';
            main.classList.remove('blur');
        } else {
            login.style.visibility = 'visible';
            main.classList.add('blur');
        }
    })
    .catch((error) => {
        login.style.visibility = 'visible';
        main.classList.add('blur');
        console.error(error);
      });
}
