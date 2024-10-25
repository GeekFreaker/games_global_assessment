var Application = {}
var delay = 1000

Application.state = {
          x: 4,
          y: 4,
          z: 2
      };
var uno,duo = 0;
function firstButton() {
      const element = document.activeElement;
      uno = element.innerHTML;  
}

function secondButton() {
     const element = document.activeElement;
     switch(element.innerHTML.trim()){
     case 'Easy':
        duo = 1;
        break;
     case 'Medium':
        duo = 2;
        break;
     case 'Hard':
        duo = 3;
        break;
     }
     
}