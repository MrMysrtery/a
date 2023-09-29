console.log("Initializing...");
let enterKey = '#';
document.getElementById("q").id = "q-modified";
document.getElementById("q-modified").name = "q-modified";
const textInput = document.getElementById('q-modified');

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

textInput.addEventListener('keydown', (event) => {
if (event.key === enterKey) {
console.log('Enter key pressed!');

var latinInput = textInput.value;
latinInput = latinInput.replaceAll(" ", "+");
console.log(latinInput);
textInput.value = "";
fetch(baseURL + "&q=" + latinInput)
  .then((response)=>response.json())
  .then((responseJson)=>{

    console.log("Finished!");
    console.log(responseJson);
    let formattedMessage = "";

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
  });
}
});

console.log("Initialized!");
