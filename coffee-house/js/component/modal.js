class DialogCreator {

  static modal =document.querySelector('#modal');
  static preview;
  static category;

  static  init (category) {
    DialogCreator.category = category;
    console.log('init category', DialogCreator.category)
  }


  static  createDialog (item) {
    // console.log(item);
    // DialogCreator.modal.textContent = `${item.description}`;
    // DialogCreator.modal.showModal();
  }
}
