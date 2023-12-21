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


    // const res = await fetch("https://api.masoudkf.com/v1/wordle", { server has been shutdown so cant fetch anymore
    //     headers: {
    //     "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    //     },
    // });
    // let json = await res.json();
    // let {dictionary} = json;
    // dict = dictionary;
    // return dict;

    dict = [
        {"word": "lion", "hint": "A large carnivorous wildcat"},
        {"word": "bird", "hint": "A feathered vertebrate with wings"},
        {"word": "fish", "hint": "An aquatic vertebrate animal with gills"},
        {"word": "frog", "hint": "An amphibian with smooth skin and long hind legs"},
        {"word": "wolf", "hint": "A wild carnivore related to the dog"},
        {"word": "bear", "hint": "A large heavy mammal with thick fur and a very short tail"},
        {"word": "milk", "hint": "A white liquid produced by mammals"},
        {"word": "rice", "hint": "A staple food grain"},
        {"word": "corn", "hint": "A cereal plant that yields large grains, or kernels"},
        {"word": "kiwi", "hint": "A flightless bird or a fuzzy brown fruit"},
        {"word": "herb", "hint": "A plant used for flavoring, food, medicine, or perfume"},
        {"word": "jazz", "hint": "A type of music of black American origin"},
        {"word": "knee", "hint": "The joint between the thigh and the lower leg"},
        {"word": "lamb", "hint": "A young sheep"},
        {"word": "maze", "hint": "A network of paths designed as a puzzle"},
        {"word": "neck", "hint": "The part of a person's body connecting the head to the rest of the body"},
        {"word": "oval", "hint": "A shape resembling a squashed circle"},
        {"word": "palm", "hint": "The inner surface of the hand"},
        {"word": "quiz", "hint": "A test of knowledge, especially a brief, informal test"},
        {"word": "rope", "hint": "A thick, strong cord made by twisting together strands of material"},
        {"word": "silk", "hint": "A fine, strong, soft, lustrous fiber produced by silkworms"},
        {"word": "tuna", "hint": "A large and economically important fish"},
        {"word": "urn", "hint": "A tall, rounded vase with a stem and base"},
        {"word": "vase", "hint": "A decorative container without handles"},
        {"word": "wasp", "hint": "A flying insect, often with a sting"},
        {"word": "yarn", "hint": "A long continuous length of interlocked fibers"},
        {"word": "zinc", "hint": "A bluish-white metal used in alloys and galvanizing"},
        {"word": "acid", "hint": "A chemical substance that can turn litmus red"},
        {"word": "bald", "hint": "Having no hair on the scalp"},
        {"word": "chef", "hint": "A professional cook"},
        {"word": "dive", "hint": "To plunge headfirst into water"},
        {"word": "echo", "hint": "A sound that is reflected off a surface and heard again"},
        {"word": "fare", "hint": "The money paid for a journey on public transportation"},
        {"word": "golf", "hint": "A game played on a large open course with 9 or 18 holes"},
        {"word": "hail", "hint": "Frozen raindrops which fall as ice pellets"},
        {"word": "iris", "hint": "A part of the eye or a type of flowering plant"},
        {"word": "jade", "hint": "A hard, typically green stone used for ornaments"},
        {"word": "kite", "hint": "A toy that flies in the air at the end of a long string"},
        {"word": "lava", "hint": "Molten rock that erupts from a volcano"},
        {"word": "moat", "hint": "A deep, wide ditch surrounding a castle, fort, or town"},
        {"word": "node", "hint": "A point in a network or diagram where lines intersect"},
        {"word": "opus", "hint": "A creative work, especially a numbered composition"},
        {"word": "peak", "hint": "The pointed top of a mountain"},
        {"word": "quay", "hint": "A concrete, stone, or metal platform lying alongside water"},
        {"word": "raft", "hint": "A flat buoyant structure of timber or other materials"},
        {"word": "seal", "hint": "A sea mammal or a device for closing an entrance"},
        {"word": "tint", "hint": "A shade or variety of color"},
        {"word": "ulna", "hint": "A bone in the forearm"},
        {"word": "vent", "hint": "An opening that allows air, gas, or liquid to pass out"},
        {"word": "weld", "hint": "To join metals by heating"},
        {"word": "yoga", "hint": "A Hindu spiritual and ascetic discipline"},
        {"word": "zest", "hint": "Great enthusiasm and energy"},
        {"word": "arch", "hint": "A curved structure spanning an opening"},
        {"word": "bolt", "hint": "A metal pin or bar, in particular"},
        {"word": "clay", "hint": "A stiff, sticky fine-grained earth"},
        {"word": "dusk", "hint": "The darker stage of twilight"},
        {"word": "envy", "hint": "A feeling of discontented longing for someone else's possessions"},
        {"word": "flap", "hint": "To move up and down or from side to side"},
        {"word": "glow", "hint": "To emit a steady radiance of light"},
        {"word": "hive", "hint": "A place where bees live and produce honey"},
        {"word": "jolt", "hint": "A sudden rough shake or push"}
    ];
    
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
