const imgPath = './img/cars';
const slidesObj = [
    {img: 'car1.jfif', color: 'red'},
    {img: 'car3.jfif', color: 'black'},
    {img: 'car5.jfif', color: 'blue'},
];



let doc = document;
let filterImg = slidesObj;

let btnPrev, btnNext, slides, dots;
const slidesCount = filterImg.length;
let currentSlide = 1;

render();


showSlide(currentSlide);
switchDot(currentSlide);


dots.forEach(function(dot) {
    dot.onclick = function() {
        setActiveDot(this);
        currentSlide = getIndex(this) + 1;
        showSlide(currentSlide);
    }
});

slides.forEach(function(slide) {
    slide.onclick = function() {
        const img = this.innerHTML;
        console.log(img);
    }
}) 



const filter = doc.querySelectorAll('.filter');
const buttonAll = doc.querySelector('.button_all');
const buttonRed = doc.querySelector('.button_red');
const buttonBlack = doc.querySelector('.button_black');
const buttonBlue = doc.querySelector('.button_blue');

//let filterImg;

//=====filter=====

//=====all=====
//filter.forEach(function() {
    buttonAll.onclick = function() {
        filterImg = slidesObj;
        render();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }
    

//})


//=====red=====
//filter.forEach(function() {
    buttonRed.onclick = function() {
        filterImg = colorFilter(slidesObj, function(item){
            return item.color == 'red'; 
        });
        render();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }
//}) 

//=====black=====
//filter.forEach(function() {
    buttonBlack.onclick = function() {
        filterImg = colorFilter(slidesObj, function(item){
            return item.color == 'black'; 
        });
        render();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }

btnPrev.onclick = function() {
    prevSlide();
    showSlide(currentSlide);
    switchDot(currentSlide);
}
btnNext.onclick = function() {
    nextSlide();
    showSlide(currentSlide);
    switchDot(currentSlide);
}

//})

//=====blue=====
//filter.forEach(function() {
    buttonBlue.onclick = function() {
        filterImg = colorFilter(slidesObj, function(item){
            return item.color == 'blue'; 
        });
        render();
        showSlide(currentSlide);
        switchDot(currentSlide);
    }

//})  


function render() {
    const sliderEl = doc.querySelector('.slider');
    let sliderHtml = '';
    const slidesHtml = filterImg.map(function(slide) {
        return `
            <div class="slide">
                <img class="slide-img" src="${imgPath}/${slide.img}" alt="">
                <span class="slide-color" style="background: ${slide.color}"></span>
            </div>
        `;
    }).join('');
    const dotsHtml = filterImg.map(function() {
        return `<button class="dot"></button>`;
    }).join('');

    sliderHtml = `
        <div class="slides">${slidesHtml}</div>
        <div class="sliderBtns">
            <button class="btn btn-prev">prev</button>
            <button class="btn btn-next">next</button>
        </div>
        <div class="sliders-dots">${dotsHtml}</div>
    `;

    sliderEl.innerHTML = sliderHtml;

    btnPrev = doc.querySelector('.btn-prev');
    btnNext = doc.querySelector('.btn-next');
    slides = doc.querySelectorAll('.slide');
    dots = doc.querySelectorAll('.dot');
}

function getIndex(context) {
    let dotIndex = 0;
    dots.forEach(function(dot, index) {
        if (dot.classList.contains('dot-active')) {
            dotIndex = index;
        }
        // if (dot == context) {
        //     dotIndex = index;
        // }
    });
    return dotIndex;
}

function switchDot(curSlide) {
    dots.forEach(function(item) {
        item.classList.remove('dot-active');
    });
    dots[curSlide - 1].classList.add('dot-active');
}

function setActiveDot(currentDot) {
    dots.forEach(function(item) {
        item.classList.remove('dot-active');
    });
    currentDot.classList.add('dot-active');
}

function showSlide(currSlide) {
    slides.forEach(function(slide) {
        slide.classList.remove('slide-active');
    });
    slides[currSlide - 1].classList.add('slide-active');
}

function prevSlide() {
    currentSlide --;
    if (currentSlide < 1) {
        currentSlide = slidesCount;
    }
}

function nextSlide() {
    currentSlide ++;
    if (currentSlide > slidesCount) {
        currentSlide = 1;
    }
}


function colorFilter(arr, callback) {
    let copyArr = arr.slice();
    let filterArr = [];
    let index = copyArr.findIndex(function(item) {
        return callback (item);
    });

    while(index != -1) {
        filterArr.push(copyArr[index]);
        copyArr.splice(index, 1)

        index = copyArr.findIndex(function(item) {
            return callback (item);
        });
    }

    return filterArr;
}