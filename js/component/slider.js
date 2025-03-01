class Slider {
  static buttonPrev = document.querySelector('#slider-button-prev');
  static buttonNext = document.querySelector('#slider-button-next');
  static container = document.querySelector('.slider-items');
  static images = document.querySelectorAll('.item');
  static control = document.querySelectorAll('.slider-control__item');
  static activeProgressBar = Slider.control[0].querySelector('.slider-control__item-progress');
  // static wrapper = document.querySelector('.slider-wrapper');

  static index= 0;
  static interval = 5000;

  static timer;
  static progressBarWidth = 0;
  static progressBarInterval;

  static touchStartX = 0;
  static touchEndX = 0;

  // static remainingTime= 0;
  // static pauseStartTime = 0;
  // static containerWidth = 0;



  static init () {
    this.buttonNext.addEventListener('click', Slider.nextSlide);
    this.buttonPrev.addEventListener('click', Slider.previousSlide);
    this.container.addEventListener('touchstart', Slider.handleTouchStart);
    // this.container.addEventListener('touchmove', Slider.handleTouchMove);
    this.container.addEventListener('touchend', Slider.handleTouchEnd);
    this.container.addEventListener('mousedown', Slider.stopSlider);
    this.container.addEventListener('mouseup', Slider.moveSlider);
    // window.addEventListener('resize', Slider.updateSize);
    this.autoPlay();
    this.startProgressBar();

  }

  //TODO: resize slider

  // static updateSize (event) {
  //   Slider.containerWidth = Slider.container.offsetWidth;
  //   Slider.wrapper.style.maxWidth = `${Slider.containerWidth}px`;
  //   console.log(Slider.containerWidth);
  //   // this.autoPlay();
  //   // this.startProgressBar();
  // }


  static handleTouchStart (event) {
    Slider.touchStartX = event.touches[0].clientX;

  }

  static handleTouchEnd (event) {
    Slider.touchEndX = event.changedTouches[0].clientX;
    const delta = Slider.touchEndX - Slider.touchStartX;
    console.log(delta);
    if (delta > 100) {
      Slider.previousSlide();
    }
    else if (delta < -100) {
      Slider.nextSlide();
    }
    Slider.touchStartX = 0;
    Slider.touchEndX = 0;
  }

  //TODO: active movement slide

  // static handleTouchMove (event) {
  //
  // }



  static stopSlider () {
    clearTimeout(Slider.timer);
    Slider.stopProgressBar();


  }

  static moveSlider () {
    Slider.autoPlay();
    Slider.startProgressBar();
  }

  //TODO: progressbar after pause

  // static stopSlider() {
  //   clearTimeout(Slider.timer);
  //
  //   Slider.stopProgressBar();
  //   Slider.pauseStartTime = performance.now();
  //   Slider.remainingTime = Slider.interval - (Slider.pauseStartTime % Slider.interval);
  //   console.log(Slider.pauseStartTime, Slider.remainingTime);
  // }
  //
  // static moveSlider() {
  //   Slider.autoPlayAfterRemaining();
  //   Slider.startProgressBarAfterRemaining();
  //   console.log(Slider.pauseStartTime, Slider.remainingTime);
  // }
  //
  // static startProgressBarAfterRemaining() {
  //   clearInterval(Slider.progressBarInterval);
  //   const remainingProgress = (Slider.progressBarWidth / 100) * Slider.remainingTime;
  //   Slider.progressBarInterval = setInterval(Slider.updateProgressBar, Slider.interval / 100);
  //   Slider.progressBarWidth = remainingProgress;
  //   Slider.activeProgressBar.style.width = `${Slider.progressBarWidth}`;
  // }
  //
  // static autoPlayAfterRemaining() {
  //   clearTimeout(Slider.timer);
  //   Slider.timer = setTimeout(() => {
  //     Slider.nextSlide();
  //   }, Slider.remainingTime);
  // }



  static  startProgressBar () {
    clearInterval(Slider.progressBarInterval);
    Slider.progressBarWidth = 0;
    Slider.activeProgressBar.style.width = `0%`;
    Slider.progressBarInterval = setInterval(Slider.updateProgressBar, Slider.interval / 100);
  }

  static stopProgressBar () {
    clearInterval(Slider.progressBarInterval);
    Slider.activeProgressBar.style.width = `${Slider.progressBarWidth}`;
  }

  static updateProgressBar () {
      if (Slider.progressBarWidth >= 100) {
        Slider.progressBarWidth = 0;
      }
      else  {
        Slider.progressBarWidth += 1;
        Slider.activeProgressBar.style.width = `${Slider.progressBarWidth}%`;
      }
  }

  static autoPlay() {
    clearTimeout(Slider.timer);
    Slider.timer = setTimeout(() => {
      Slider.nextSlide();
    }, Slider.interval);
  }


  static nextSlide () {
    if (Slider.index < Slider.images.length - 1 && Slider.index >= 0) {
      Slider.index += 1;
    }
    else {
      Slider.index = 0;
    }
    Slider.switchSlide();
    Slider.updateControls();
    Slider.startProgressBar();
    Slider.autoPlay();

  }

  static previousSlide () {
    if (Slider.index > 0 && Slider.index <= Slider.images.length -1) {
      Slider.index -= 1;
    }
    else  {
      Slider.index = Slider.images.length -1;
    }
    Slider.switchSlide();
    Slider.updateControls();
    Slider.startProgressBar();
    Slider.autoPlay();
  }

  static switchSlide () {
    const translateX = Slider.index * Slider.container.offsetWidth;
    Slider.container.style.transform = `translateX(-${translateX}px)`;

  }

  static updateControls () {
    Slider.control.forEach((element, index) => {
      const isActive = index === Slider.index;
      element.classList.toggle('slider-control__item--active', isActive);
      if (isActive) {
        Slider.activeProgressBar = element.querySelector('.slider-control__item-progress');
      }
    })
  }

}

