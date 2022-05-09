let result;
const [elementUSD,elementEUR,elementGBP] = ['[data-value="USD"]','[data-value="EUR"]','[data-value="GBP"]'].map((value)=>{
   return document.querySelector(value);
});
const input = document.querySelector("#input");
const res= document.querySelector("#result");
const select = document.querySelector("#select");




async function getCurrencies(){
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const json = await response.json();
    result = await json;
    console.log(result);

    elementUSD.textContent = result.Valute.USD.Value.toFixed(2);
    elementEUR.textContent = result.Valute.EUR.Value.toFixed(2);
    elementGBP.textContent = result.Valute.GBP.Value.toFixed(2);
    
    if(result.Valute.USD.Value>result.Valute.USD.Previous){
        elementUSD.classList.add("top");
        if(elementUSD.classList.contains("bottom")){
            elementUSD.classList.remove("bottom");
        }
    }else{
        elementUSD.classList.add("bottom");
        if(elementUSD.classList.contains("top")){
            elementUSD.classList.remove("top");
        }
    }

    if(result.Valute.EUR.Value>result.Valute.EUR.Previous){
        elementEUR.classList.add("top");
        if(elementEUR.classList.contains("bottom")){
            elementEUR.classList.remove("bottom");
        }
    }else{
        elementEUR.classList.add("bottom");
        if(elementEUR.classList.contains("top")){
            elementEUR.classList.remove("top");
        }
    }
    if(result.Valute.GBP.Value>result.Valute.GBP.Previous){
        elementGBP.classList.add("top");
        if(elementGBP.classList.contains("bottom")){
            elementGBP.classList.remove("bottom");
        }
    }else{
        elementGBP.classList.add("bottom");
        if(elementGBP.classList.contains("top")){
            elementGBP.classList.remove("top");
        }
    }
}
input.oninput = function(){
    res.value = (parseFloat(input.value) / result.Valute[select.value].Value).toFixed(2);
}
select.oninput = function(){
    res.value = (parseFloat(input.value) / result.Valute[select.value].Value).toFixed(2);
}

getCurrencies();