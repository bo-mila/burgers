
const hamburgerMenuInput = document.querySelector('.hamburger-menu__input');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header__nav');

const team = document.querySelector('.team');
const teamItem = document.querySelectorAll('.team__item');
const teamItemLength = teamItem.length;

const menu = document.querySelector('.menu');
const menuItem = document.querySelectorAll('.menu__item');
const menuItemLength = menuItem.length;


// function noScroll() {
//   window.scrollTo(0, 0);
// }



//////////// ACCO VERTICAL -> TEAM /////////////////////////////////

team.addEventListener('click', function(e) {
  e.preventDefault();
  for (let i=0; i < teamItemLength; i++) {
    teamItem[i].classList.remove('team__item--active');
  }
});
for (let i=0; i<teamItemLength; i++) {
  teamItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (teamItem[i].classList.contains('team__item--active')) {
      teamItem[i].classList.remove('team__item--active');
    } else {
      for (let i=0; i<teamItemLength; i++) {
        teamItem[i].classList.remove('team__item--active');
      }
      teamItem[i].classList.add('team__item--active');
    }
  });
}


//////////// ACCO HORIZONTAL -> MENU /////////////////////////////////

menu.addEventListener('click', function(e) {
  e.preventDefault();
  for (let i=0; i<menuItemLength; i++) {
    menuItem[i].classList.remove('menu__item--active');
  }
});
for (let i=0; i<menuItemLength; i++) {
  menuItem[i].addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (menuItem[i].classList.contains('menu__item--active')) {
      menuItem[i].classList.remove('menu__item--active');
    } else {
      for (let i=0; i<menuItemLength; i++) {
        menuItem[i].classList.remove('menu__item--active');
      }
      menuItem[i].classList.add('menu__item--active');
    }
  });
}



//////////////  SLIDER ПЛАВНЫЙ БЕЗКОНЕЧНЫЙ  /////////////////////////
 ////////// можно указывать кол-во видимых элементов
const burger = document.querySelector('.burger');
const slider = document.querySelector('.slider');
let sliderItem = document.querySelectorAll('.slider__item');
const sliderLength = sliderItem.length;
const sliderArrowLeft = document.querySelector('.burger__arrow-left');
const sliderArrowRight = document.querySelector('.burger__arrow-right');

let sliderCopy = [];
for (let i = 0; i<sliderLength; i++) {
  sliderCopy[i] = sliderItem[i];
  sliderItem[i].remove();
}
let slideView = 1;
let slideNumberView = 0;

createSlider();

sliderArrowLeft.addEventListener('click', function(event) {
  event.preventDefault();
  left();
});
sliderArrowRight.addEventListener('click', function(event) {
  event.preventDefault();
  right();
});
burger.addEventListener('click', function(event) {
  event.preventDefault();
});

function createSlider() {
  createSlideView();
  createSlideLeft();
  createSlideRight();
  
}
function createSlideView () {
  for (let i = slideNumberView; i<slideView; i++) {
    let li = document.createElement('li');
    li = sliderCopy[i];
    li.classList.add('slider__item');
    li.style.left = i*(100/slideView) + '%';
    slider.appendChild(li);
  }
  slideNumberView = slideView - 1;
}
function createSlideLeft() {
  let slideNumberLeft;
  if ((slideNumberView - slideView) < 0) {
    slideNumberLeft = sliderLength + (slideNumberView - slideView);
  } else {
    slideNumberLeft = slideNumberView - slideView;
  }
  let li = document.createElement('li');
  li = sliderCopy[slideNumberLeft];
  li.classList.add('slider__item');
  li.style.left = -(100/slideView) + "%";
  slider.insertBefore(li, slider.firstElementChild);
  //нужно вызываеть из этой функции, т.к. на динамически подгруженные слайды не действует
  $('[data-scroll-to]').on("click", e => {dataScrollTo(e)});
}
function createSlideRight() {
  let slideNumberRight;
  if (slideNumberView == (sliderLength - 1)) {
    slideNumberRight = 0;
  } else {
    slideNumberRight = slideNumberView + 1;
  }
  let li = document.createElement('li');
  li = sliderCopy[slideNumberRight];
  li.classList.add('slider__item');
  li.style.left = 100 + '%';
  slider.appendChild(li);
  //нужно вызываеть из этой функции, т.к. на динамически подгруженные слайды не действует
  $('[data-scroll-to]').on("click", e => {dataScrollTo(e)});

}

