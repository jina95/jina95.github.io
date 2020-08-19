let sizeCheck;
const slideList = document.querySelector('.main_slide'); 
let firstChild = slideList.firstElementChild;
let slideWidth = firstChild.clientWidth;
const slideContents = document.querySelectorAll('.slider_item');
const slidePage = document.querySelector('.slide_btn');
const slideLen = slideContents.length;

const slideSpeed = 1000;
const startNum = 0;






slideList.style.width = slideWidth * (slideLen + 2) + 'px'; //ul 넓이 지정 (복사본까지 합친 넓이.)

//자연스러운 슬라이드를 위해 양 끝에 슬라이드 복제하기 - <4번> 1번 2번 3번 4번 <1번>
let lastChild = slideList.lastElementChild;
let cloneFirst = firstChild.cloneNode(true);
let cloneLast = lastChild.cloneNode(true);

slideList.appendChild(cloneFirst);
slideList.insertBefore(cloneLast,slideList.firstElementChild);

slideList.style.transform = `translateX(-${slideWidth * ( startNum + 1 )}px)` // 복사본부터 시작해야하기때문에 원래 슬라이드 아이템보다 -slidewidth된 상태에서 시작해야한다.

// page navi
let pageChild = '';
for (var i = 0; i < slideLen; i++) {
    pageChild += '<li class="dot';
    pageChild += (i === startNum) ? ' dot_active' : '';
    pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
slidePage.innerHTML = pageChild;
const pageDots = document.querySelectorAll('.dot');

let curDot;
Array.prototype.forEach.call(pageDots, function (dot, i) {
    dot.addEventListener('click', function (e) {
    e.preventDefault();
    curDot = document.querySelector('.dot_active');
    curDot.classList.remove('dot_active');
    curDot = this;
    this.classList.add('dot_active');
    curSlide.classList.remove('slide_active');
    curIndex = Number(this.getAttribute('data-index'));
    curSlide = slideContents[curIndex];
    curSlide.classList.add('slide_active');
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
    });
});


let curIndex = startNum;
let curSlide = slideContents[curIndex];
curSlide.classList.add('slide_active');
pageDots[curIndex].classList.add('dot_active');

setInterval(slidePlay,4000);

function slidePlay() {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  };


window.addEventListener('resize', function(){
    clearTimeout(sizeCheck);
    sizeCheck = setTimeout(function(){
        slideWidth = firstChild.clientWidth;
        slideList.style.width = slideWidth * (slideLen + 2) + 'px';
        slideList.style.transform = `translateX(-${slideWidth * ( startNum + 1 )}px)`;
        // console.log(startNum);
        
        //크기가 커진만큼 translateX가 되야한다. ( 그 다음슬라이드는 해당이 되는데 당장 화면을 늘린 당시 슬라이드가 적용이 안된다.)
        // 크기가 처음 이외에 두번째에는 뒤로가기도하고 두번 넘겨지기도 함. 
        // curIndex 가 현재 슬라이드 부터 ... 기존의 것을 따라가기 위해 위에처럼 두번넘겨지고 뒤로가고 하는듯 하다.
    }, 100);
});


function pageDotsWork(e){
    e.preventDefault();
    curDot = document.querySelector('.dot_active');
    curDot.classList.remove('dot_active');
    curDot = this;
    this.classList.add('dot_active');
    curSlide.classList.remove('slide_active');
    curIndex = this.data_index - 1 
    console.log(curIndex);
    curSlide = slideContents[curIndex];
    slidePlay();
}







