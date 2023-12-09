class Slider {
  static buttonPrev = document.querySelector('#slider-button-prev');
  static buttonNext = document.querySelector('#slider-button-next');
  static container = document.querySelector('.slider-items');
  static images = document.querySelectorAll('.item');
  static index= 0;


  static init () {
    this.buttonNext.addEventListener('click', Slider.nextSlide);
    this.buttonPrev.addEventListener('click', Slider.previousSlide);

  }

  static nextSlide () {
    if (Slider.index < Slider.images.length - 1 && Slider.index >= 0) {
      Slider.index += 1;
    }
    Slider.slideMove(Slider.index);
    // return currentIndex;
  }

  static previousSlide () {
    if (Slider.index > 0 && Slider.index <= Slider.images.length -1) {
      Slider.index -= 1;
    }
    Slider.slideMove(Slider.index);
  }

  static slideMove (index) {
    const translateXValue = index * 480;
    Slider.container.style.transform = `translateX(-${translateXValue}px)`;

  }

}

