const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const textTempo = document.querySelector('#tempo');
const textScore = document.querySelector('#score');
const play = document.querySelector('#play');

let isJumping = false;
let isGameOver = false;
let position = 0;
let tempoJogo = 0;
let pontos = 0;

function contarTempo(){
  var tempo = setInterval(()=>{
   tempoJogo++;
   console.log(tempoJogo)
   textTempo.textContent = 'Time: '+ tempoJogo;
   textScore.textContent = 'Score: '+ (pontos);

   if(isGameOver){
     clearInterval(tempo)
   }
   if(tempoJogo>=10){
     document.body.style.background= '#838687'
     background.style.background = 'url(/img/background-preto.png)'
   }
  
   
 },1000)
}

window.addEventListener('load',contarTempo);
function handleKeyUp(ev) {
  console.log(ev)
  if (ev.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;


  let upInterval = setInterval(() => {
    if (position >= 180) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 25);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 30);
}

function createCactus() {
  const cactus = document.createElement('div');
  const cactusImg = document.createElement('img')
  cactusImg.src = 'img/cactus.gif'
  cactusImg.style.height = '100px';
  cactusImg.style.width = '60px';

  let cactusPosition = 800;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.appendChild(cactusImg)
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < 0) {
      // Saiu da tela
      clearInterval(leftTimer);
      pontos += 10    
      background.removeChild(cactus);
    } else if (cactusPosition > 100 && cactusPosition < 140 && position < 100) {
      // Game over
      console.log('bateu '+ position)
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.removeChild(background)
      play.style.display = 'block'
      
    } else {
      cactusPosition -= 8;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  play.addEventListener('click',()=>{
    
    document.location.reload(true);
  })
  setTimeout(createCactus, randomTime);
}





createCactus();
document.addEventListener('keydown', handleKeyUp);