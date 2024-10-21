import { SectionHead } from "../component/sectionHead/sectionHead.js"
window.customElements.define('section-head', SectionHead)

const navToggle = document.querySelector('.nav__toggle-icon')
const menuOpen = document.querySelector('.menu')
const coverElem = document.querySelector('#cover')
let serviceBg = document.querySelectorAll('.service')
const resumeListItems = document.querySelectorAll('.resume-list__item')
const portfolioListItems = document.querySelectorAll('.portfolio-list__item')
const menuItem = document.querySelectorAll('.menu__item')
const sections = document.querySelectorAll('main > section')
// const changeThemeBtn = document.querySelector('.theme__checkbox')
const changeThemeBtn = document.querySelector('.theme-toggle__label')
const changeThemeBall = document.querySelector('.theme-toggle__ball')

navToggle.addEventListener('click', () => {
    navBtn()
})

serviceBg.forEach(service => {
    let bgColor = service.getAttribute('bg-color')
    service.style.backgroundColor = `rgb(${bgColor})`
    service.style.boxShadow = `0 0 6rem rgba(${bgColor}, 35%)`
})

function navBtn () {
    navToggle.classList.toggle('nav__toggle-icon--open')
    menuOpen.classList.toggle('menu--open')
    coverElem.classList.toggle('cover')
}

function navigationTabsInit(listItems, activeClass, showClass) {
    listItems.forEach(listItem => {
        listItem.addEventListener('click', function() {
            removeClass(activeClass)
            this.classList.add(activeClass)
            let activeId = this.getAttribute('data-content-id')
            removeClass(showClass)
            document.querySelector(activeId).classList.add(showClass)
        })
    })
}

function removeClass(className) {
    document.querySelector(`.${className}`).classList.remove(className)
}

navigationTabsInit(resumeListItems, 'resume-list__item--active', 'resume-content--show')

navigationTabsInit(portfolioListItems, 'portfolio-list__item--active', 'portfolio-content--show')

menuItem.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault()
        if(document.querySelector('active-item')){
            removeClass('active-item')
        }
        item.classList.add('active-item')

        if(document.querySelector('.nav__toggle-icon--open')) {
            navBtn()
        }

        let sectionClass = this.getAttribute('data-section')
        let sectionOffset = document.querySelector(`.${sectionClass}`).offsetTop
        window.scrollTo({
            top: sectionOffset - 100,
            behavior: "smooth"
        })
    })
})


const observer = new IntersectionObserver(observerHandler, {
    threshold: .4
})

function observerHandler(allSections) {
    allSections.map(section => {
        let sectionID = section.target.id
        if(section.isIntersecting){
            document.querySelector(`.menu__item[data-section=${sectionID}]`).classList.add('active-item')
        } else{
            document.querySelector(`.menu__item[data-section=${sectionID}]`).classList.remove('active-item')
        }
    })
}

sections.forEach(section => {
    observer.observe(section)
})

function setLocalStorage (theme) {
    localStorage.setItem('theme', theme)
}


onload = () => {
    if(!localStorage.getItem('theme')) {
        setLocalStorage('light')
    }
    setTheme()
}

changeThemeBtn.addEventListener('click', function() {
    if(localStorage.getItem('theme') === 'light') {
        setLocalStorage('dark')
    } else if(localStorage.getItem('theme') === 'dark') {
        setLocalStorage('light')
    }
    setTheme()
})

function setTheme() {
    if(localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark-theme')
        changeThemeBall.style.right = ".3rem"
        changeThemeBall.style.left = "unset"
        console.log('light');
    } else if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-theme')
        changeThemeBall.style.left = ".3rem"
        changeThemeBall.style.right = 'unset'
        console.log('dark');
    }
}