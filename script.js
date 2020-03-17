//challenge1: age in days
function ageInDays()
{
    var birthdate = prompt("what is your birthdate?.....Good friend! Date should be in format(MM/DD/YYYY)");
    var date1= new Date(birthdate);
    var date2= new Date();
    var ageInTime = date2.getTime()-date1.getTime();
    var ageInDayss=ageInTime/(1000*3600*24);
    console.log(ageInDayss);
    var h1=document.createElement('h1');
    console.log(h1);
    var textAnswer=document.createTextNode('you are '+ageInDayss+' days old');
    console.log(textAnswer);
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    console.log(h1);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset()
{
    document.getElementById('ageInDays').remove();
}

// Challenge2: Generate Cat

function generateCat(){
    var img=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    img.src="http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(img);
}

//Challenge3 : Rock Paper Scissor

function rpsGame(yourChoice)
{
    var humanChoice,boatChoice;
    humanChoice=yourChoice.id;
    boatChoice=numberToChoice(randToRpsInt());
    console.log(boatChoice);
    result=decideWinnner(humanChoice,boatChoice);
    console.log(result);
    messages=finalMessages(result);
    rpsFrontEnd(yourChoice.id,boatChoice,messages);
}

function randToRpsInt()
{
    return Math.floor(Math.random()*3);
}

function numberToChoice(number)
{
    return ["rock","paper","scissor"][number];
}

function decideWinnner(yourChoice,machineChoice)
{
    var rpsDatabase={
        "rock":{"rock":0.5,"scissor":1,"paper":0},
        "scissor":{"scissor":0.5,"rock":0,"paper":1},
        "paper":{"paper":0.5,"rock":1,"scissor":0}
    };
    var yourScore=rpsDatabase[yourChoice][machineChoice];
    var machineScore=rpsDatabase[machineChoice][yourChoice];
    return [yourScore,machineScore];
}

function finalMessages([yourScore,machineScore])
{
    if(yourScore==0)
    {
        return {'messages':'You Lost!','color':'red'};
    }
    else if(yourScore==0.5)
    {
        return {'messages':'You Tied!','color':'yellow'};
    }
    else{
        return {'messages':'You Won!','color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessages)
{
    var imageDatabase={
        "rock":document.getElementById("rock").src,
        "paper":document.getElementById("paper").src,
        "scissor":document.getElementById("scissor").src
    };

    //lets remove the images
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissor").remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+ imageDatabase[humanImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 58, 233, 1);'>";
    messageDiv.innerHTML="<h1 style='color: "+finalMessages['color']+"; font-size:60px ;padding:30px; '>"+finalMessages['messages']+"</h1>"
    botDiv.innerHTML="<img src='"+ imageDatabase[botImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 233, 1);'>";
    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
}

function playAgain()
{
    location.reload();
}

//Challenges4 : change button color

var all_button=document.getElementsByTagName('button');
copyAllbuttons=[];
for(let i=0;i<all_button.length;i++)
{
    copyAllbuttons.push(all_button[i].classList[1]);
}
//console.log(copyAllbuttons);
function buttonColorChange(buttonThingy)
{
    if(buttonThingy.value=='red')
    {
        buttonRed();
    }
    else if(buttonThingy.value=='green')
    {
        buttonGreen();
    }
    else if(buttonThingy.value=='reset')
    {
        buttonReset();
    }
    else
    {
        buttonRandom();
    }
}

function buttonRed()
{
    for(let i=0;i<all_button.length;i++)
    {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-danger');
    }
}

function buttonGreen()
{
    for(let i=0;i<all_button.length;i++)
    {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
}

function buttonReset()
{
    for(let i=0;i<all_button.length;i++)
    {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copyAllbuttons[i]);
    }
}

function buttonRandom()
{
    var colorChoices=['btn-primary','btn-danger','btn-warning','btn-success'];   
    for(let i=0;i<all_button.length;i++)
    {
        var randomNumber=Math.floor(Math.random()*4);
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(colorChoices[randomNumber]);
    }
}

//Challenges5 : Black jack
let blacjack={
    'you':{'scoreSpan':'#your-blackjack-score','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-score','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardMaps':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU=blacjack['you'];
const DEALER=blacjack['dealer'];
const hitSound=new Audio('sounds/Swish.mp3');
const winSound = new Audio('sounds/applause4.mp3');
const lossSound = new Audio('sounds/aww.mp3');
const drewSound = new Audio('sounds/cash.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-Stand-button').addEventListener('click',dealerLogic);
function blackjackHit()
{
    if(blacjack['isStand']==false)
    {
        let card=randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        //console.log(YOU['score']);
        showScore(YOU);
    }
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerLogic()
{
    blacjack['isStand']=true;
    if(blacjack['turnsOver']==false)
    {
        while(DEALER['score']<16 && blacjack['isStand']==true)
        {
            let card=randomCard();
            showCard(card,DEALER);
            updateScore(card,DEALER);
            showScore(DEALER);
            await sleep(1000);
        }
        blacjack['turnsOver']=true;
        let winner=decideWinnner();
        showResult(winner);
        
    }
    
}

function randomCard()
{
    return blacjack['cards'][Math.floor(Math.random()*13)];
}

function showCard(card,activeUser)
{
    if(activeUser['score']<=21)
    {
        let cardImage = document.createElement('img');
        cardImage.src=`images/${card}.png`;
        document.querySelector(activeUser['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackjackDeal()
{
    if(blacjack['turnsOver']==true)
    {
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<yourImages.length;i++)
        {
            yourImages[i].remove();
        }
        for(let i=0;i<dealerImages.length;i++)
        {
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-score').textContent=0;
        document.querySelector('#dealer-blackjack-score').textContent=0;

        document.querySelector('#your-blackjack-score').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-score').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent="Let's Play";
        document.querySelector('#blackjack-result').style.color='#000000';
        blacjack['turnsOver']=false;
        blacjack['isStand']=false;
    }
}

function updateScore(card,activeUser)
{
    if(card ==='A')
    {
        if(activeUser['score']+blacjack['cardMaps'][card][1]<=21)
        {

            activeUser['score']+=blacjack['cardMaps'][card][1];
        }
        else
        {
            activeUser['score']+=blacjack['cardMaps'][card][0];
        }
    }
    else
    {
        activeUser['score']+=blacjack['cardMaps'][card];
    }
    
}
function showScore(activeUser)
{
    if(activeUser['score']>21)
    {
        document.querySelector(activeUser['scoreSpan']).textContent = "BUST!";
        document.querySelector(activeUser['scoreSpan']).style.color = "red";
    }
    else{
        document.querySelector(activeUser['scoreSpan']).textContent = activeUser['score'];
    }
}
//decide winner

function decideWinnner()
{
    let winner;
    if(YOU['score']<=21)
    {
        if(YOU['score']>DEALER['score'] || DEALER['score']>21)
        {
            blacjack['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score'] && DEALER['score']<=21)
        {
            blacjack['losses']++;
            winner=DEALER;
        }
        else if(YOU['score']===DEALER['score'])
        {
            blacjack['draws']++;
        }
    }
    else if(DEALER['score']<=21)
    {
        blacjack['losses']++;
        winner=DEALER;
    }
    else if(DEALER['score']>21)
    {
        blacjack['draws']++;
    }
    console.log('winnner is:',winner);
    return winner;
}

function showResult(winner)
{
    let message,messageColor;
    if(blacjack['turnsOver']==true)
    {
        if(winner===YOU)
        {
            document.querySelector('#wins').textContent=blacjack['wins'];
            message="You Win";
            messageColor="green";
            winSound.play();
        }
        else if(winner===DEALER)
        {
            document.querySelector('#losses').textContent=blacjack['losses'];
            message="You Lost";
            messageColor="red";
            lossSound.play();
        }
        else
        {
            document.querySelector('#draws').textContent=blacjack['draws'];
            message="You drew";
            messageColor="black";
            drewSound.play();
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
        
    }
}
