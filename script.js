let blackjackGame={
    'you':{'scoreSpan':'your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'dealer-blackjack-result','div':'#dealer-box','score':0},
    'card':['2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','A.png','J.png','K.png','Q.png'],
    'cardMap':{'2.png':2,'3.png':3,'4.png':4,'5.png':5,'6.png':6,'7.png':7,'8.png':8,'9.png':9,'10.png':10,'A.png':[1,11],'J.png':10,'K.png':10,'Q.png':10}

}
let dealboolean=false; 
let imageArray=blackjackGame['card'];
let you=blackjackGame['you']['div'];
let youScore=blackjackGame['you'];

let dealerScore=blackjackGame['dealer'];
let dealer=blackjackGame['dealer']['div'];

const hitSound=new Audio('sounds/swish.m4a');
const lostSound=new Audio('sounds/aww.mp3');
const wonSound=new Audio('sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackstand);

function sleep(ms)
{
return new Promise(resolve => setTimeout(resolve,ms));

}
async function blackjackstand()
{  
    if(youScore['score']>0)
    {
    while(dealerScore['score']<16)
   {
    let card=randomCard();
    addCard(dealer,card,dealerScore);
    
    if(dealerScore['score']>21)
    {
        document.querySelector('#dealer-blackjack-result').textContent='BUST!';
        document.querySelector('#dealer-blackjack-result').style.color='red';
    }
    else{
        document.querySelector('#dealer-blackjack-result').innerHTML=dealerScore['score'];
    }
    
    await sleep(1000);   
}
   computeWinner();
   console.log(dealboolean);
   dealboolean=true;
   console.log(dealboolean);
}
}
function computeWinner(){
 if(youScore['score']<=21)
 {
     if(dealerScore['score']>21)
     {
         console.log("you won");
         won();
     }
     else if(dealerScore['score']>youScore['score'])
     {
         console.log("you lost");
        lose();
     }
     else if(dealerScore['score']==youScore['score'])
     drew();
     else
     won();
 }
 else
 {
  if(dealerScore['score']>21)
  drew();
  else
  lose();


 }
}
function won()
{    wonSound.play();
    document.querySelector('#blackjack-result').innerHTML="You Won!";
    document.querySelector('#blackjack-result').style.color='green';
    let x=document.querySelector('#wins').innerHTML;
    x++;
    document.querySelector('#wins').textContent=x;

}
function lose(){
    lostSound.play();
    document.querySelector('#blackjack-result').innerHTML="You Lost!";
    document.querySelector('#blackjack-result').style.color='red'; 
    let x=document.querySelector('#losses').innerHTML;
    x++;
    document.querySelector('#losses').textContent=x;

}
function drew()
{document.querySelector('#blackjack-result').innerHTML="Draw!";
document.querySelector('#blackjack-result').style.color='yellow'; 
let x=document.querySelector('#draws').innerHTML;
x++;
document.querySelector('#draws').textContent=x;
}

function blackjackHit(){
    if(blackjackGame['dealer']['score']==0)
    {
    
    if(document.querySelector('#your-blackjack-result').textContent!="BUST!")
   { 
    let card=randomCard();
    addCard(you,card,youScore);
    document.querySelector('#your-blackjack-result').innerHTML=youScore['score'];
    if(blackjackGame['you']['score']>21)
    {
        document.querySelector('#your-blackjack-result').textContent="BUST!";
        document.querySelector('#your-blackjack-result').style.color="red";
    }
    console.log(blackjackGame['you']['score']);
    }
  }
}

function randomCard(){
    let x=Math.floor(Math.random()*13);
    return imageArray[x];
}
function addCard(div,randomimage,score){
    if(randomimage=='A.png')
    {
     if(score['score']+11<=21)
     score['score']+=11;
     else
     score['score']+=1;
    }
    else{
        score['score']+=blackjackGame['cardMap'][randomimage];
    }
    let image=document.createElement('img');
    image.src='images/'+randomimage;
    document.querySelector(div).appendChild(image);
    hitSound.play();

}

function blackjackDeal(){
 
    if(dealerScore['score']>15&&(dealboolean==true))
    {
     dealboolean=false;
    let yourimages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0;i<yourimages.length;i++)
    {
    yourimages[i].remove();
    }
    for(let i=0;i<dealerimages.length;i++)
   {
    dealerimages[i].remove();
   }
   document.querySelector('#blackjack-result').innerHTML="Let's Play Again";
   document.querySelector('#blackjack-result').style.color='white';
   document.querySelector('#your-blackjack-result').innerHTML="0";
   document.querySelector('#your-blackjack-result').style.color='white';
   document.querySelector('#dealer-blackjack-result').innerHTML="0";
   document.querySelector('#dealer-blackjack-result').style.color='white';
   youScore['score']=0;
   dealerScore['score']=0;
}
}