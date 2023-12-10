class Menu {

  static container = document.querySelector('.menu-content');
  static menu = {};

  static menuParser () {
    fetch('./data/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error ('json not found');

        }
        return response.json();

      })
      .then(data => {
        Menu.menu = data;
        console.log (Menu.menu);
      })

  }

  static init () {
    Menu.checkCard();
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
    headingPrice.textContent = `${price}`;
    descriptionPrice.append(headingPrice);

    previewDescription.append(descriptionInfo, descriptionPrice);
    return preview;

  }

  static checkCard () {
    const first = Menu.createCard('./img/menu/coffee-2.jpg', '1', '1','1')
    Menu.container.append(first);
  }


}