function left() {
  sliderArrowLeft.onclick = null;
  let sliderL = document.querySelectorAll('.slider__item');
  let offsetL = -1;
  // console.log(offsetL)
  for (let i = 0; i<slideView+2; i++) {
    sliderL[i].style.left = (offsetL*100 - 100)/slideView + "%";
    // console.log(offsetL*100 - 100);
    offsetL++;
  }
  slideNumberView++;
  if (slideNumberView == sliderLength) {
    slideNumberView = 0;
  }
  setTimeout(function () {
    sliderL[0].remove();
    createSlideRight();
    sliderArrowLeft.onclick = left;
  }, 600);
}
function right() {
  sliderArrowRight.onclick = null;
  let sliderR = document.querySelectorAll('.slider__item');
  let offsetR = (slideView+1);
  
  for (let i = (slideView+1); i>-1; i--) {
    sliderR[i].style.left = offsetR*100/slideView + '%';
    offsetR--;
  }
  slideNumberView--;
  if (slideNumberView < 0) {
    slideNumberView = (sliderLength - 1);
  }
  setTimeout(function() {
    sliderR[(slideView+1)].remove();
      createSlideLeft();
      sliderArrowRight.onclick = right;
  }, 600);
}



/////////////////// FORM  ///////////////////////

const form = document.querySelector('#form');
const buttonsSub = document.querySelector('.buttons__sub');
const buttonsRes = document.querySelector('.buttons__res');

buttonsRes.addEventListener('click', function(event) {
  event.preventDefault();
  form.reset();  
});

buttonsSub.addEventListener('click', function(event) {
  event.preventDefault();
 
    const formData = new FormData();
    formData.append('name',  form.elements.name.value);
    formData.append('phone',  form.elements.phone.value);
    formData.append('comment',  form.elements.comment.value);
    formData.append('to',  'mi@gmail.com');

  if (validForm(form)) {
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST','https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if ((xhr.response.status)|(xhr.response.status==0)) {
        overlayMessage(xhr.response.message);
        form.reset();
      }
    });
  }

});

function validForm (form) {
  let valid = true;

  if (!validField(form.elements.name)) {
    valid = false;
  }

  if (!validField(form.elements.phone)) {
    valid = false;
  }
  if (!validField(form.elements.comment)) {
    valid = false;
  }
  return valid;
}

function validField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}





//////////////////    --------OVERLAY------------
const template = document.querySelector('#overlayTemp').innerHTML;
const overlay = createOverlay(template);

function overlayMessage(message) {
  overlay.open();
  overlay.setContent(message);
  document.body.style.overflow = "hidden";
  
  
}
function createOverlay(template) {
  
  const fragment = document.createElement('div');

  
  fragment.innerHTML = template;
  const overlayElement = fragment.querySelector(".overlay");
  const contentElement = fragment.querySelector(".overlay__content");
  const closeElement = fragment.querySelector(".overlay__close");

  overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
      closeElement.click();
      document.body.style.overflow = "initial";
    }
  });

  closeElement.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.removeChild(overlayElement);
    document.body.style.overflow = "initial";
  });

  return {
    open() {
       
      document.body.appendChild(overlayElement);
     
    },
    close() {
      
      closeElement.click();
    },
    setContent(message) {
      contentElement.innerHTML = message;
    },
  };
}








