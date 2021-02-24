
const hamburgerMenuInput = document.querySelector('.hamburger-menu__input');
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header__nav');

const team = document.querySelector('.team');
const teamItem = document.querySelectorAll('.team__item');
const teamItemLength = teamItem.length;

const menu = document.querySelector('.menu');
const menuItem = document.querySelectorAll('.menu__item');
const menuItemLength = menuItem.length;

function noScroll() {
  window.scrollTo(0, 0);
}

//////////// HAMBURGER //////////////////////////////////////////////

hamburgerMenuInput.addEventListener("click", function(e) {
  e.preventDefault;
  if (hamburgerMenuInput.checked == true) {
    hamburger.style.display = "flex";
    headerNav.style.display = "none";
    window.addEventListener('scroll', noScroll); 
  } else {
    hamburger.style.display = "none";
    headerNav.style.display = "flex";
    window.removeEventListener('scroll', noScroll);
  }
});



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
  console.log(slideNumberView);
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
    console.log(i, offsetR);
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













