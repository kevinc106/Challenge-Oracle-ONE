const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton"); 
const accents = ["á","é","í","ú","ó","Á","É","Í","Ú","Ó","ñ","Ñ"];   
const textArea = document.getElementById("idInputText");
const resultText = document.getElementById("idResult");
const emptyArea = document.getElementById("emptyArea");
const resultArea = document.getElementById("resultArea");
const keys = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat",
}

function isLetter(letter){
    return (letter >= 97 && letter <= 122) || (letter==32) || (letter==13);
}

function isUpperCaseCharacter(letter){
    return (letter >= 65 && letter <= 90);
}

function isAccent(letter){
    return (letter >= 192 && letter <= 383); 
}

function isSpecialCharacter(letter){ 
    return ((letter >= 33 && letter <= 47) ||
            (letter >= 58 && letter <= 64) ||
            (letter >= 91 && letter <= 96) ||
            (letter >= 123 && letter <= 126)); 
}

function isNotValidCharacter(letter){  
    return !isLetter(letter) || isUpperCaseCharacter(letter) || isAccent(letter) || isSpecialCharacter(letter);
}
 

function isValidInput(text){ 
    for (let index = 0; index < text.length; index++) {
        let letter = text.charCodeAt(index);
        if(isNotValidCharacter(letter)) {
            return false;   
        }
    }
    return true;
} 

function getText(){
    return document.getElementById("idInputText").value;
}

function changeDisplayResult(){
    emptyArea.style.display="none";
    resultArea.style.display="inline-block";
}

function encrypt(){
    let textInput = getText();   
    let resp = "";
    if(isValidInput(textInput)){ 
        //console.log("Valido");
        for (let index = 0; index < textInput.length; index++) {  
            if(textInput[index] in keys){ 
                //console.log(textInput[index]);
                resp+=keys[textInput[index]];
            }else{
                resp+=textInput[index];
            }
        }
        changeDisplayResult();
        resultText.textContent=resp;
    }else{
        alert("Texto invalido para encriptar");
    }
}

function decrypt(){
    let textInput = getText();  
    if(isValidInput(textInput)){  
        for (const key in keys) {
            let replaceThis = keys[key]; 
            textInput = textInput.replaceAll(replaceThis,key);
        }  
        changeDisplayResult(); 
        resultText.textContent=textInput;
    }else{
        alert("Texto invalido para desencriptar");
    }
} 

function fun(event){   
    let charCode = event.charCode;  
    if(isNotValidCharacter(charCode)){
        //console.log("Invalido");
        event.returnValue = false; 
    }else{
        //console.log("Valido");
        event.returnValue = true;
    }  
}
 

encryptButton.addEventListener("click",encrypt);
decryptButton.addEventListener("click",decrypt);
textArea.addEventListener("keypress",fun);
resultArea.style.display="none";