//////////////валидация поля ввода телефона
let formPhoneValid = document.querySelector('#phoneValid');
// let valueReturn = '';
// formPhoneValid.addEventListener('keydown', e => {
//   let keyName = e.key;
//   e.preventDefault();
//   if (((keyName >= '0' && keyName <= "9") || (keyName ==='-')) && (valueReturn.length < 16)) {
//     if (formPhoneValid.selectionStart != formPhoneValid.selectionEnd) {
//       formPhoneValid.setRangeText('');
//       valueReturn = formPhoneValid.value + keyName;
//     } else {
//       valueReturn = valueReturn + keyName;
//     }
//     return formPhoneValid.value = valueReturn;
//   } else {
//     if (keyName === "Backspace") {
//       if (formPhoneValid.selectionStart != formPhoneValid.selectionEnd) {
//         formPhoneValid.setRangeText('');
//         valueReturn = formPhoneValid.value;
//       } else {
//         valueReturn = valueReturn.substring(0,valueReturn.length - 1);
//       }
//       return formPhoneValid.value = valueReturn;
//     }
//   }
// });
formPhoneValid.addEventListener('keydown', function(e) {
  let isDigit = false;
  let isDash = false;
  let isControl = false;
  if (e.key >= 0 || e.key <= 9) {
    isDigit = true;
  }
  if (e.key == 'ArrowLeft' ||
      e.key == 'ArrowRight' ||
      e.key == 'Backspace' ||
      e.key == 'Tab' ||
      e.key == 'Delete') {
        isControl = true;
  }
  if (e.key === '-') {
    isDash = true;
  }
  if (!isDigit && !isDash && !isControl) {
    e.preventDefault();
  }
})








// функция определения номера элемента в его родителе
function indexElem(element){
    var sib = element.parentNode.childNodes;
    var n = 0;
    for (var i=0; i<sib.length; i++) {
      if (sib[i]==element) return n;
      if (sib[i].nodeType==1) n++;
    }
    return -1; 
  }
    
    
    
    
    //////////////// SCROLL  ///////////////////////////
    // переделала эту функцию без использования animate
    // function scrollToSection(offset) {
    //   $('html, body').animate({
    //     'scrollTop': offset
    //   }, 1000);
    //   return;
    // }
    
//////////////////  ONE PAGE SCROLL  ////////////////////////////
    
const sectionsAll = document.querySelectorAll('.section');
const sections = $('.section');
const maincontent = document.querySelector('.maincontent');
const fixedMenuItems = $('.fixed-menu__item');
const hamburgerItems = $('.hamburger__item');


// первой секции нужно навесить активный класс ----- НУЖНО ЗАМЕНИТЬ этот код, чтоб это было автоматич.
// firstSection = document.querySelector('.first');
// firstSection.classList.add('active');
$(document).ready(() => {
  sections.first().addClass('active')
});

document.addEventListener('wheel', e => {
  if (hamburgerMenuInput.checked == true) {
    return;
  }
  const windowScroller = scrollToSection();
  // сохраняем число прокрутки:
  // отрицательное -- прокрутка вверх
  // положительное -- прокрутка вниз
  // jquery:  const deltaY = originalEvent.deltaY; (прячется во вложенн.объекте)
  const deltaY = e.deltaY;
  // передаем в функцию определения секции направление прокрутки
  if (deltaY > 0) {
    windowScroller.next();
  }
  if (deltaY < 0 ) {
    windowScroller.prev();
  }
});




// прокручивание скролла клавиатурой
$(window).on("keydown", e => {
  if (hamburgerMenuInput.checked == true) {
    return;
  }
  // узнаем, что находится в e.target.tagName (ответ в uppercase),
  // и если это input или textarea, то не прокручивать
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const windowScroller = scrollToSection();
  if (userTypingInInputs) return;
  switch(e.keyCode) {
    case 38:
      windowScroller.prev();
      break;
    case 40:
      windowScroller.next();
      break;
  }
});




// подключила библ. touch swipe для drag and drop
// но сначала проверка на вход с мобильного устройства
const md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()) {
  const windowScroller = scrollToSection();
  $("body").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      const directionS = direction === "up" ? "next" : "prev";
      switch (directionS) {
        case "next":
          windowScroller.next();
          break;
        case "prev":
          windowScroller.prev();
          break;
      }
    }
  });
}



// скролл через интерактивные элементы
$('[data-scroll-to]').on("click", e => {dataScrollTo(e)});

function dataScrollTo (e) {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const scrollToId = $this.attr("data-scroll-to");
  const sectionId = sections.filter(`#${scrollToId}`);
  const indexSectionId = sectionId.index();
  performTransition(indexSectionId-1);
}










