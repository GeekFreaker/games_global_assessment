import './style.css';
import { getPlayArray, main, setMe } from './matrix.js';
import Swal from 'sweetalert2';


document.querySelector('#app').innerHTML = `
  <div class="GameBorder">
    <div class="card" id="card_1"></div>
    <div class="card" id="card_2"></div>
    <div class="card" id="card_3"></div>
    <div class="card" id="card_4"></div>
    <div class="card" id="card_5"></div>
    <div class="card" id="card_6"></div>
    <div class="card" id="card_7"></div>
    <div class="card" id="card_8"></div>
  </div>
`

function welcome() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "Chilled Bombadier (Lite Version)",
    title: "Done by LGM Matabane"
  });
  showAlert() 
}



// An alert to setup the UI
async function showAlert() {
  const { value: formValues } = await Swal.fire({
    title: "<h4>Rows, Difficulty & Amount</h4>",
    html: `
      <label style="padding-right:20px"> Rows </label>
       <div onclick="firstButton()"> 
        <button type="button" style="width:10%;background:white;color:black" class="tight swal2-confirm"> 4 </button> 
        <button type="button" style="width:10%;background:white;color:black" class="tight swal2-confirm"> 5 </button> 
        <button type="button" style="width:10%;background:white;color:black" class="tight swal2-confirm"> 6 </button> 
        <button type="button" style="width:10%;background:white;color:black" class="tight swal2-confirm"> 7 </button>
        <button type="button" style="width:10%;background:white;color:black" class="tight swal2-confirm"> 8 </button>  
       </div>
       <br/>

      <label style="margin-right:-10px"> Difficulty </label>
      <div onclick="secondButton()">
       <button type="button" style="width:30%;background:white;color:black" class="swal2-confirm swal2-styled"> Easy </button> 
       <button type="button" style="width:30%;background:white;color:black" class="swal2-confirm swal2-styled"> Medium </button> 
       <button type="button" style="width:30%;background:white;color:black" class="swal2-confirm swal2-styled"> Hard </button> 
      </div>
      
      <br/>
      <br/>
      <label> Bet Amount </label>
      <div>
      <button type="button" style="background:white;color:black" class="swal2-confirm swal2-styled"> << </button> 
      <input type="number" style="width:25%" id="swal-input3" class="swal2-input"/>
      <button type="button" style="background:white;color:black" class="swal2-confirm swal2-styled"> >> </button> 
      </div>
          `,
    showDenyButton: false,
    confirmButtonColor: "#056432",
    denyButtonColor: "#d33",
    confirmButtonText: "Bomb's Away",
    focusConfirm: false,
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
    preConfirm: () => {
      return {
        'x': parseInt(uno),
        'y': parseInt(duo),
        'z': parseInt(document.getElementById("swal-input3").value)
      };
     }
    });
    if (formValues) {
      // Swal.fire(JSON.stringify(formValues));
      Application.state = formValues;
      if(!isNaN(formValues.s)){
        showAlert()
      } else {
        setTimeout(() => {
          MainPage(main(0,0));
        }, delay);
     }
    }   
}



// show all the buttons and their contents
export function showAll(card,msg,x,y,amount) {
  let finalMesg = `
   \n\t\ Your bomb Count is equal to : ${x}.
   \n\t\ Your diamond count is equal to : ${y}.
   \n\t\ your winnings are ZAR ${amount}.00

   \n\t\ This Game will restart in 5 seconds
  `
  if(msg=='Congrats 🎉') {
    Swal.fire({
      title: "{}",
      text: `You did well, time to sit back relax and count your 💎💎s \n\n Well Done ${finalMesg}`,
      showDenyButton: true,
      confirmButtonColor: "#056432",
      denyButtonColor: "#d33",
      confirmButtonText: "Done",
      denyButtonText: `Play Again`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Refresh your browser to play again", "", "success");
      } else if (result.isDenied) {
        restartMission(); 
      }
    });
  } else {
    setTimeout(()=>{
      Swal.fire({
        title: `${msg}`,
        text: `Tough Major 💣..gotta watch ur 6!\n\t\
               \n\t\
               We have another mission due.
               \n\t\
               ${finalMesg}
               \n\t\
               \n\t\ Are you game 💎?`,
        showDenyButton: true,
        confirmButtonColor: "#056432",
        denyButtonColor: "#d33",
        confirmButtonText: "Why not",
        denyButtonText: `Not today Private`
      }).then((result) => {
        if (result.isConfirmed) {
          restartMission();
        } else if (result.isDenied) {
          Swal.fire("Take a seat soldier \n\n (restart your browser to try again)", "", "info");
        }
      });
    },delay);
  }

