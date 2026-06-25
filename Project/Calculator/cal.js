const buttons = document.querySelectorAll("button");

const prevOperand = document.querySelector(".prev-operand");
const display = document.querySelector(".curr-operand");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        if(
            button.innerText === "C" ||
            button.innerText === "←" ||
            button.innerText === "="
        ){
            return;
        }

        if(display.innerText === "0"){
            display.innerText = button.innerText;
        }else{
            display.innerText += button.innerText;
        }

        localStorage.setItem("display", display.innerText);
        localStorage.setItem("prevOperand", prevOperand.innerText);
    });
});

//clear
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", () => {
    display.innerText = "0";
    prevOperand.innerText = null;
    localStorage.setItem("display", display.innerText);
    localStorage.setItem("prevOperand", prevOperand.innerText);
});

//delete
const deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);

    if(display.textContent === ""){
        display.textContent = "0";
    }
    localStorage.setItem("display", display.innerText);
    localStorage.setItem("prevOperand", prevOperand.innerText);
})

//equal
const equalBtn = document.querySelector(".equal");

equalBtn.addEventListener("click", () => {
    try{
        prevOperand.innerText = display.innerText;
        display.innerText = eval(display.innerText);
        localStorage.setItem("display", display.innerText);
        localStorage.setItem("prevOperand", prevOperand.innerText);
    }
    catch{
        currOperand.innerText = "Error";
    }
});

//Add keyboard support.
document.addEventListener("keydown", (event) => {
    const key = event.key;

    //all key
    if("0123456789+-*/.".includes(key)){
        if(display.innerText === "0"){
            display.innerText = key;
        }else{
            display.innerText += key;
        }
        localStorage.setItem("display", display.innerText);
    }

    //enter
    if(event.key === "Enter"){
        try{
            prevOperand.innerText = display.innerText;
            display.innerText = eval(display.innerText);
            localStorage.setItem("display", display.innerText);
            localStorage.setItem("prevOperand", prevOperand.innerText);
        }
        catch{
            display.innerHTML = "Error";
        }
    }

    //delete
    if(event.key === "Backspace"){
        display.innerText =
        display.innerText.slice(0, -1);

        if(display.innerText === ""){
            display.innerText = "0";
        }

        localStorage.setItem("display", display.innerText);
        localStorage.setItem("prevOperand", prevOperand.innerText);
    }

    //clear
    if(event.key === "Escape"){
        display.innerText = "0";
        localStorage.setItem("display", display.innerText);
        localStorage.setItem("prevOperand", prevOperand.innerText);
    }
    
});

const savedPrev = localStorage.getItem("prevOperand");
const savedCurr = localStorage.getItem("display");

if(savedPrev){
    prevOperand.innerText = savedPrev;
}

if(savedCurr){
    display.innerText = savedCurr;
}