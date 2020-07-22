// slider 

(function () {
  const wrapper = document.querySelector('.slider__wrapper');
  const innerWrapper = document.querySelector('.slider__inner-wrapper');
  const pagination = document.querySelector('.slider__buttons');
  const buttonPrev = document.querySelector('.slider__arrow--prev');
  const buttonNext = document.querySelector('.slider__arrow--next');
  const slides = document.querySelectorAll('.slider__slide');

  let sharedWidth = +getComputedStyle(wrapper).width.split('px')[0];
  let numberSlides = innerWrapper.childElementCount - 1;
  let activeSlide = 0;
  let dots = [];

  let addSlidesWidth = () => {
    sharedWidth = +getComputedStyle(wrapper).width.split('px')[0];
    for (let slideWidth of slides) {
      slideWidth.style.width = `${sharedWidth}px`
    }
  }

  addSlidesWidth();

  let createPagination = () => {
    for (let i = 0; i < slides.length; i++) {
      let dot = document.createElement('button');
      dot.classList.add('slider__button');
      
      if (i === activeSlide) {
        dot.classList.add('slider__button--active');
      }
      dot.addEventListener('click', function () {
        setActiveSlide(i);
      });
      dots.push(dot);
      pagination.insertAdjacentElement('beforeend', dot);
    }
  };

  createPagination();

  let setActiveSlide = index => {
    if (index < 0 || index > numberSlides) {
      return;
    }
    if (activeSlide - index < 0) {
      buttonPrev.removeAttribute('disabled');
    }
    if (activeSlide - index > 0) {
      buttonNext.removeAttribute('disabled');
    }
    if (index === 0) {
      buttonPrev.setAttribute('disabled', 'disabled');
    }
    if (index === numberSlides) {
      buttonNext.setAttribute('disabled', 'disabled');
    }
    innerWrapper.style.transition = 'margin-left .5s';
    dots[activeSlide].classList.remove('slider__button--active');
    dots[index].classList.add('slider__button--active');
    

    const marginLeft = sharedWidth * index;
    innerWrapper.style.marginLeft = `-${marginLeft}px` ;
    activeSlide = index;
  };
  
  buttonNext.addEventListener('click', () => {
    setActiveSlide(activeSlide + 1);
  });
  
  buttonPrev.addEventListener('click', () => {
    setActiveSlide(activeSlide - 1);
  });

  window.addEventListener('resize', () => {
    innerWrapper.style.transition = '';
    addSlidesWidth();
    setActiveSlide(activeSlide);
  })
})();

// timer 

(function () {
  let debugDate = new Date().getTime();
  let end = new Date('Jul 26, 2020 11:00:00').getTime();
  
  const timerSeconds = document.querySelector('.countdown-timer__seconds');
  const timerMinutes = document.querySelector('.countdown-timer__minutes');
  const timerHours = document.querySelector('.countdown-timer__hours');
  const timerDays = document.querySelector('.countdown-timer__days');
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  
    function timer() {
    let now = new Date().getTime(),
        timeLeft = end - now;

    let dd = Math.floor(timeLeft / days),
        hh = Math.floor((timeLeft % days) / hours),
        mm = Math.floor((timeLeft % hours) / minutes),
        ss = Math.floor((timeLeft % minutes) / seconds);

    timerDays.innerText = dd;
    timerHours.innerText = hh;
    timerMinutes.innerText = mm;
    timerSeconds.innerText = ss;
  }

  let timerId = setInterval(function () {
    timer();
  }, 1000);
})();

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    videoId: 'rUWxSEwctFU',
    playerVars: { 'autoplay': 1, 'playsinline': 1 },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
   event.target.mute();
  event.target.playVideo();
}