/////// функция, которой передаем номер секции и она к ней скроллит
let inScroll = false;
const performTransition = sectionEq => {
  if(inScroll) return; 
  inScroll = true;

  // расчитываем позицию секции для translateY
  const position = sectionEq * -100;
  if(isNaN(position)) console.error("Передано неверное значение номера секции в performTransition");

  // значение длительности transition translate в переменную
  const transitionIsOver = 1000;

  // след.цикл убирает активный класс у всех соседей элемента
  // аналог jquery  siblings().removeClass()
  // for (let sibling of sectionsAll[sectionEq].parentNode.children) {
  //   if (sibling !== sectionsAll[sectionEq]) sibling.classList.remove('active');
  // }
  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
  // навешиваем активный класс элементу, к которому скроллим
  // sectionsAll[sectionEq].classList.add('active');

  // вызываем функцию, меняющую активный клас fixed__item
  changeFixedMenuActiveItem(sectionEq);

  // скроллим к нужной секции -- двигаем maincontent
  maincontent.style.transform = `translateY(${position}%)`;
  setTimeout(() => {
    inScroll = false;
  }, transitionIsOver);

} ///////////////// конец функции performTransition()


/// функция навешивает активный класс на фиксед-айтем и убирает со всех остальных
const changeFixedMenuActiveItem = (sectionEq) => {
  fixedMenuItems.eq(sectionEq).addClass("active").siblings().removeClass("active");
};


// функция, кот. определяет, к какой секции скроллить
const scrollToSection = () => {
  // sectionsAll - NodeList, поэтому его нужно сделать объектом,
  // чтобы использовать filter(), в котором функция возвращает секцию,
  // которая имеет класс active
  // не получилось на ванильном 
  // const activeSection = Object.values(sectionsAll).filter(function(e) { 
  //   return e.classList.contains('active');
  // });
  const activeSection = sections.filter(".active");


  // получаем следующую секцию за активной
  // не получилось на ванильном:
  // const nextSection = activeSection.nextElementSibling();
  // for (var i = 0; i < sectionsAll.length; ++i) {
  //   let item = sectionsAll[i];  
  //   if (item == activeSection)
  //     indexSection = i;
  // }
  // const nextSection = activeSection.next();


  // получаем предыдущую секцию перед активной
  // не получилось на ванильном 
  // const prevSection = activeSection.previousElementSibling();
  // const prevSection = activeSection.prev();


  // не получились предыдущие варианты - переделала через индекс активной секции
  const indexActiveSection = activeSection.index();
  return {
    next() {
      if (indexActiveSection!=sections.length)
      performTransition(indexActiveSection);
    },
    prev() {
      if (indexActiveSection!=1)
      performTransition(indexActiveSection-2);
    }
  };
};







// скролл на мобильных устр-вах
(function dragDrop() {
  const wrapper = document.querySelector(".wrapper");
  const firstPic = document.querySelector(".first__pic");
  firstPic.draggable = false;
  maincontent.draggable = true;
  let ePageYStart = 0;
  
  maincontent.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/html", "dragstart");
    // для того, чтобы небыло полупрозрачной копии maincontent при перетягивании
    e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
    ePageYStart = e.pageY;
  });
  maincontent.addEventListener("dragend", (e) => {
    const windowScroller = scrollToSection();
    if (e.pageY < ePageYStart) {
      windowScroller.next();
    }
    if (e.pageY > ePageYStart) {
      windowScroller.prev();
    }
  });
  wrapper.addEventListener("dragover", (e) => {
    e.preventDefault();
    
  });
})();




//////////// HAMBURGER //////////////////////////////////////////////

hamburgerMenuInput.addEventListener("click", function(e) {
  // e.preventDefault();
  if (hamburgerMenuInput.checked == true) {
    hamburger.style.display = "flex";
    headerNav.style.display = "none";
    // window.addEventListener('scroll', noScroll); 
  } else {
    hamburger.style.display = "none";
    headerNav.style.display = "flex";
    // window.removeEventListener('scroll', noScroll);
  }
});

