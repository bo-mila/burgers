
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



//////////////  SLIDER /////////////////////////

const burger = document.querySelector('.burger');
const burgerList = document.querySelector('.slider');
let sliderItem = document.querySelectorAll('.slider__item');
const sliderItemLength = sliderItem.length;
const burgerArrowLeft = document.querySelector('.burger__arrow-left');
const burgerArrowRight = document.querySelector('.burger__arrow-right');

let slider = [];
for (let i = 0; i<sliderItemLength; i++) {
  slider[i] = sliderItem[i];
  sliderItem[i].remove();
}
let step = 0;
let offset = 0;



burgerSlider();
step = 0;

burgerArrowLeft.addEventListener('click', function(event) {
  event.preventDefault();
  left();
});
burgerArrowRight.addEventListener('click', function(event) {
  event.preventDefault();
  right();
});
burger.addEventListener('click', function(event) {
  event.preventDefault();
});



function burgerSlider() {
  let li = document.createElement('li');
  li = slider[slider.length-1];
  li.classList.add('slider__item');
  li.style.left = -100 + '%';
  burgerList.appendChild(li);

  li = slider[step];
  li.style.left = offset*100 + '%';
  burgerList.appendChild(li);

  li = slider[step+1];
  li.style.left = offset*100 + 100 + '%';
  burgerList.appendChild(li);
  offset = 1;
}

function left() {
  burgerArrowLeft.onclick = null;
  let sliderL = document.querySelectorAll('.slider__item');
  let offsetL = -1;
  for (let i = 0; i<sliderL.length; i++) {
    sliderL[i].style.left = offsetL*100 - 100 + "%";
    offsetL++;
  }
  setTimeout(function () {
    sliderL[0].remove();
    burgerSliderL();
    burgerArrowLeft.onclick = left;
  }, 600);
}

function burgerSliderL() {
  if (step == (slider.length-1)) {
    step = 1;
  } else {
    if (step == (slider.length-2)) {
      step = 0;
    } else {
      step = (step +2);
    }
  }
  let li = document.createElement('li');
  li = slider[step];
  li.classList.add('slider__item');
  li.style.left = offset*100 + "%";
  burgerList.appendChild(li);
  if (step == 0) {
    step = (slider.length-1);
  } else {
    step = (step - 1);
  }
  offset = 1;
}

function right() {
  burgerArrowRight.onclick = null;
  
  let sliderR = document.querySelectorAll('.slider__item');
  let offsetR = (sliderR.length-1);
  
  for (let i = (sliderR.length-1); i>=0; i--) {
    sliderR[i].style.left = offsetR*100 + '%';
    offsetR --;
  }
  setTimeout(function() {
    sliderR[(sliderR.length-1)].remove();
      burgerSliderR();
      burgerArrowRight.onclick = right;
  }, 600);
}


function burgerSliderR() {
  if (step == 0) {
    step = (slider.length-2);
  } else {
    if (step == 1) {
      step = (slider.length-1);
    } else {
      step = (step -2);
    }
  }
  let offset = -1;
  let li = document.createElement('li');
  li = slider[step];
  li.classList.add('slider__item');
  li.style.left = offset*100 + '%';
  burgerList.insertBefore(li, burgerList.firstElementChild);
  if (step == (slider.length-1)) {
      step = 0;
    } else {
      step = (step+1);
    }
  offset = 1;
}













/// плавный бесконечный слайдер
// let item = document.querySelectorAll('.burgers__item');
// const itemLength = item.length;



// let step = 0;
// let offset = 0;

// function burgerSlider() {
//   let div = document.createElement('li');
//   div = slider[slider.length-1];
//   div.classList.add('burgers__item');
//   div.style.left = -100 + '%';
//   burgers__list.appendChild(div); 
  
//   div = slider[step];
//   div.style.left = offset*100 + '%';
//   burgers__list.appendChild(div); 

//   div = slider[step+1];
//   div.style.left = offset*100 + 100 + '%';
//   burgers__list.appendChild(div); 
//   offset = 1;
// }

// function burgerSliderL() {
//   if (step == (slider.length-1)) {
//     step = 1;
//   } else {
//     if (step == (slider.length-2)) {
//       step = 0;
//     } else {
//       step = (step +2);
//     }
//   }
//   let div = document.createElement('li');
//   div = slider[step];
//   div.classList.add('burgers__item');
//   div.style.left = offset*100 + '%';
//   burgers__list.appendChild(div); 
    
//   if (step == 0) {
//     step = (slider.length-1);
//   } else {
//     step = (step - 1);
//   }
//   offset = 1;
// }

// function left() {
//   leftArrow.onclick = null;
//   let slider2 = document.querySelectorAll('.burgers__item');
//   let offset2 = -1;
//   for (let i = 0; i<slider2.length; i++) {
//     slider2[i].style.left = offset2*100 - 100 + '%';
//     offset2 ++;
//   }
//   setTimeout(function() {
//     slider2[0].remove();
//     burgerSliderL();
//     leftArrow.onclick = left;
//   }, 600);
// }

// function burgerSliderR() {
//   if (step == 0) {
//     step = (slider.length-2);
//   } else {
//     if (step == 1) {
//       step = (slider.length-1);
//     } else {
//       step = (step -2);
//     }
//   }
//   let offset = -1;
//   let div = document.createElement('li');
//   div = slider[step];
//   div.classList.add('burgers__item');
//   div.style.left = offset*100 + '%';
//   burgers__list.insertBefore(div, burgers__list.firstElementChild);
//   if (step == (slider.length-1)) {
//       step = 0;
//    } else {
//      step = (step+1);
//    }
//   offset = 1;
// }

// function right() {
//   rightArrow.onclick = null;
  
//   let slider2 = document.querySelectorAll('.burgers__item');
//   let offset2 = (slider2.length-1);
 
//   for (let i = (slider2.length-1); i>=0; i--) {
//     slider2[i].style.left = offset2*100 + '%';
//     offset2 --;
//   }
//   setTimeout(function() {
//     slider2[(slider2.length-1)].remove();
//      burgerSliderR();
//      rightArrow.onclick = right;
//   }, 600);
// }

// burgerSlider();
// step = 0;

// leftArrow.onclick = left;
// rightArrow.onclick = right;

// const burgers = document.querySelector('.burgers');

// burgers.addEventListener('click', function(event) {
//   event.preventDefault();
// });