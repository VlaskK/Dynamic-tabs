"use strict"
window.addEventListener('DOMContentLoaded', ()=>{
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
});