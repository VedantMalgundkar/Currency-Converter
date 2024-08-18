const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const btn = document.querySelector('#get-exchange');

const dropDowns = document.querySelectorAll(".dropdown select");

const swapBtn = document.querySelector(".swap")

let fromCurr = document.querySelector(".from select"); 

let toCurr = document.querySelector(".to select");


const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode.toLowerCase()];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // console.log(currCode,countryCode,newSrc)
    ele.parentElement.querySelector('img').src = newSrc;

}


for (select of dropDowns) {
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode.toUpperCase();
        newOption.value = currCode.toUpperCase();
        select.append(newOption);
        if (select.name === "from" && currCode === "usd") {
            newOption.selected = "selected";

        }
        else if (select.name === "to" && currCode === "inr") {
            newOption.selected = "selected";
        }
    } 
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector('.amount input');
    let amtValue = amt.value;
    if (amtValue == "" || amtValue < 1){
        amtValue = 1;
        amt.value = 1;
    }

    const URL = `${baseUrl}${fromCurr.value.toLowerCase()}.json`

    let res = await fetch(URL);
    let data = await res.json();
    toValue = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]

    let convertedVal= parseFloat(amtValue) * toValue;

    document.querySelector(".msg").innerText = `${amtValue} ${fromCurr.value} = ${convertedVal.toFixed(3)} ${toCurr.value}`;


});

swapBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    const select1 = document.querySelector(".to select").value;
    const select2 = document.querySelector(".from select").value;

    // Swap values
    fromCurr.value = select1;
    toCurr.value = select2;

    for (select of dropDowns) {
        updateFlag(select);
    }

});