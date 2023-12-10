class Menu {

  static container = document.querySelector('.menu-content');
  static tabItem = document.querySelectorAll('.tab-item');

  static menu;
  // static map;
  static menuCoffee;
  static menuTea;
  static menuDessert ;

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
    Menu.menuCoffee = Menu.sortCategory('coffee');
    Menu.menuTea = Menu.sortCategory('tea');
    Menu.menuDessert = Menu.sortCategory('dessert');
    console.log(Menu.menuCoffee, Menu.menuTea, Menu.menuDessert);
    console.log(Menu.menu)
    Menu.addListeners();
    Menu.createCategoryList(Menu.menuCoffee);

  }


  static addListeners() {
    Menu.tabItem.forEach( item => item.addEventListener('click', (evt)=> Menu.changeCategory(item, evt)));
  }

  static changeCategory (ClickedItem, event) {
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

    let selectedCategory = [];
    switch (clickedCategory.querySelector('.tab-item__name').textContent) {
      case 'Coffee':
        selectedCategory = Menu.menuCoffee;
        Menu.createCategoryList(Menu.menuCoffee);
        break;
      case 'Tea':
        selectedCategory = Menu.menuTea;
        break;
      case 'Dessert':
        selectedCategory = Menu.menuDessert;
        break;
    }


    Menu.clearMenu ();
    Menu.createCategoryList(selectedCategory);
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

  static sortCategory (category) {
    return Menu.menu.filter(item => item.category === `${category}`);
  }

  static createCategoryList (data) {
    data.forEach(item => {
      const card = Menu.createCard(item.link, item.name, item.description, item.price);
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




}