// след.функция не нужна, так как убрала функцию с animate,
// а сделала функцию с translate
// hamburger.addEventListener('click', function (e) {
//   e.preventDefault();
//   let elem = e.target;
//   let offset = 0;
//   if (elem.classList.contains('scrollToFirst')){
//     offset = $('.first').offset().top;
//   } else if (elem.classList.contains('scrollToBest')) {
//     offset = $('.best').offset().top;
//   } else if (elem.classList.contains('scrollToBurger')) {
//     offset = $('.burger').offset().top;
//   } else if (elem.classList.contains('scrollToTeam')) {
//     offset = $('.team').offset().top;
//   } else if (elem.classList.contains('scrollToMenu')) {
//     offset = $('.menu').offset().top;
//   } else if (elem.classList.contains('scrollToReviews')) {
//     offset = $('.reviews').offset().top;
//   } else if (elem.classList.contains('scrollToHow-work')) {
//     offset = $('.how-work').offset().top;
//   } else if (elem.classList.contains('scrollToOrder')) {
//     offset = $('.order').offset().top;
//   } else if (elem.classList.contains('scrollToContacts')) {
//     offset = $('.contacts').offset().top;
//   } else {
//     return;
//   }
//   hamburger.style.display = "none";
//   headerNav.style.display = "flex";
//   window.removeEventListener('scroll', noScroll);
//   hamburgerMenuInput.click();
//   setTimeout(function() {
//     scrollToSection(offset);
//   }, 200);
// });

hamburger.addEventListener('click', function (e) {
  let elem = e.target;
  if (elem.getAttribute("data-scroll-to")) {
      hamburgerMenuInput.click();
      hamburger.style.display = "none";
      headerNav.style.display = "flex";
  }
});




////////////////  FIXED-MENU  ///////////////////

$(fixedMenuItems).on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  const clickFixedMenuItem = fixedMenuItems.filter(e.target.parentNode);
  const index = clickFixedMenuItem.index();
  performTransition(index);
});


// $('.fixed-menu__item').on('click', function (e) {
//   e.preventDefault();
//   let elem = e.target;
//   let offset = 0;
//   if (elem.classList.contains('scrollToFirst')){
//     offset = $('.first').offset().top;
//   } else if (elem.classList.contains('scrollToBest')) {
//     offset = $('.best').offset().top;
//   } else if (elem.classList.contains('scrollToBurger')) {
//     offset = $('.burger').offset().top;
//   } else if (elem.classList.contains('scrollToTeam')) {
//     offset = $('.team').offset().top;
//   } else if (elem.classList.contains('scrollToMenu')) {
//     offset = $('.menu').offset().top;
//   } else if (elem.classList.contains('scrollToReviews')) {
//     offset = $('.reviews').offset().top;
//   } else if (elem.classList.contains('scrollToHow-work')) {
//     offset = $('.how-work').offset().top;
//   } else if (elem.classList.contains('scrollToOrder')) {
//     offset = $('.order').offset().top;
//   } else if (elem.classList.contains('scrollToContacts')) {
//     offset = $('.contacts').offset().top;
//   } else {
//     return;
//   }
//   scrollToSection(offset);
// });





////// PLAYER HTML5  (vanile JS)  /////////////////////////////////////

let player = document.getElementsByTagName('video')[0];
const playerWrapper = document.querySelector(".player__wrapper");
const myVideo = document.querySelector("#myvideo");
const playerSplash = document.querySelector(".player__splash");
const playerStart = document.querySelector(".player__start");
const playerDurationEstimate = document.querySelector(".player__duration-estimate");
const playerDurationCompleted = document.querySelector(".player__duration-completed");
const playerPlaybackButton = document.querySelector(".player__playback-button");
const playerPlayback = document.querySelector(".player__playback");
const playerLoader = document.querySelector(".player__loader");
let currentVolume = 0.1;
player.volume = currentVolume;

playerStart.addEventListener("click", e => {
  const btn = e.currentTarget;
  onPlayPause(btn);
});

myVideo.addEventListener("click", e => {
  const btn = playerStart;
  onPlayPause(btn);
});

