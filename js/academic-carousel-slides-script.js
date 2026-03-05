// Academic program carousel slides

const track = document.getElementById("track");
let current = 0;
let autoSlide;

/* DUPLICATE CARDS FOR INFINITE LOOP */
const cards = Array.from(track.children);

cards.forEach(card=>{
const clone = card.cloneNode(true);
track.appendChild(clone);
});

function getCardWidth(){
const card = track.children[0];
const gap = 24;
return card.offsetWidth + gap;
}

function slide(dir=1){

const width = getCardWidth();
current += dir;

const total = cards.length;

track.style.transform = `translateX(-${current * width}px)`;

if(current >= total){

setTimeout(()=>{
track.style.transition = "none";
current = 0;
track.style.transform = `translateX(0px)`;

setTimeout(()=>{
track.style.transition = "transform 0.5s ease-out";
},50);

},500);

}

}


