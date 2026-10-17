/* For Ma'am Cherry — app logic */
const EMAILJS_PUBLIC_KEY = "GIAfr8cyf7rKLAK5v";
const EMAILJS_SERVICE_ID = "service_n5t0dz8";
const CHERRY_TEMPLATE_ID = "template_cherry";
const LOUR_TEMPLATE_ID = "template_lourii";

const screenIds = ["homepage","letter","games","guessGame","rpsGame","wordleGame","compliments","cherrySummary","lourSummary","birthday"];
function showScreen(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
}
function gotoletter(){ showScreen("letter"); }
function gohome(){ showScreen("homepage"); }
function showGameMenu(){ showScreen("games"); }
function openGame(id){ showScreen(id); }
window.showScreen = showScreen;
window.gotoletter = gotoletter;
window.gohome = gohome;
window.showGameMenu = showGameMenu;
window.openGame = openGame;

/* Guess the Number */
let secretNumber = randomNumber();
let guessCount = 0;
function randomNumber(){ return Math.floor(Math.random()*100)+1; }
const guessForm = document.getElementById("guessForm");
guessForm.addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("numberInput");
  const guess = Number(input.value);
  const result = document.getElementById("guessResult");
  if(!Number.isInteger(guess) || guess < 1 || guess > 100){ result.textContent = "Choose a whole number from 1 to 100."; return; }
  guessCount++;
  document.getElementById("guessAttempts").textContent = `Attempts: ${guessCount}`;
  if(guess === secretNumber){ result.textContent = `You got it! The number was ${secretNumber}. ✨`; }
  else if(guess < secretNumber){ result.textContent = "A little higher! ⬆️"; }
  else { result.textContent = "A little lower! ⬇️"; }
  input.value = "";
  input.focus();
});
document.getElementById("guessReset").addEventListener("click", () => {
  secretNumber = randomNumber(); guessCount = 0;
  document.getElementById("guessResult").textContent = "New number, new chance. You’ve got this!";
  document.getElementById("guessAttempts").textContent = "Attempts: 0";
  document.getElementById("numberInput").value = "";
});

/* Rock Paper Scissors */
let rpsYou = 0, rpsComputer = 0, rpsTies = 0;
function playRPS(choice){
  const options = ["rock","paper","scissors"];
  const computer = options[Math.floor(Math.random()*options.length)];
  let outcome;
  if(choice === computer){ rpsTies++; outcome = "It’s a tie!"; }
  else if((choice==="rock"&&computer==="scissors")||(choice==="paper"&&computer==="rock")||(choice==="scissors"&&computer==="paper")){ rpsYou++; outcome = "You win this round! ✨"; }
  else { rpsComputer++; outcome = "Computer wins this round. Try again!"; }
  document.getElementById("rpsResult").textContent = `${capitalize(choice)} vs. ${capitalize(computer)}. ${outcome}`;
  document.getElementById("rpsScore").textContent = `You ${rpsYou} · Computer ${rpsComputer} · Ties ${rpsTies}`;
}
function capitalize(word){ return word.charAt(0).toUpperCase()+word.slice(1); }
window.playRPS = playRPS;
document.getElementById("rpsReset").addEventListener("click", () => {
  rpsYou=0; rpsComputer=0; rpsTies=0;
  document.getElementById("rpsResult").textContent="Score reset. Make your move!";
  document.getElementById("rpsScore").textContent="You 0 · Computer 0 · Ties 0";
});

