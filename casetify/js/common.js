// 재료 준비
const descMenu = document.querySelector('.desc_menu');
const descMenuEtc = document.querySelector('.header_etc')
const headerSearch = descMenuEtc.querySelector('.header_search')
const headerCart = descMenuEtc.querySelector('.header_cart')
const mobileMenu = document.querySelector('.header_mobile')


descMenuFun() // pc버전 menu header 오픈 함수
function descMenuFun(){
    let openedMenu;
    descMenu.addEventListener('mouseover', overWork);
    descMenu.addEventListener('mouseout', outWork);

    function overWork(e){
        if(headerSearch.querySelector('.on')) return
        
        let SelectDivMenu = e.target.parentNode.querySelector('div');
        if (SelectDivMenu) {
            SelectDivMenu.classList.add('on');
            openedMenu = SelectDivMenu;
        }
    };

    function outWork(e) {
        if (openedMenu === undefined || e.relatedTarget === null ) return;
        if (e.relatedTarget.className === 'header_menu_title') {
            openedMenu.classList.remove('on');
        }  
        if (!isDiv (e.relatedTarget)) { // 도착한 곳이 div 인지 확인해라.
            openedMenu.classList.remove('on');
        }

        function isDiv(arriveMenu) {
            if (arriveMenu === null) return;
            while (arriveMenu.tagName !== 'HTML' ) {
                if (arriveMenu === descMenu ) { //descmenu 의 자식이라면, 닫지 말아라.
                    return true;
                }
               arriveMenu = arriveMenu.parentNode; 
            }
            return false;
        }
    }
    // 컬렉션 옆으로 포물선을 그리며 옆으로 가면 사라지는데 직선으로 가면 헤드가 안 닫힘.
}

headerEtcOverFun(); // header flag & cart work
function headerEtcOverFun(){
    const headerFlag = descMenuEtc.querySelector('.header_lang')
    const headerCart = descMenuEtc.querySelector('.header_cart')
    let openedMenu;


    headerFlag.addEventListener('mouseover', overWork);
    headerFlag.addEventListener('mouseout', outWork);
    headerCart.addEventListener('mouseover', overWork);
    headerCart.addEventListener('mouseout', outWork);

        
    // flag & cart 둘다 mouseover event 를 사용하기 때문에 한 함수로 묶으려고 노력하였다.
    function overWork(e){
        if(descMenu.querySelector('.on') || headerSearch.querySelector('.on')) return; // 헤더의 자식들 중 on 이 들어가있는애가 있는 상태로 여기에 온다면 (?) return 해라.
        let target = e.target
        if(target === headerFlag || target.title === 'Language'){ // headerFlag에 mouseover 한다면,
            let SelectUl = target.parentNode.querySelector('ul'); // 그밑에 ul 한테 on 을 줘라.
            SelectUl.classList.add('on');
            openedMenu = SelectUl;
            
        } else if(target === headerCart || target.alt === 'cart'){ // 만약 cart 아이콘에 over 가 닿는다면
            headerCart.classList.add('on');// 헤더카트에 on 을 줘라.
        } 
    }

    function outWork(e) {
        if (openedMenu === undefined || e.relatedTarget === null) return;
        if (!isRight (e.relatedTarget)) { // 자식 확인함수 = isRight 
            if(openedMenu.classList.contains('on'))openedMenu.classList.remove('on') // cart on 제거
            else headerCart.classList.remove('on'); // flag on 제거 
            
            
        }
        
        function isRight(arrived) {
            if (arrived === null) return;
            while (arrived.tagName !== 'HTML' ) { // html 까지 올라가서 확인해라.
                if (arrived === headerFlag || arrived === headerCart ) {
                    return true;
                }
                arrived = arrived.parentNode; 
            }
            return false;
        }
    }
    // headercart 에서 나온애가 안꺼진 상태에서 headerflag 로가면 cart 창이 꺼지고 flag 가 켜져야하는데,
    // 지금은 겹쳐지는 상황이다.
}


