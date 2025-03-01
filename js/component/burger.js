class BurgerMenu {
  static  button = document.querySelector('.button-burger');
  static  nav = document.querySelector('.nav');
  static  menu = document.querySelector('.menu-link');
  static  navLink = document.querySelectorAll('.nav__item');

  static menuDefaultParent = document.querySelector('.header__navigation');
  static menuDefaultDisplay = BurgerMenu.menu.style.display;

  static isOpen = false;


  static init (){
    BurgerMenu.isOpen ? BurgerMenu.close() : BurgerMenu.open();
  }

  static open () {
    BurgerMenu.button.classList.add('button-burger--active');
    BurgerMenu.nav.classList.add('burger--active');
    BurgerMenu.isOpen = true;
    BurgerMenu.menuMove();
    BurgerMenu.scrollControl();
    BurgerMenu.LinkListener();

  }

  static close () {
    BurgerMenu.button.classList.remove('button-burger--active');
    BurgerMenu.nav.classList.remove('burger--active');
    BurgerMenu.isOpen = false;
    BurgerMenu.menuMove();
    BurgerMenu.scrollControl();
    BurgerMenu.LinkListener();
  }

  //Moving the menu to the navigation. I was reluctant to change the markup
  static menuMove () {
    if (BurgerMenu.isOpen) {
      BurgerMenu.nav.append(BurgerMenu.menu);
      BurgerMenu.menu.style.display = 'block';

  }
  else {
      BurgerMenu.menuDefaultParent.append(BurgerMenu.menu);
      BurgerMenu.menu.style.display = BurgerMenu.menuDefaultDisplay;
  }

  }

  static LinkListener (flag) {
    BurgerMenu.navLink.forEach(element => {
      if (BurgerMenu.isOpen) {
        element.addEventListener('click', BurgerMenu.close);
      }
      else {
        element.removeEventListener('click', BurgerMenu.close);
      }
    })
  }

  static scrollControl (){
  if (BurgerMenu.isOpen) {
    document.body.classList.add('no-scroll');
  }
  else {
    document.body.classList.remove('no-scroll');
  }

  }

}

BurgerMenu.button.addEventListener('click', BurgerMenu.init);