for (let i = 0; i < getPlayArray()[i].length; i++) {
  card++;
  for(let j = 0; j < getPlayArray()[i].length; j++) {
      const cardId = document.getElementById('card_'+card)
      const btn = cardId.querySelectorAll('button')

      if(getPlayArray()[card-1][j]!==undefined){
        btn[j].innerHTML = ''
        btn[j].setAttribute('class', `button val_${card-1}${j} ${getPlayArray()[card-1][j]}`);
      }  
    }
 }
}


//swal p[o up for another mission
export function restartMission() {
  let timerInterval;
  Swal.fire({
    title: "This mission restarts in 5 mins",
    html: "I will close in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      playAgain();
    }
  });
}  

// reloads the screen for another game 
function playAgain() {
  window.location.reload()
}


// show this row after a specific row was selected
export function showRow(card) {
    for (var j = 0; j < getPlayArray().length; j++ ) {
      const cardId = document.getElementById('card_'+card);
      const btn = cardId.querySelectorAll('button')

      btn[j].disabled = true
      btn[j].innerHTML = ''
      if(j==clicked) btn[j].setAttribute('set','')
      btn[j].setAttribute('class', `button val_${card-1}${j} ${getPlayArray()[card-1][j]}`)
    }
}


// disabled all the rows one buttons at a time
export function hideRow(card) {
  for (var j = 0; j < getPlayArray().length; j++ ) {
    const cardId = document.getElementById('card_'+card);
    const btn = cardId.querySelectorAll('button')
    btn[j].innerHTML = ''
    if(j==clicked) btn[j].setAttribute('set','')
    btn[j].disabled = true
  }
}

//setup all buttons on the Main Page
function MainPage(array) {
  let card =0;

  for (let i = 0; i < array.length; i++ ) {
    card++;
    for (let j = 0; j < array.length+1; j++ ) {
      const btn = document.createElement('button')
      const cardId = document.getElementById('card_'+card);
      btn.innerHTML = 'bt_'+i+j
      btn.id = `${i}${j}`
      btn.addEventListener('click', function(x) {
        setUp(x)
      });
      btn.setAttribute('class', `button val_${i}${j}`);
      if(card>8 && card!=array.length-1)btn.disabled = true;
      if(card<8 && card!=array.length)btn.disabled = true;
      if(array[i] && array[i][j]!=undefined)
         cardId.appendChild(btn);
    }
  }
}

// on click setup the clicked button
function setUp(x) {
  const position = x.target.innerHTML.slice(-2);
  clicked = Array.from(position)[1];
  const response = setMe(Array.from(position)[0],Array.from(position)[1],'play')
  
  x.srcElement.className += ' '+response
  x.target.setAttribute('set','')
}

// star the vars
var clicked = 0, toughness =2 , bet =2, str = 6; 


//the UI starts here
function presets() {
   welcome()
   document.getElementById("my_audio").play();
}

function testPrompt() {
   st = prompt("Please enter row and col")
   t = prompt("Please enter difficulty level")
   b = prompt("Please snter bet")
   return {'x':st,'y':t,'z':b}
}

export function getIt(st,t,b) {
  return Application
}

// Start my game over here
presets()

