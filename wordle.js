//Sudarshan Naicker
// UCID: 30162797
// ENSF 381 Assignment-5-wordle-lec02


var dict;
let word;
let hint;


var height = 4;    //number of guesses (column)
var width = 4;     //length of the word (row)
var col = 0;       // current letter for the attempt
var row = 0;       // attempt #



var gameOver = false;


window.onload = async function(){

    
    await getdict();
    await wordhint();
    await initialize();
}



/*                                                Fetching Dictionary                                           */ 

const getdict = async() => {


    
    let loading = document.getElementById("againbtn");

    loading.disabled = true;
    loading.innerText = "loading...";


    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        },
    });

    
    let json = await res.json();
    let {dictionary} = json;
    dict = dictionary;


    loading.disabled = false;
    loading.innerText = "Start Over";

    return dict;

    
    
}

/*                                                Fetching Word and Hint                                           */ 

async function wordhint(){

        
        
    let index = Number.parseInt(Math.random() * dict.length);

    let wordle = dict[index];
    word = wordle.word.toUpperCase();
    hint = wordle.hint;

}



/*                                                Main function                                           */ 

async function initialize(){
    

    
    
    
    
    

    for(let r = 0; r < height; r++ ){
        for (let c = 0; c < width; c++){
            let tiles = document.createElement("span");
            tiles.id = r.toString() + "-" + c.toString();
            tiles.classList.add("tiles");                         // joins the class tiles from style.css
            tiles.innerText = "";
            document.getElementById("box").appendChild(tiles);
        }
    }


    document.addEventListener("keyup", (e) => {
        
        if(gameOver) return;
        
        if ("KeyA" <= e.code && e.code <= "keyZ" ){
            if(col < width){
                let currfile = document.getElementById(row.toString() + '-' + col.toString());
                if(currfile.innerText == ""){
                    currfile.innerText = e.code[3]
                    col += 1;

                }
            }
        }

        else if (e.code == "Backspace"){
            if ( 0 < col && col <= width){
                col -= 1;

            }
            let currfile = document.getElementById(row.toString() + '-' + col.toString());
            currfile.innerText = "";
        }

        else if (e.code == "Enter"){

            if(col == width  ){
                update();
                row += 1;
                col = 0;
            }

            else{
                window.alert("How can you be so Dumb ? Type in a 4 letter word please")
            }


        }

        if (!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = "You missed the word " + word + " and LOST!!";
            document.getElementById("answer").style.backgroundColor = "red";
            document.getElementById("answer").style.fontSize = "large"
        }

    })

}


/*                                                Update function  (after giving a guess)                                         */ 



async function update() {

    

    let correct = 0;  
    let letterCount  = {}; 

    for(let i = 0; i < word.length; i++){

        letter = word[i];

        if(letterCount[letter]){         
            letterCount[letter] += 1;
        }
        else{
            letterCount[letter] = 1;
        }
    }



    // to check the correct letters
    for (let c = 0; c < width; c++){
        
        let currfile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currfile.innerText;  


        if (word[c] == letter) {

            
            currfile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1; 
        }

        if (correct == width){
            (gameOver = true);
            
        }

        if (gameOver == true){
            openWinGame();



        }

    }


    // to check for the position
    for (let c = 0; c < width; c++){
        
        
        let currfile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currfile.innerText;

        if (!currfile.classList.contains("correct")){
            if (word.includes(letter) && letterCount[letter] > 0){
                currfile.classList.add("wrongplace");
                letterCount[letter] -= 1;
            }

            else {
                currfile.classList.add("absent");
            }
        }

    }

}


/*                                        Popup functions for Instructions                                  */ 

function openInst(){
    let Inst = document.getElementById("rightside");

    if(!Inst.classList.contains("rightside-info")){

        Inst.classList.add("rightside-info");
    }

    else{
        
        Inst.classList.remove("rightside-info");
    }
}



/*                                                Invert colors functions                                 */ 

function Invert(){

    let headerbtn = document.getElementsByClassName("headerbtn")

    if(!document.body.classList.contains("black")){

        document.body.classList.add("black");
        for (button of headerbtn){
            // button.style.backgroundColor = "black";
            // button.style.color = "white";
            button.classList.add("black");
            

        }
    }
    else{

        document.body.classList.remove("black");
        for (button of headerbtn){
            // button.style.backgroundColor = "white";
            // button.style.color = "black";
            button.classList.remove("black");
            

        }

    }
    



}



/*                                                     HINT                                                */ 


function openhint(){

    let HINT = document.getElementById("foothint");
    HINT.innerHTML =  "HINT: " + hint ;
    HINT.style.border = "solid 2px";
    HINT.style.backgroundColor = "#00ff11";
    
}



/*                                                    WIN MESSAGE                                               */ 



function openWinGame(){

    

    let Imge = document.getElementById("imge");
    Imge.style.display = "block"
    
    let Box = document.getElementById("box");
    Box.style.display = "none";



    let audio = new Audio("yay.mp3");
    audio.play();


}



/*                                                    STARTOVER                                              */ 







async function STARTOVER() {


    
    let Box = document.getElementById("box");
    let hintButton = document.getElementById("foothint");
    let answer = document.getElementById("answer");
    let Imge = document.getElementById("imge");
    

    Box.style.display = "flex";

    Imge.style.display = "none";

    answer.innerText = "";
    answer.style.backgroundColor = "";

    hintButton.innerHTML =  "" ;
    hintButton.style.border = "";
    hintButton.style.backgroundColor = "";


    for(let r = 0; r < height; r++ ){
        for (let c = 0; c < width; c++){
            let tiles = document.getElementById(r.toString() + "-" + c.toString());
            tiles.innerText = "";
            tiles.classList.remove("correct");
            tiles.classList.remove("wrongplace");
            tiles.classList.remove("absent");
        }
    }

    col = 0; 
    row = 0;
    wordhint();
    console.log(word);
    
    

    gameOver = false;



}
