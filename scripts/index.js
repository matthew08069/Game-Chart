var i = 0;
var gameImg = [];
var gameLink = [];
var time = 3000;

gameImg[0] = "../images/Halo_Reach.png";
gameImg[1] ="../images/Halo_4.png";
gameImg[2] = "../images/MK64.png";
gameImg[3] = "../images/Minecraft.png";
gameImg[4] = "../images/Final_Fantasy_VII.jpg";

gameLink[0] = "game.html?game=43244";
gameLink[1] ="game.html?game=43246";
gameLink[2] = "game.html?game=34611";
gameLink[3] = "game.html?game=17708";
gameLink[4] = "game.html?game=37880";

function changeSlide(){
    document.getElementById("scroller").src = gameImg[i]
    document.getElementById("gameLink").href = gameLink[i]
    if(i < gameImg.length-1)
        i++;
    else
        i = 0;
    setTimeout("changeSlide()", time);
}

window.onload = changeSlide();