function onPlayPause(btn) {
  if (btn.classList.contains("paused")) {
    player.pause();
    btn.classList.remove("paused");

  } else {
    player.play();
    btn.classList.add("paused");
    playerWrapper.classList.add("active");
  }
}
const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes *60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}
if (player.readyState) {
  // console.log("yes");
  playerWrapper.classList.add("visible");
  playerLoader.style.display = "none";
  onPlayReady();
};

function onPlayReady() {
  
  let interval;
  let durationSec = player.duration;

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    let compleatedSec = player.currentTime;
    const compleatedPercent = (compleatedSec / durationSec) * 100;
    if (compleatedPercent === 100) {
      player.pause();
      playerPlaybackButton.style.left = `0%`;
      compleatedSec = 0;
      playerDurationCompleted.textContent = formatTime(compleatedSec);
      playerStart.classList.remove("paused");
      playerWrapper.classList.remove("active");
    } else {
      playerPlaybackButton.style.left = `${compleatedPercent}%`;
      playerDurationCompleted.textContent = formatTime(compleatedSec);
    }
    
  }, 1000);
  playerDurationEstimate.textContent = formatTime(durationSec);
};

playerSplash.addEventListener("click", e => {
  player.play();
  playerStart.classList.add("paused");
  playerWrapper.classList.add("active");
});

playerPlayback.addEventListener("click", e => {
  const bar = e.currentTarget;
  if (e.target.classList.contains("player__playback")) {
    const buttonPosPercent = e.layerX/bar.offsetWidth * 100;
    const newPlayerTimeSec = (player.duration / 100) * buttonPosPercent;
    player.currentTime = newPlayerTimeSec;
    playerPlaybackButton.style.left = `${buttonPosPercent}%`;
  }
  
});

const volumeStart = document.querySelector(".volume__start");
const volumePlayback = document.querySelector(".volume__playback");
const volumePlaybackBefore = document.querySelector(".volume__playback:before");
const volumePlaybackButton = document.querySelector(".volume__playback-button");

volumeStart.addEventListener("click", e => {
  const vol = e.currentTarget;
  vol.classList.toggle("no-active");
  if (vol.classList.contains("no-active")) {
    player.volume = 0;
  } else {
    player.volume = currentVolume;
  }
});

volumePlayback.addEventListener("click", e => {
  const bar = e.currentTarget;
  // console.log(e);
  if (e.target.classList.contains("volume__playback")) {
    let eOffsetY = e.offsetY - 8;
    if (eOffsetY < 0) {
      eOffsetY = 0;
    }
    if (eOffsetY > 76) {
      eOffsetY = 76;
    }
    // console.log(eOffsetY);
    const volumeButtonPosPercent = (eOffsetY/(bar.offsetHeight - 8) * 100);
    currentVolume = (100 - volumeButtonPosPercent) / 100;
    player.volume = currentVolume;
    if (currentVolume === 0) {
      volumeStart.classList.add("no-active")
    } else if (volumeStart.classList.contains("no-active")) {
      volumeStart.classList.remove("no-active");
    }
    player.volume = currentVolume;
    
    volumePlaybackButton.style.top = `${eOffsetY}px`;
    console.log(currentVolume);
  }
});
// $('.volume__playback').on("click", e => {
//   const bar = $(e.currentTarget);
//   const volumeButtonPosition = e.pageY - (bar.offset().top - (bar.height()/100 * 20));
//   const buttonPosPersent = (((bar.height() + bar.height()/100 * 20) - volumeButtonPosition) / (bar.height() + bar.height()/100 * 20)) * 100;
//   currentVolume =  buttonPosPersent + 20;
//   if (currentVolume>=0) {
//     player.setVolume(currentVolume);
//     if ($('.volume__start').hasClass('no-active')) {
//        $('.volume__start').removeClass('no-active')
//     }
//   } else {
//     currentVolume = 0;
//     player.setVolume(currentVolume);
//     $('.volume__start').addClass('no-active');
//   }
  
//   $('.volume__playback-button').css( {
//     bottom: `${buttonPosPersent}%`
//   });
// })











