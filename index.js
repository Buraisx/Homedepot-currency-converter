document.addEventListener('DOMContentLoaded',function(){

	class currencyConverter extends HTMLElement{
		convertCurrency(){
				console.log('hi')
			}
		constructor(){
			super();
			var shadow = this.attachShadow({mode: 'open'});
			var currencies = ['CAD','USD','EUR']

			var header = document.createElement('h1')
			header.innerHTML = 'Currency Converter'

			var inputDescription = document.createElement('p')
			inputDescription.innerHTML = 'Type in amount and select currency:'

			var input = document.createElement('input')
			input.setAttribute('type','number')
			input.setAttribute('placeholder', '0.00')
			input.id = 'input'
			input.setAttribute('onkeyup','convertCurrency()')

			var selectCurrency1 = document.createElement('select')
			selectCurrency1.id = 'selectCurrency1'

			for (var i = 0; i < currencies.length; i++) {
				selectCurrency1.options.add(new Option(`${currencies[i]}`,`${currencies[i]}`));
			}

			var outputDescription = document.createElement('p')
			outputDescription.innerHTML = 'Converted amount:'

			var output = input.cloneNode(true)
			output.id = 'output'

			var selectCurrency2 = selectCurrency1.cloneNode(true)
			selectCurrency2.id = 'selectCurrency2'


			var disclaimer = document.createElement('a')
			disclaimer.innerHTML = 'disclaimer';



			shadow.appendChild(header);
			shadow.appendChild(inputDescription);
			shadow.appendChild(input);
			shadow.appendChild(selectCurrency1);
			shadow.appendChild(outputDescription);
			shadow.appendChild(output);
			shadow.appendChild(selectCurrency2);
			shadow.appendChild(disclaimer);

			
		}
	}

	window.customElements.define('currency-converter',currencyConverter);



})