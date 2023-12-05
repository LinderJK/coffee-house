const button = document.querySelector('.button-burger');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-link');

function toggle () {
  button.classList.toggle('button-burger--active');
  nav.classList.toggle('burger--active');
  nav.append(menu);
  menu.style.display = 'block';
  scrollControl();
}

function scrollControl () {
  if (nav.classList.contains('burger--active')) {
    document.body.classList.add('no-scroll');
  }
  else {
    document.body.classList.remove('no-scroll');
  }
}

button.addEventListener('click', toggle );
