let selectElm = document.querySelector('select');
let logo = document.querySelector('img');

selectElm.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElm.value;
    if (current == 'dark') {
        document.body.classList.add('dark-mode');
        logo.src="byui-logo-white.png";
    } else {
        document.body.classList.remove('dark-mode');
        logo.src="byui-logo-blue.webp"; 
    }
}