/* Mini Wordle */
const wordList = ["APPLE","BEACH","BLOOM","BRAVE","BREAD","BRICK","CHAIR","CHARM","CHEER","CLOUD","DANCE","DREAM","EARTH","FLAME","FLOUR","FRAME","FRESH","FRIEND","GRACE","GRAPE","GREEN","HEART","HONEY","HOUSE","JUICE","LIGHT","MAGIC","MANGO","MARCH","MATCH","MUSIC","NIGHT","OCEAN","PEACE","PEACH","PLANT","PLATE","PRIDE","QUIET","RIVER","SMILE","SPACE","SPARK","SPEAK","STARS","STONE","SUGAR","SUNNY","SWEET","THANK","TIGER","TRAIN","TRUST","WATER","WORLD"];
const allowedWords = new Set(wordList);
let answer = pickWord(), wordGuesses = [], wordFinished = false;
function pickWord(){ return wordList[Math.floor(Math.random()*wordList.length)]; }
function scoreWord(guess, target){
  const marks = Array(5).fill("absent");
  const remaining = target.split("");
  for(let i=0;i<5;i++){ if(guess[i]===target[i]){marks[i]="correct";remaining[i]=null;} }
  for(let i=0;i<5;i++){ if(marks[i]!=="correct"){const idx=remaining.indexOf(guess[i]);if(idx!==-1){marks[i]="present";remaining[idx]=null;}}}
  return marks;
}
function renderWordBoard(){
  const board=document.getElementById("wordBoard"); board.innerHTML="";
  for(let row=0;row<6;row++){
    for(let col=0;col<5;col++){
      const tile=document.createElement("div"); tile.className="word-tile";
      if(wordGuesses[row]){
        tile.textContent=wordGuesses[row].word[col];
        tile.classList.add(wordGuesses[row].marks[col]);
      }
      board.appendChild(tile);
    }
  }
}
document.getElementById("wordForm").addEventListener("submit", event=>{
  event.preventDefault();
  if(wordFinished)return;
  const input=document.getElementById("wordInput");
  const guess=input.value.trim().toUpperCase();
  const status=document.getElementById("wordleStatus");
  if(!/^[A-Z]{5}$/.test(guess)){status.textContent="Enter exactly five letters.";return;}
  if(!allowedWords.has(guess)){status.textContent="Try a word from the mini dictionary.";return;}
  const marks=scoreWord(guess,answer); wordGuesses.push({word:guess,marks}); renderWordBoard(); input.value="";
  if(guess===answer){wordFinished=true;status.textContent=`You got it! The word was ${answer}. 🎉`;}
  else if(wordGuesses.length===6){wordFinished=true;status.textContent=`Out of tries! The word was ${answer}.`;}
  else{status.textContent=`${6-wordGuesses.length} ${6-wordGuesses.length===1?"try":"tries"} left.`;}
});
function resetWordle(){answer=pickWord();wordGuesses=[];wordFinished=false;renderWordBoard();document.getElementById("wordleStatus").textContent="You have six tries!";document.getElementById("wordInput").value="";document.getElementById("wordInput").disabled=false;}
document.getElementById("wordleReset").addEventListener("click",resetWordle);
renderWordBoard();

/* Compliments */
const compliments = [
"You make a difference in ways you may not always see.","Your kindness can make an ordinary day feel lighter.","You deserve the same care you give to others.","The little things you do matter.","You have made memories worth keeping.","You are allowed to rest without earning it first.","Your effort counts, even when nobody notices.","You bring something good into the spaces you enter.","You deserve to be appreciated out loud.","Your presence matters.",
"You can be proud of how far you have come.","You do not have to be perfect to be valued.","A difficult day does not define you.","You deserve patience, including from yourself.","Your kindness is not wasted.","You are more than the things you get done.","You can take things one step at a time.","You deserve peaceful moments.","You have your own kind of strength.","You are allowed to begin again.",
"Your smile might brighten someone's day.","You make a difference just by being yourself.","You deserve people who listen to you.","You are worthy of respect.","Small acts of care can mean a lot.","You have something meaningful to offer.","Your hard work deserves recognition.","You do not have to carry everything alone.","You can ask for help when you need it.","You deserve a break, too.",
"May today give you one reason to smile.","You are appreciated more than you may know.","You can be gentle with yourself today.","Your story is still unfolding.","You are allowed to feel proud of small wins.","You deserve good news.","You make ordinary moments memorable.","Your compassion is valuable.","You can make mistakes and still be wonderful.","You deserve to feel safe and supported.",
"Even quiet kindness leaves an impact.","You do not need to have every answer today.","Your time and effort are meaningful.","You deserve a little joy for no reason at all.","You can move at your own pace.","You are allowed to choose peace.","Your best can look different from day to day.","You deserve encouragement, too.","Your care can reach people in unexpected ways.","There is value in simply showing up.",
"You have helped make someone's day better.","You deserve to be thanked sincerely.","May the kindness you give find its way back to you.","You are not defined by one rough moment.","You can take a breath and try again.","You deserve time for things you enjoy.","Your feelings deserve to be heard.","You can be strong and still need support.","You are allowed to celebrate yourself.","Your presence is a gift to the people who care about you.",
"May good people meet you with good intentions.","You deserve understanding, not just expectations.","You are doing more than you give yourself credit for.","Your patience can mean more than you realize.","You are allowed to slow down.","You deserve to feel seen.","You can make a fresh start whenever you need one.","You have reasons to be proud of yourself.","May your next chapter bring good surprises.","You deserve happiness that feels peaceful.",
"Your care leaves traces of goodness behind.","You can be both a work in progress and worthy now.","You deserve to laugh freely.","Your contributions matter, big or small.","You are allowed to protect your energy.","You deserve honesty and respect.","Your presence can be comforting.","You have made it through every hard day so far.","You deserve moments that belong just to you.","You can trust yourself to keep learning.",
"May you find joy in small things today.","You deserve a thank-you that is heartfelt.","You are more than someone else's expectations.","Your gentleness is a strength.","You deserve to be treated with care.","You can be proud without comparing yourself to anyone.","Your everyday efforts add up.","You deserve support on the tiring days, too.","You make room for good memories.","You are allowed to feel hopeful.",
"May life be kind to you in the little ways.","You deserve to receive the care you give.","You can be proud of your own journey.","Your work can matter even when it feels routine.","You deserve more moments of calm than worry.","You are appreciated for who you are, not just what you do.","Thank you for the good you bring into the world.","May the coming days be gentle with you.","You deserve a reminder that you matter.","Please remember to take care of yourself, too."
];
let complimentIndex = 0;
function showCompliment(){document.getElementById("compliment-text").textContent=compliments[complimentIndex];document.getElementById("compliment-count").textContent=`Reminder ${complimentIndex+1} of ${compliments.length}`;}
document.getElementById("nextCompliment").addEventListener("click",()=>{complimentIndex=(complimentIndex+1)%compliments.length;showCompliment();});
showCompliment();

