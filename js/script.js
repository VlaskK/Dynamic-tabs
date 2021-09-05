"use strict"
window.addEventListener('DOMContentLoaded', ()=>{
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector(".tabheader__items");
    function hideTabContent(){
        tabsContent.forEach((tab) => {tab.style.display = "none";}); //убираем все стили табов
        tabs.forEach(tab => {tab.classList.remove('tabheader__item_active');}); //убираем сами табы 
    }  
    function showTabContent(i = 0){
        tabsContent[i].style.display = "block"; //возвращаем стиль у определенного таба 
        tabs[i].classList.add('tabheader__item_active'); // возвращаем сам таб
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
    const deadline = '2021-09-06';
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
});