/////////  PLAYER YOUTUBE //////////////////////////////////////////////////////
// let player;
// let currentVolume = 10;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-player', {
//     playerVars: {
//       controls: 0,
//       disablekb: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestranding: 0
//     },
//     videoId: '193yMDrrVgc',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// const playerStart = document.querySelector(".player__start");
// const playerDurationEstimate = document.querySelector(".player__duration-estimate");
// const playerDurationCompleted = document.querySelector(".player__duration-completed");
// const playerPlaybackButton = document.querySelector(".player__playback-button");
// const playerPlayback = document.querySelector(".player__playback");
// const playerLoader = document.querySelector(".player__loader");
// playerStart.addEventListener("click", e => {
//   e.preventDefault();
//   const btn = e.currentTarget;
//   if (btn.classList.contains("paused")) {
//     player.pauseVideo();
//   } else {
//     player.playVideo();
//   }
// });
// function onPlayerReady() {
//   player.setVolume(currentVolume);

//   playerWrapper.classList.add("visible");
//   playerLoader.style.display = "none";
//   let durationSec = player.getDuration();
//   playerDurationEstimate.textContent = formatTime(durationSec);
//   let interval;
//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec/durationSec) * 100;
//     playerPlaybackButton.style.left = `${completedPercent}%`;
//     playerDurationCompleted.textContent = (formatTime(completedSec));
//   }, 50);
// }
// playerPlayback.addEventListener("click", e => {
//   const bar = e.currentTarget;

//   // расчитывала с помощью позиции на странице
//   // const newButtonPosition =  Math.floor(e.clientX - bar.getBoundingClientRect().left);
//   // const buttonPosPercent = Math.floor((newButtonPosition/bar.offsetWidth) * 100);
  
//   // расчтывала с помощью свойства layerX
//   const buttonPosPercent = Math.floor((e.layerX/bar.offsetWidth) * 100);
//   const newPlayerTimeSec = (player.getDuration()/100) * buttonPosPercent;
//   player.seekTo(newPlayerTimeSec);
//   // playerPlaybackButton.style.left = `${buttonPosPercent}%`;
// })
// const formatTime = timeSec => {
//   const roundTime = Math.round(timeSec);
//   const minutes = Math.floor(roundTime/60);
//   const seconds = roundTime - minutes * 60;
//   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
//   return `${minutes}:${formattedSeconds}`;
// };
// const playerSplash = document.querySelector(".player__splash");
// const playerWrapper = document.querySelector(".player__wrapper");
// playerSplash.addEventListener("click", e => {
//   player.playVideo();
//   playerWrapper.classList.add("active");
// })

// function onPlayerStateChange(event) {
//   switch(event.data) {
//     case 1:
//       playerWrapper.classList.add("active");
//       playerStart.classList.add("paused");
//       break;
//     case 2:
//       playerStart.classList.remove("paused");
//       break;
//   }
// }



// /// ЗВУК ПЛЕЙЕРА
// $('.volume__start').on("click", e => {
//   const vol = $(e.currentTarget);
//   vol.toggleClass('no-active');
//   if (vol.hasClass('no-active')) {
//     player.setVolume(0);
//   } else {
//     player.setVolume(currentVolume);;
//   }
// });
// $('.volume__playback').on("click", e => {
//   const bar = $(e.currentTarget);
//   const volumeButtonPosition = e.pageY - (bar.offset().top - (bar.height()/100 * 20));
//   const buttonPosPersent = (((bar.height() + bar.height()/100 * 20) - volumeButtonPosition) / (bar.height() + bar.height()/100 * 20)) * 100;
//   currentVolume =  buttonPosPersent + 20;
//   if (currentVolume>=0) {
//     player.setVolume(currentVolume);
//     if ($('.volume__start').hasClass('no-active')) {
//        $('.volume__start').removeClass('no-active')
//     }
//   } else {
//     currentVolume = 0;
//     player.setVolume(currentVolume);
//     $('.volume__start').addClass('no-active');
//   }
  
//   $('.volume__playback-button').css( {
//     bottom: `${buttonPosPersent}%`
//   });
// })