/* Birthday surprise: visible only on June 5 */
const birthdayButton = document.getElementById("birthdayButton");

function isBirthday() {
  const today = new Date();
  return today.getMonth() === 5 && today.getDate() === 5;
}

function updateBirthdayButton() {
  birthdayButton.hidden = !isBirthday();
}

function showBirthday() {
  if (!isBirthday()) return;
  showScreen("birthday");
}

updateBirthdayButton();

window.showBirthday = showBirthday;

/* EmailJS daily summaries. The two templates should have a {{message}} variable.
   Configure each template's recipient in the EmailJS dashboard. */
if(window.emailjs){ emailjs.init({publicKey:EMAILJS_PUBLIC_KEY}); }
async function sendSummary(formId, textId, dateId, statusId, templateId, ownerLabel){
  const form=document.getElementById(formId), status=document.getElementById(statusId);
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    const date=document.getElementById(dateId).value;
    const summary=document.getElementById(textId).value.trim();
    if(!summary){status.textContent="Please write a summary first.";return;}
    if(!navigator.onLine){status.textContent="You’re offline. Reconnect to send this summary.";return;}
    if(!window.emailjs){status.textContent="Email service did not load. Please reconnect and refresh.";return;}
    const button=form.querySelector("button[type='submit']");
    button.disabled=true;button.textContent="Sending…";status.textContent="Sending your summary…";
    try{
      await emailjs.send(EMAILJS_SERVICE_ID,templateId,{message:`${ownerLabel}\nDate: ${date}\n\n${summary}`});
      status.textContent="Sent successfully! ♡";
      form.reset();
      document.getElementById(dateId).value=new Date().toLocaleDateString("en-CA");
    }catch(error){
      console.error("EmailJS error:",error);
      status.textContent="Could not send. Check the EmailJS template, recipient, and connection, then try again.";
    }finally{button.disabled=false;button.textContent=ownerLabel==="Ma’am Cherry’s day"?"Send summary":"Send my summary";}
  });
}
sendSummary("cherrySummaryForm","cherrySummaryText","cherryDay","cherryStatus",CHERRY_TEMPLATE_ID,"Ma’am Cherry’s day");
sendSummary("lourSummaryForm","lourSummaryText","lourDay","lourStatus",LOUR_TEMPLATE_ID,"Lour’s day");
const todayISO=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);};
document.getElementById("cherryDay").value=todayISO();
document.getElementById("lourDay").value=todayISO();

/* Connection status */
function updateConnectionStatus(){
  const el=document.getElementById("connectionStatus");
  el.textContent=navigator.onLine?"● Online":"● Offline";
  el.classList.toggle("is-offline",!navigator.onLine);
}
window.addEventListener("online",updateConnectionStatus);
window.addEventListener("offline",updateConnectionStatus);
updateConnectionStatus();

/* Installable PWA offline shell. Hosting must use HTTPS for service workers. */
if("serviceWorker" in navigator && (location.protocol==="https:" || location.hostname==="localhost")){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(err=>console.warn("Service worker registration failed:",err)));
}
