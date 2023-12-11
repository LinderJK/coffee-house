class DialogCreator {

  static modal = document.querySelector('#modal');
  static isOpen = false;
  static preview;
  static category;

  static  init (category) {
    DialogCreator.category = category;
    Menu.container.addEventListener('click', (event)=> DialogCreator.selectClickItem(event));


  }


  static  selectClickItem (event) {
      const clicked = event.target.closest('.preview');
      if (clicked) {
        const itemName = clicked.dataset.itemName;
        const selectedItem = DialogCreator.category.find(item => item.name === itemName);

        if (selectedItem) {
          // DialogCreator.createDialog(selectedItem);
          console.log(selectedItem)
        }
        else   {
          console.log('click item not found')
        }
      }


  }
  static  createDialog (data) {


    //Создание структуры
    const modal = document.createElement('div');
    modal.className = 'modal-body';
    const imageContainer = document.createElement('div');
    imageContainer.className = 'modal__image';
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'modal__description';
    modal.append(imageContainer, descriptionContainer);

    // Создание изображения
    const image = document.createElement('img');
    image.src = `${data.link}`;
    imageContainer.append(image);

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
    return modal;


    // DialogCreator.modal.textContent = `${data.description}`;
    // DialogCreator.dialogOpen();





  }

  static dialogOpen () {
    DialogCreator.scrollControl(true);
    DialogCreator.modal.showModal()
  }

  static dialogClose () {
    DialogCreator.scrollControl(false);
    DialogCreator.modal.close();
  }


  static scrollControl (flag){
    if (flag) {
      document.body.classList.add('no-scroll');
    }
    else {
      document.body.classList.remove('no-scroll');
    }

  }
}
