const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownElement = document.querySelectorAll('.dropdown select');
const msgEle = document.querySelector('.msg');
const exchangeBtn = document.querySelector('.exchange-btn');
for (let select of dropdownElement) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }

  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
};

const updateFlag = (element) => {
  let currCodeElement = element.value;
  console.log(currCodeElement);
  let countryCode = countryList[currCodeElement]
  let flagImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flagImg;
}

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  showResult();
  
})
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const showResult = async () => {
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  const amount = document.querySelector(".amount-input");
  let amountvalue = amount.value;
  if(amountvalue==="" || amountvalue<1){
    amountvalue=1
    amount.value=1;
  
  }
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amountvalue * rate;
  msgEle.innerText = `${amountvalue} ${fromCurr.value} =  ${(Math.round(finalAmount))} ${toCurr.value}`
}

const newAmount = document.querySelector(".amount-input");
let newAmountValue = newAmount.value;
const crossBtn = document.querySelector('.fa-solid');
newAmount.addEventListener("click", (evt) => {
  crossBtn.classList.add('js-cross-btn');
})

crossBtn.addEventListener("click", (evt) => {
  newAmount.value = "";

})