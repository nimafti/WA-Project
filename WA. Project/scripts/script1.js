const no = document.getElementById("no")
const yes = document.getElementById("yes")
const container = document.querySelector(".container")
const hide = document.querySelector(".hidden")
let x, y
no.addEventListener("mouseover" , function() {
    console.log(no.style.right);
    // console.log(no.style.top);
    x = Math.floor(Math.random()*280)
    y= Math.floor(Math.random()*260)
    while(Math.abs(parseInt(no.style.right)-x)<80){
        x = Math.floor(Math.random()*280)
    }
    while(Math.abs(parseInt(no.style.right)-y)<80){
        y = Math.floor(Math.random()*260)
    }

    console.log(parseInt(no.style.right)-x);

    no.style.right = x + 'px'
    no.style.top = y + 'px'


    console.log(x);
    // console.log(y);
})



yes.addEventListener('click', function() {
    document.body.style.background = "url('photos/heart.png') repeat fixed #ff7575"
    container.style.display = "none"
    hide.classList.remove('hidden')
})

