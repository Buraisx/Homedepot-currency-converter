document.addEventListener('DOMContentLoaded',function(){

	class currencyConverter extends HTMLElement{
		constructor(){
			super();
			var shadow = this.attachShadow({mode: 'open'});
			var currencies = ['CAD','USD','EUR'];

			//input elements
			var header = document.createElement('h1');
			header.innerHTML = 'Currency Converter';

			var inputDescription = document.createElement('p');
			inputDescription.innerHTML = 'Type in amount and select currency:';

			var input = document.createElement('input');
			input.setAttribute('type','number');
			input.setAttribute('placeholder', '0.00');
			input.id = 'input';

			var selectCurrency1 = document.createElement('select');
			selectCurrency1.id = 'selectCurrency1';

			for (var i = 0; i < currencies.length; i++) {
				selectCurrency1.options.add(new Option(`${currencies[i]}`,`${currencies[i]}`));
			}

			//Output Elements
			var outputDescription = document.createElement('p');
			outputDescription.innerHTML = 'Converted amount:';

			var output = input.cloneNode(true);
			output.id = 'output';
			output.disabled = true;

			var selectCurrency2 = selectCurrency1.cloneNode(true);
			selectCurrency2.id = 'selectCurrency2';

			var disclaimer = document.createElement('a');
			disclaimer.innerHTML = 'disclaimer';


			//append every element to shadow DOM
			shadow.appendChild(header);
			shadow.appendChild(inputDescription);
			shadow.appendChild(input);
			shadow.appendChild(selectCurrency1);
			shadow.appendChild(outputDescription);
			shadow.appendChild(output);
			shadow.appendChild(selectCurrency2);
			shadow.appendChild(disclaimer);

			//On every keyup, change the output value
			input.addEventListener('keyup',function(){
				//API Call based on the selected currencies
				fetch(`https://api.fixer.io/latest?base=${selectCurrency1.value}&symbols=${selectCurrency2.value}`)
				.then(res => res.json())// convert to json object
				.then((out) => { // output object
					//grabbing the rate from json 
					// {
					// base: "CAD",
					// date: "2018-02-15",
					// 	rates: {
					// 		USD: 0.80063
					// 	}
					// }

					let rate = out.rates[`${Object.keys(out.rates)[0]}`];
					//Rate does not exist if Base and Symbol is the same
					if (!rate) {
						output.value = input.value;
					}else{
						output.value = (rate * input.value).toFixed(2);
					}
				  	console.log('Rate: ', rate );
				})
				.catch(err => { throw err });
			})
			
		}
	}
	// Definie our currency-converter custom element
	window.customElements.define('currency-converter',currencyConverter);



})