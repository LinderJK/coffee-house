class DialogCreator {

  static modal = document.querySelector('#modal');
  static buttonClose = document.querySelector('.modal-close');
  static configurationSizeTabs = document.querySelectorAll('#tab-size button');
  static configurationAddTabs = document.querySelectorAll('#tab-additives button');
  static isOpen = false;
  static preview;
  static category;
  static totalPriceDiv = document.querySelector('#modal-total-price');
  static totalPrice = 0.00;

  static  init (category) {
    DialogCreator.category = category;
    Menu.container.addEventListener('click', (event)=> DialogCreator.selectClickItem(event));
    DialogCreator.buttonClose.addEventListener('click', (event)=> DialogCreator.dialogClose());
    DialogCreator.configurationSizeTabs.forEach(element=> element.addEventListener('click', (event)=> DialogCreator.buttonSelect('priceSize', element)))
    DialogCreator.configurationAddTabs.forEach(element=> element.addEventListener('click', (event)=> DialogCreator.buttonSelect('priceAdd', element)))



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

  //TODO: Lol so hardcoded go fix this (no time)
  static changeDialog (selectedItem) {
    const currentItem = selectedItem;
    const additives = selectedItem.additives;
    const size = selectedItem.sizes;
    console.log(additives)
    this.modal.querySelector('.modal__image img').src = selectedItem.link;
    this.modal.querySelector('.modal-product-name').textContent = selectedItem.name;
    this.modal.querySelector('.modal-product-description').textContent = selectedItem.description;

    const tabsAdditives = this.modal.querySelectorAll('#tab-additives .tab-item__name');
    for (let i = 0; i < tabsAdditives.length; i ++) {
      tabsAdditives[i].textContent = additives[i].name;
      tabsAdditives[i].setAttribute('price', additives[i]['add-price']);
    }

    const tabsSize = this.modal.querySelectorAll('#tab-size .tab-item__name');
    for (let i = 0; i < tabsSize.length; i++) {
      const sizeKey = Object.keys(size)[i];
      if (sizeKey) {
        tabsSize[i].textContent = `${size[sizeKey].size}`;
        tabsSize[i].setAttribute('price',size[sizeKey]['add-price'])
      } else {
        break;
      }
    }

    DialogCreator.totalPriceDiv.textContent = '$'+currentItem.price;
    DialogCreator.totalPrice =  +currentItem.price;

  }

  static buttonSelect (type, elem) {
    console.log('buttonSelect')
    console.log(type,elem);
    if (type === 'priceSize') {
      DialogCreator.clearButton();
      elem.classList.toggle('tab-item--active');
      elem.setAttribute('disabled', true)
      DialogCreator.changeTotalPrice();
    }
    else if (type === 'priceAdd') {
      elem.classList.toggle('tab-item--active');
      DialogCreator.changeTotalPrice();
    }

  }

  static changeTotalPrice () {
    let fullPrice = DialogCreator.totalPrice;
    DialogCreator.configurationSizeTabs.forEach(elem => {
      if (elem.classList.contains('tab-item--active')) {
        const price = elem.querySelector('.tab-item__name').getAttribute('price');
        console.log(price, typeof price);
         fullPrice+= +price;
      }
    })

    DialogCreator.configurationAddTabs.forEach(elem => {
      if (elem.classList.contains('tab-item--active')) {
        const price = elem.querySelector('.tab-item__name').getAttribute('price');
        console.log(price, typeof price);
        fullPrice+= +price;
      }
    })

    DialogCreator.totalPriceDiv.textContent = '$'+ fullPrice;
  }

  static clearButton () {
    DialogCreator.configurationSizeTabs.forEach(elem => {
      elem.classList.remove('tab-item--active');
      elem.removeAttribute('disabled');
    })

    DialogCreator.configurationAddTabs.forEach(elem => {
      elem.classList.remove('tab-item--active');
      elem.removeAttribute('disabled');
    })


  }

  static dialogOpen () {
    DialogCreator.scrollControl(true);
    DialogCreator.modal.showModal()

  }

  static dialogClose () {
    DialogCreator.scrollControl(false);
    DialogCreator.modal.close();
    DialogCreator.totalPrice = 0;
    DialogCreator.clearButton();
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
