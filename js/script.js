"use strict"
window.addEventListener('DOMContentLoaded', ()=>{
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector(".tabheader__items");
    function hideTabContent(){
        tabsContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        }); 
        tabs.forEach(tab => {tab.classList.remove('tabheader__item_active');}); //убираем  табы 
    }  
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade'); 
        tabsContent[i].classList.remove('hide'); 
        tabs[i].classList.add('tabheader__item_active'); // возвращаемтаб
    }

    tabsParent.addEventListener('click', (e)=> {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
    hideTabContent();
    showTabContent();

    //Timer
    const deadline = '2021-09-30';
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), //time difference
              days = Math.floor(t / (1000 * 60 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor(t / 1000 % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(number){
        if (number >= 0 && number < 10){
            return `0${number}`;
        }
        else {
            return number;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              houre = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),   
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            houre.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0 ){
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'), //кнопка с которой модальное окно откроется
          modal = document.querySelector('.modal'), // родитель
          modalCloseBtn = document.querySelector('[data-close]'); // кнопка закрытия окна 
    
    function closeModel(){ 
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModel(){
        modal.classList.add('show'); 
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);// если окно уже открывалось, то завершить интервал
    }
    
    modalTrigger.forEach( item => {
        item.addEventListener('click', () => { // окно открывается по клику. 
            openModel(); //чтобы не двигался скрол, когда модальное окно открыто 
        });
    });
    modalCloseBtn.addEventListener('click', closeModel); 

    modal.addEventListener('click', (e) => { // чтоб закрывалась при нажатии за границы
        if (e.target === modal){
            closeModel();
        }
    });
    
    document.addEventListener('keydown', (e) => { //закрытие на ESC
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModel();
        }
    });
    const modalTimerId = setTimeout(openModel, 5000); // открыть модальное окно через 5 секунд

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
                openModel();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
});