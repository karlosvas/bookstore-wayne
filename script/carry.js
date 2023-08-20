btnCarry = document.querySelector('.btn-carry')
main = document.querySelector('.div-main')
carryIcon = document.getElementById('carry')
title = document.getElementById('title')
carry = []

btnCarry.addEventListener(("click"), ()=>{
    carry = [title.innerHTML]
})

carryIcon.addEventListener(("click"), ()=>{
    const carryContent = `<div class="carry-list"><b>Su carrito es:</b><br> ${carry}</div>`
    main.insertAdjacentHTML('beforeend', carryContent);
    setTimeout(() => {
    const carryList = main.querySelector('.carry-list');
    carryList.classList.add('active');
    }, 0);
})