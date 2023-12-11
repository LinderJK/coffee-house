class DialogCreator {

  static modal = document.querySelector('#modal');
  static buttonClose = document.querySelector('.modal-close');
  static isOpen = false;
  static preview;
  static category;
  static totalPrice = 0;

  static  init (category) {
    DialogCreator.category = category;
    Menu.container.addEventListener('click', (event)=> DialogCreator.selectClickItem(event));
    DialogCreator.buttonClose.addEventListener('click', (event)=> DialogCreator.dialogClose());


  }


  static  selectClickItem (event) {
      const clicked = event.target.closest('.preview');
      if (clicked) {
        const itemName = clicked.dataset.itemName;
        const selectedItem = DialogCreator.category.find(item => item.name === itemName);

        if (selectedItem) {
          DialogCreator.changeDialog(selectedItem);
          console.log(selectedItem)
          DialogCreator.dialogOpen();
        }
        else   {
          console.log('click item not found')
        }
      }


  }

  //TODO: hardcoded go fix this
  static changeDialog (selectedItem) {
    const currentItem = selectedItem;
    const additives = selectedItem.additives;
    const size = selectedItem.sizes;
    console.log(additives, size)
    this.modal.querySelector('.modal__image img').src = selectedItem.link;
    this.modal.querySelector('.modal-product-name').textContent = selectedItem.name;
    this.modal.querySelector('.modal-product-description').textContent = selectedItem.description;

    const tabsAdditives = this.modal.querySelectorAll('#tab-additives .tab-item__name');
    for (let i = 0; i < tabsAdditives.length; i ++) {
      tabsAdditives[i].textContent = additives[i].name;
    }

    const tabsSize = this.modal.querySelectorAll('#tab-size .tab-item__name');
    for (let i = 0; i < tabsSize.length; i ++) {
      tabsAdditives[i].textContent = additives[i].name;
    }

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
