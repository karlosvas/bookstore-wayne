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
            if ( secuel == 2 ) {
                fotos.innerHTML += `<a href="../preview/mistborn2.html"><image src="../img/mistborn_2.png"><a/>`
            } 
            else if ( third == 3 ) {
                fotos.innerHTML += `<a href="../preview/mistborn3.html"><image src="../img/mistborn_3.png"></a>`
            }else {
                fotos.innerHTML += `<a href="../preview/mistborn1.html"><image src="../img/mistborn_1.png"></a>`
            }
        }
    });
}
