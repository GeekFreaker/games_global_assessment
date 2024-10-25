import Swal from 'sweetalert2'
import {hideRow, showAll, showRow, getIt} from './main.js'


var set  = 0
var diff = 0
var bt   = 0
var bombCount = 0
var diamondCount = 0

var row = set, 
      column = set
let sourceArray,
    playArray,
    kill= 0,amount = 0.0;


// Set difficulty 
function difficulty(num = diff) {
  return Math.floor(Math.random() * num)
}

// Calculate winnings based on a multiplier 
// not sure how this is achieved just set a value 
// for each correct guess 
function calculateWinnings(bet) {
  if(bet==='diamond') 
    amount+=amount*(25/100);
}

// Creates the needed array for the game 
function makeArray(type, column, row, val) {
  let arr = [];
  for(let i = 0; i < column; i++) {
      arr[i] = [''];
      for(let j = 0; j < row; j++) {
          if(i == 0  && j <= 1 || i == 1  && j <= 2 ||
             i == 2  && j <= 3 || i == 3  && j <= 4 ||
             i == 4  && j <= 5 || i == 5  && j <= 6 ||
             i == 6  && j <= 7 || i == 7  && j <= 8 ) 
          {
            if(type=='play') {
              arr[i][j] = difficulty(bt) ? 'bomb' : 'diamond';
              Counter(arr[i][j]);
            } else {
              arr[i][j] = '';
            }
          
          } else { 
            arr[i][j] = val;
            delete arr[i][j];
            arr[i].length = i+2;
          }

          if(j==row+1) arr.length=row;
       }
       if(4>row<6) {
        delete arr[row-1];
        console.log('u there ',arr)
        arr.length=row;
        arr = arr.filter(()=>{
          return arr != null
        })
      }
  }
  return arr;
}


// Something to output when the game is over
function Counter(compare) {
  if(compare=='bomb') 
    bombCount++
   else 
    diamondCount++
}

// Set selection when a selection is made
function compareWithValueArray(x,y,z) {
    console.log('set',set,'source ->',sourceArray,'play->',playArray)
    
    if(z!='setup') {
        sourceArray[x][y] = playArray[x][y];
    }
    
    if (sourceArray[x][y] == 'bomb') {
        kill=1;
        if(z!='setup') disable(x,y,'body')
    } else {
        if(z!='setup') disable(x,y,'card')
    }
    return playArray
}

// This function will ensure that eacxh click is noted
function disable(x,y,val) {
    let pos = parseInt(x[0]); 
    if(val=='card') {
        
        const el = document.getElementById(`card_${pos}`);
        //if what you have clicked is a diamond
        if(pos==0 && sourceArray[x][y]=="diamond"){
          showAll(0,'Congrats 🎉',bombCount,diamondCount, amount)
          exit;
        }
        const all = el.getElementsByTagName('button');
        console.log('num2',all);
        const nextEl = document.getElementById(`card_${pos+1}`);
        const nextAll = nextEl.getElementsByTagName('button');
        
        console.log('all',all)
        for (let i = 0; i < all.length; i++) {
          all[i].disabled = false;  
        }
        pos++
        showRow(pos);

        for (let i = 0; i < nextAll.length; i++) {
          nextAll[i].disabled = true;
        }
        console.log('ss pos', pos)
        if(pos>1) hideRow(pos--)
        
    } else {
      const elements = document.querySelectorAll("button")
      for (let i = 0; i < elements.length; i++) {
         elements[i].disabled = true;
      }
      showAll(0,'Game Over 😞',bombCount,diamondCount,amount) 
    }
}


// Game Play
/**************
 * set Bombs.
 * 
 * set Diamonds.
 * 
 * Make a selection on the first button interface
 * 
 * 
 * My approach lacks pixijs but I will take a look at how
 * I can modify this code base in the future using pixiJs
 * 
 * I basically have 2 arrays and they contain all the 
 * conditions needed to play this game. 
 * 
 ***********/
export function main(x,y) {
    let App = getIt()
    console.log(App)
    set  = App.state.x
    diff = App.state.y
    bt   = App.state.z

    row = set 
    column = set

    sourceArray = makeArray('source',column,row,'')
    playArray = makeArray('play',column,row, '')

    const elements = document.querySelectorAll("button");
    for (let i = 0; i < elements.length; i++) { 
      elements[i].disabled = true;
    }
    
    while (kill!=1) {
      return compareWithValueArray(x,y,'setup')
    }
}


// On Click function to set and conpared Array Values 
export function setMe(x,y) {
    compareWithValueArray(x,y)
    amount+=calculateWinnings(playArray[x][y])
    return playArray[x][y]
}


// Used to get the in-play Array
export function getPlayArray() {
    return playArray;
}

// Used to get the source or empty Array
export function getSourceArray() {
  return sourceArray;
}
