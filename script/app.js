const fotos = document.querySelector('.div-fotos');
const btn = document.getElementById('btn-search');
const input = document.getElementById('input')

let res = ""

btn.addEventListener("click", () => {
    res = input.value
    searchMatches()
    input.value = ""
});

input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        res = input.value
        input.value = ""
        searchMatches()
    }
});

function searchMatches(){
    res = res.split(" ")
    res.forEach( element => {
        if ( element == "mistborn" ){      
            let secuel = res.find((element) => element == 2)
            let third = res.find((element) => element == 3)
            let four = res.find((element) => element == 4)
            let five = res.find((element) => element == 5)
            let six = res.find((element) => element == 6)
            if ( secuel == 2 ) {
                fotos.innerHTML += `<a href="../preview/mistborn2.html"><image src="../img/mistborn_2.png"><a/>`
            } 
            else if ( third == 3 ) {
                fotos.innerHTML += `<a href="../preview/mistborn3.html"><image src="../img/mistborn_3.png"></a>`
            }else if ( four == 4 ) {
                fotos.innerHTML += `<a href="../preview/mistborn4.html"><image src="../img/mistborn_4.png"></a>`
            }else if ( five == 5 ) {
                fotos.innerHTML += `<a href="../preview/mistborn5.html"><image src="../img/mistborn_5.png"></a>`
            }else if ( six == 6 ) {
                fotos.innerHTML += `<a href="../preview/mistborn6.html"><image src="../img/mistborn_6.png"></a>`
            }else {
                fotos.innerHTML += `<a href="../preview/mistborn1.html"><image src="../img/mistborn_1.png"></a>`
            }
        }
    });
}
