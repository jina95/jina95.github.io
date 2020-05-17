// todo 재료들 
const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];


// 함수시작
//체크박스 함수
function checkToDo(event){
    let parent = event.target.parentNode
    let parentId = parent.id
    if( event.target.checked === true ){
        parent.classList.add('checked')
        toDos[parentId-1].status = 'done';
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    }else{
        event.target.parentNode.classList.remove('checked')
        toDos[parentId-1].status = "created"
    }
    saveToDos()
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
        // parseInt 는 string > number 로 바꿀 수 있다.
    });
    toDos = cleanToDos;
    saveToDos();
    edit = true;
    toDoInput.value = '';
}

let edit = true; // edit 은 상태값으로 사용되어야 하기때문에 (전송함수들에서) 전역 으로 두어야 한다.
let valueParent = null; // edtiToDo & editSubmit 둘 다 사용되어야 하는 값이라, 전역!
let eventId = null;

function editToDo(event) { // 이벤트 버튼을 눌렀을때
    edit = !edit;
    valueParent = event.target.parentNode;
    eventId = valueParent.id - 1;
    toDoInput.value = toDos[eventId].text;
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    // JSON.stringify 은 object 를 string 으로 바꿔준다. 
    // localstorage에 저장될때는 string 으로 저장하려고 한다.
}

function paintToDo(text, status){ // list 가 추가될때 안의 내용을 새로 만들어 낸다.
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const span = document.createElement('span');
    const checkBox = document.createElement('input');
    const newId = toDos.length + 1

    span.innerText = `${text} `;
    checkBox.type = 'checkbox';
    delBtn.classList.add('del');
    editBtn.classList.add('edit');

    delBtn.addEventListener('click', deleteToDo)
    editBtn.addEventListener('click', editToDo)
    checkBox.addEventListener('click',checkToDo)

    checkBox.classList.add('checkBox')
   

    li.appendChild(span);
    li.appendChild(checkBox);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
        status: status
    };
    toDos.push(toDoObj);
    saveToDos();
    
}

function handleSubmit(event) { // 새로운 투두리스트를 추가할때
    event.preventDefault();
    if (edit) {
        const currentValue = toDoInput.value;
        const created = 'created'
        paintToDo(currentValue, created)
        toDoInput.value = '';
    } return;

}

function editSubmit(event) { // 리스트를 수정하고 엔터 쳤을때!
    event.preventDefault();
    if (!edit) {
        toDos[eventId].text = toDoInput.value;
        valueParent.querySelector('span').innerText = toDoInput.value;
        edit = !edit;
        toDoInput.value = '';
        saveToDos();
    }
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos)
        // 로컬스토리지에는 string으로 저장되어있는것을 자바스크립트에서 사용하기 쉬운 데이터로 변환 하기 위해
        // 위와 같이 parse 를 이용한다.
        // 이렇게 되면 string이 아닌 object 형태로 변환된다.
        parsedToDos.forEach(function(toDo){
            localStorage.getItem(toDo);
            paintToDo(toDo.text, toDo.status)
        })
    }

}



function init(){
    loadToDos(); // todo 함수
    toDoForm.addEventListener('submit', handleSubmit)
    toDoForm.addEventListener('submit', editSubmit)
    const lis = toDoList.querySelectorAll('li');

    for(let i = 0; i < toDos.length; i++){
        if( toDos[i].status === 'done' ){
            lis[i].classList.add('checked')
            lis[i].querySelector('.checkBox').checked = true
        }else{
            lis[i].classList.remove('checked')
            lis[i].querySelector('.checkBox').checked = false
        }
        
    }
}
init();