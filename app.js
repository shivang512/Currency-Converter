const BASE_URL = "https://v6.exchangerate-api.com/v6/866d8af20661b97df12db38a/latest/USD";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList) {
//         console.log(code, countryList[code]);
//     }



for (let select of dropdowns) { 
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}



const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }






    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;

    const URL = `https://v6.exchangerate-api.com/v6/866d8af20661b97df12db38a/latest/${fromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};






const updateFlag = (element) => {      //flag update function
    let currCode = element.value;
    let countryCode = countryList[currCode]; //IN, EU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



btn.addEventListener("click", (evt) => {    //click to event for button
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("Load", () => {
    updateExchangeRate();
});

