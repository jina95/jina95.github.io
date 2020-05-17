// date 재료들
const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('span');

// name 재료들
const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greeting');

const USER_LS = 'currentUser',
    SHOWING_CN = 'showing'



// 함수 시작
// date 함수
function getTime() {
    const date = new Date();
    const month = date.getMonth();
    const todayDate = date.getDate();
    const day = date.getDay();
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    clockTitle.innerText = `${month + 1}월${todayDate}일  ${week[day]} `
}



function saveName(text){
    localStorage.setItem(USER_LS, text);
}   

function handleSubmit(event){ //누군가 enter 를 쳤을때 
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${text}의 체크리스트 😋`; 
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // she is not
        askForName()
    } else {
        // she is
        paintGreeting(currentUser)
    }
}
function init(){
    getTime(); // date 함수
    loadName(); // name 함수
}

init()