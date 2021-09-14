"use strict"

class MenuCard {   //класс карточки меню 
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price; 
        this.parentSelector = document.querySelector(parentSelector);
        this.transfer = 27;
        this.classes = classes;
    }

    changeToUAH(){
        this.price *= this.transfer; 
    }
    render(){
        this.changeToUAH();
        const element = document.createElement('div');
        this.classes.forEach(c => element.classList.add(c));
        
        if (this.classes.length === 0){
            this.element = "menu__item";
            element.classList.add(this.element);
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parentSelector.append(element);
    }

}
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();
new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();


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
          modal = document.querySelector('.modal'); // родитель
          //modalCloseBtn = document.querySelector('[data-close]'); // кнопка закрытия окна 
    
    function closeModal(){ 
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.add('show'); 
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);// если окно уже открывалось, то завершить интервал
    }
    
    modalTrigger.forEach( item => {
        item.addEventListener('click', () => { // окно открывается по клику. 
            openModal(); //чтобы не двигался скрол, когда модальное окно открыто 
        });
    });
    //modalCloseBtn.addEventListener('click', closeModel); 

    modal.addEventListener('click', (e) => { // чтоб закрывалась при нажатии за границы
        if (e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => { //закрытие на ESC
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });
    const modalTimerId = setTimeout(openModal, 5000); // открыть модальное окно через 5 секунд

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >=  //Если число прокрутили до конца страницы
            document.documentElement.scrollHeight){
                openModal(); 
                window.removeEventListener('scroll', showModalByScroll); //открыть окно и удалить событие
        }
    }
    window.addEventListener('scroll', showModalByScroll); //Если скролим то выполняем функцию

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach((item => postData(item)));

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //const request = new XMLHttpRequest();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading; //HERE LOAD
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
        
            const obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);
            
            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type':'application/json'
                },
                body: json
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                const t = setInterval(() => statusMessage.remove(), 3000);
            }).finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message){
        const prevModal = document.querySelector('.modal__dialog');

        prevModal.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal_close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal();
        },4000);
    }
});

