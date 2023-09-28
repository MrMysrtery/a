console.log("Initializing...");
let enterKey = '#';
document.getElementById("q").id = "q-modified";
document.getElementById("q-modified").name = "q-modified";
document.getElementById("q-modified").placeholder = "Suchen...";
const textInput = document.getElementById('q-modified');


textInput. addEventListener('keydown', (event) => {
if (event. key === enterKey) {
console. log('Enter key pressed!' );

var latinInput = textInput.value;
latinInput = latinInput.replaceAll(" ", "+");
console.log(latinInput);
fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=la&tl=de&dt=t&q=" + latinInput)
  .then((response)=>response.json())
  .then((responseJson)=>{

    console.log("Finished!");
    console.log(responseJson);
    let formattedMessage = "";

    for(let i = 0; i < responseJson[0].length; i++){
      formattedMessage += responseJson[0][i][0];
    }

    textInput.value = formattedMessage;
  
  });
}
});

console.log("Initialized!");