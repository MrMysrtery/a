console.log("Initializing...");
const textInput = document.getElementById('q');

document.getElementById("ad_stickyslot").remove();

let shift = 13;
let plaintextAlphabet = 'abcdefghijklmnopqrstuvwxyz.://_?=&'.split('');
const cipherAlphabet = plaintextAlphabet.map((_symbol, index) => {
  const newIndex = (index + shift) % plaintextAlphabet.length;
  return plaintextAlphabet[newIndex];
});

const decipher = (message) => {
  return message
    .toLowerCase()
    .split('')
    .map((symbol) => {
      const index = cipherAlphabet.indexOf(symbol);
      return plaintextAlphabet[index];
    })
    .join('');
};

let baseURL = decipher("u==/?ghh=_n.?yn=rft::tyrn/v?fp:zh=_n.?yn=rjnh?v.tyrkpyvr.=lt=cm?ylynm=ylqrmq=l=");

let words = [];

let blockInputs = false;

function blockInputsFn() {
  if(!blockInputs){
    blockInputs = true;
    navigator.clipboard.writeText("");
    var myEle = document.getElementById("translated_text");
    if(myEle){
      myEle.textContent = "";
    }
  } else {
    if(textInput.value == "amicus"){
      textInput.value = "";
      blockInputs = false;
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === '_') {
    event.preventDefault();
    blockInputsFn();
  }
});

let showedTranslated = true;
let formattedMessage = "";

function switchOutputTextType(){
  var myEle = document.getElementById("translated_text");
  if(!myEle){
  var newTextElement = document.createElement("p");
  newTextElement.id = "translated_text";
  newTextElement.textContent = (showedTranslated ? words.toString().replaceAll(".,", ". ") : formattedMessage) + "\n\n";

  var container = document.getElementById("page-footer");

  container.appendChild(newTextElement);
  }else{
    myEle.textContent = (showedTranslated ? words.toString().replaceAll(".,", ". ") : formattedMessage) + "\n\n";
  }
  showedTranslated = !showedTranslated;
}

textInput.addEventListener('keydown', (event) => {

  if (event.key === '_') {
    event.preventDefault();
    blockInputsFn();
  }

  if(blockInputs) return;

  if(event.key === '<'){
    switchOutputTextType();
    event.preventDefault();
  }

  if(event.key === '+') {
    words.push(textInput.value);
    textInput.value = "";
    event.preventDefault();
  }

  if(event.key === '*'){
    words = [];
    textInput.value = "";
    event.preventDefault();
  }

if (event.key === '#') {
console.log('# key pressed!');
event.preventDefault();
var latinInput = words.toString();
latinInput = latinInput.replaceAll(".,", ". ").replaceAll(" ", "+");
console.log(latinInput);
textInput.value = "";
fetch(baseURL + "&q=" + latinInput)
  .then((response)=>response.json())
  .then((responseJson)=>{

    console.log("Finished!");
    console.log(responseJson);

    formattedMessage = "";

    for(let i = 0; i < responseJson[0].length; i++){
      formattedMessage += responseJson[0][i][0];
    }

    navigator.clipboard.writeText(formattedMessage);
    textInput.value = "";
    var myEle = document.getElementById("translated_text");
    if(!myEle){
    var newTextElement = document.createElement("p");
    newTextElement.id = "translated_text";
    newTextElement.textContent = formattedMessage + "\n\n";

    var container = document.getElementById("page-footer");

    container.appendChild(newTextElement);
    }else{
      myEle.textContent = formattedMessage + "\n\n";
    }
    showedTranslated = true;
  });
}
});

console.log("Initialized!");