headerSearchWork() // 헤더 서치아이콘 work
function headerSearchWork(){
    const headerSearchForm = headerSearch.querySelector('form');
    const headerSearchInput = headerSearch.querySelector('form > input');

    headerSearch.addEventListener('click', clickEventFun); // 인풋창 클릭 함수
    headerSearchInput.addEventListener('keyup', searchKeyfun); // 인풋창에 글자 입력했을때 함수

    function clickEventFun(e) {
        e.preventDefault();

        if(descMenu.querySelector('.on')) return; // 헤더의 자식들 중 on 이 들어가있는애가 있는 상태로 클릭을 한다면 (?) return 해라.
        const serachImg = headerSearch.querySelector('img')
        const searchBox = headerSearch.querySelector('.search_box')
        
        if(!searchBox.classList.contains('on')){ // searchBox를 눌렀을 때 search div 가 안켜져있는 상태라면 
            searchBox.classList.add('on') // 키워라
        } else if(e.target === headerSearch || e.target === serachImg ) { // 하지만 누른애가 돋보기모양의 아이콘이라면
            searchBox.classList.remove('on') // 지워라
        } else if(!isSearchBox(e.target)){ // 또한 도착한애가 headerSearch의 자식이라면
            searchBox.classList.remove('on') // 지워라 (div 안에서 input 같은 요소들을 눌렀을때 지워지면 안되기 때문.)
        }

        function isSearchBox(arrived){ // 도착한애의 부모가 누군지 확인하는 함수.
            if (arrived === null) return; // 도착한곳이 null 이라면 돌아가라.
            while (arrived.tagName !== 'HEADER' ) { // parentNode가 HEADER일때까지 확인해라.
                if (arrived === headerSearch ) {
                    return true; 
                }
                arrived = arrived.parentNode; 
            }
            return false;   
        }
    }

    function searchKeyfun(e){
        const headerSearchXBox = headerSearchForm.querySelector('.xbox_icon')
        headerSearchForm.classList.add('x_box'); // keyup 이 일어났을때 x아이콘을 on 해라.
        headerSearchXBox.addEventListener('click', function(){ // x아이콘을 눌렀을때는,
            headerSearchInput.value = ''; //값을 지우고
            headerSearchForm.classList.remove('x_box'); //x 아이콘을 없애라.
        })
        
    }
}


mobileMenuFun(); // 모바일메뉴 work
function mobileMenuFun(){
    const bodyEl = document.querySelector('body')
    const hamburgerIcon = mobileMenu.querySelector('.hamburger_menu');
    const menuLis = mobileMenu.querySelectorAll('ul > li');
    const mobileFlag = mobileMenu.querySelector('.flag_lang')

    hamburgerIcon.addEventListener('click', mobileMenuWork) // 햄버거메뉴 오픈 work

    for (let i = 0; i < menuLis.length; i++) {
        menuLis[i].addEventListener('click',mobileListWork) // 메뉴 안의 li open work
    }
    mobileFlag.addEventListener('click', mobileFlagClickWork)

    function mobileMenuWork(e){ // 햄버거메뉴 클릭 
        e.preventDefault();
        if(mobileMenu.classList.contains('on')){
            mobileMenu.classList.remove('on');
            bodyEl.classList.remove('not_scroll') // 모바일메뉴가 닫히면 스크롤 원상복구!
        } else {
            mobileMenu.classList.add('on');
            bodyEl.classList.add('not_scroll') // 모바일 메뉴가 오픈 되었을때 스크롤을 막아라.
        }
        
    }
    function mobileListWork(e){ // 모바일메뉴 li 클릭 
        e.preventDefault();
        if (this.className === 'on') {
            this.className = ''
        } else {
            this.className = 'on'
        }  
    }
    function mobileFlagClickWork(e){ // 모바일 언어 클릭
        if(e.target.title !== 'Language') return 
        let flagList = e.target.parentNode.querySelector('ul')
        if (flagList.classList.contains('on')){
            flagList.classList.remove('on')
        } else {
            flagList.classList.add('on')
        }
    }
}
