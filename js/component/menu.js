class Menu {

  static container = document.querySelector('.menu-content');
  static tabItem = document.querySelectorAll('.menu-tab .tab-item');
  static button = document.querySelector('#download');
  static menu;
  // static map;
  static menuCoffee;
  static menuTea;
  static menuDessert ;
  static selectedCategory = [];
  static itemsToShow = 4;
  static itemsLoaded = Menu.itemsToShow;

  static async jsonParse () {
    try {
      const response = await fetch('./data/products.json');
      if (!response.ok) {
        throw new Error ('json not found');
      }
      Menu.menu = await response.json();
      // Menu.map = Menu.createMap(Menu.menu);
      } catch (e) {
      console.error('error');
    }
  }

  static async init() {
    await Menu.jsonParse();
    Menu.menuCoffee = Menu.sortMenu('coffee');
    Menu.menuTea = Menu.sortMenu('tea');
    Menu.menuDessert = Menu.sortMenu('dessert');
    Menu.selectedCategory = Menu.menuCoffee;
    Menu.addListeners();
    Menu.updateView(Menu.selectedCategory);
    DialogCreator.init(Menu.selectedCategory);

  }

  static  loadItem () {
    Menu.itemsToShow +=4;
    console.log(Menu.selectedCategory);
    Menu.updateView(Menu.selectedCategory);
  }

  static updateView (category) {
    const itemsToShow = Menu.isSmallScreen() ? Menu.itemsToShow: category.length;
    const items = category.slice(0, itemsToShow);
    Menu.clearMenu();
    Menu.createCardList(items);

    if (category.length <= itemsToShow) {
      Menu.button.style.display = 'none';
    } else {
      Menu.button.style.display = 'flex';
    }

  }

  static isSmallScreen () {
    return window.innerWidth <= 768;
  }


  static addListeners() {
    Menu.tabItem.forEach( item => item.addEventListener('click', (evt)=> Menu.changeCategory(evt)));
    Menu.button.addEventListener('click', Menu.loadItem);


  }

  static changeCategory (event) {
    if (!event) {
      return;
    }
    const clickedCategory = event.currentTarget;
    Menu.tabItem.forEach(item => {
      if (item === clickedCategory) {
        item.classList.add('tab-item--active');
      } else {
        item.classList.remove('tab-item--active');
      }
    });


    switch (clickedCategory.querySelector('.tab-item__name').textContent) {
      case 'Coffee':
        Menu.selectedCategory = Menu.menuCoffee;
        break;
      case 'Tea':
        Menu.selectedCategory = Menu.menuTea;
        break;
      case 'Dessert':
        Menu.selectedCategory = Menu.menuDessert;
        break;
    }

    Menu.clearMenu();
    Menu.itemsToShow = 4;
    Menu.updateView(Menu.selectedCategory);
    DialogCreator.init(Menu.selectedCategory);

  }

  static sortMenu (category) {
    return Menu.menu.filter(item => item.category === `${category}`);
  }

  static createCardList (category) {
    category.forEach(item => {
      const card = Menu.createCard(item.link, item.name, item.description, item.price);
      card.dataset.itemName = item.name;
      Menu.container.append(card);
    })
  }

  static createCard (imgLink, name, description,price) {
    //Создание структуры
    const preview = document.createElement('div');
    preview.className = 'preview';
    const previewImage = document.createElement('div');
    previewImage.className = 'preview__image';
    const previewDescription = document.createElement('div');
    previewDescription.className = 'preview__description';
    preview.append(previewImage, previewDescription);

    // Создание изображения
    const image = document.createElement('img');
    image.src = `${imgLink}`;
    previewImage.append(image);

    const descriptionInfo = document.createElement('div');
    descriptionInfo.className = 'preview__description-info';
    // Создание заголовка h3
    const heading = document.createElement('h3');
    heading.textContent = `${name}`
    // Создание абзаца p
    const paragraph = document.createElement('p');
    paragraph.textContent = `${description}`;
    descriptionInfo.append(heading, paragraph);

    // Создание цены
    const descriptionPrice = document.createElement('div');
    descriptionPrice.className='preview__description-price';
    const headingPrice = document.createElement('h3');
    headingPrice.textContent = `$${price}`;
    descriptionPrice.append(headingPrice);

    previewDescription.append(descriptionInfo, descriptionPrice);
    return preview;

  }







  //TODO: ADD ANIMATION
  static clearMenu () {
    Menu.container.innerHTML = '';
  }


  // static createMap (data) {
  //   const map = new Map();
  //   data.forEach(item => map.set(item.name, item));
  //   return map;
  //
  // }


}
