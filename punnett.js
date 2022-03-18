//phenotype ratio
var p_ratio = {};

//genomic ratio
var g_ratio = {}


//color classes for the peas
const gene_classes = {

	"yy" : "green-pea",
	"Yy" : "yellow-pea",
	"YY" : "yellow-pea"
}




/* Punnent Square
	* Construct and return an array given the p given a maternal and paternal gene sequence
	* Note that due to nested for-loop order, the chart correlation is as follows:
	*
	* 0,0 [0][0]  |  0,1 [1][0]
	* 1,0 [0][1]  |	 1,1 [1][1]
	*	
*/

function punnentSquare (paternal, maternal) {

	var square = [[]];
	square[1] = [];

	p_ratio = {

		numerator 	: 0,

		denominator : 0


	};


	/// validate that paternal and maternal are two stringed characters, otherweise return an error
	//todo


	/// Build the square
	for (i=0; i<=1; i++) {
 
 		for (j=0; j<=1; j++) {

			const firstChar  = paternal.charAt(i);
			const secondChar = maternal.charAt(j);

			
			//check if first char is lowercase, and construct recessive gene accordingly
			if (firstChar == firstChar.toLowerCase()){

				square[i][j] = secondChar + firstChar;
				phenotypeRatio(secondChar);

			}

			else {

				square[i][j] = firstChar + secondChar;
				phenotypeRatio(firstChar);
			}

		}
	}

	var baseChar = paternal.charAt(0);

	genomicRatio(baseChar.toUpperCase(), baseChar.toLowerCase(), square)

	//console.log("square", square);
	console.log("G", g_ratio);
	console.log("P", p_ratio);

	//set the genomic and phenotypic ratio text
	document.getElementById("genomic_ratio").innerHTML 	 = formatRatio(g_ratio);
	document.getElementById("phenotype_ratio").innerHTML = formatRatio(p_ratio);

	return square;

}


/*
	* Phenotype Ratio
	* Calculate the Phenotype Ratio
*/

function phenotypeRatio(char){

	//get raw values
	if (char == char.toUpperCase()) {
		p_ratio.numerator++;
	}

	if (char == char.toLowerCase()) {
		p_ratio.denominator++;
	}
	console.log("first char",char);


	//simplify
	if (p_ratio.numerator == 4) {
		p_ratio.numerator = 1;
	}

	if (p_ratio.denominator == 4) {
		p_ratio.denominator = 1;
	}

	if ( (p_ratio.numerator == 2) && (p_ratio.denominator == 2)) {
		p_ratio.numerator = 1;
		p_ratio.denominator = 1;
	}


}


/*
	* Genomic Ratio
	* Calculate the Genomic Ratio
*/

function genomicRatio(uppercaseChar, lowercaseChar, square) {

	const dom = uppercaseChar + uppercaseChar;

	const domrec = uppercaseChar + lowercaseChar;

	const rec = lowercaseChar + lowercaseChar;


	g_ratio = {

			dom 	: 0,

			domrec	: 0,

			rec 	: 0
	}

	//get the raw values
	for (i=0; i<=1; i++) {
 
 		for (j=0; j<=1; j++) {

			switch (square[i][j]){

				case dom:
					g_ratio.dom++; break;

				case domrec:
					g_ratio.domrec++; break;

				case rec:
					g_ratio.rec++; break;

			}		
		}
	}

	//simplify
	// if (g_ratio.dom == g_ratio.rec) {

	// 	g_ratio.dom = 1;
	// 	g_ratio.rec = 1;

	// }


	var prev_key
	for (key in g_ratio) {

		if ((g_ratio[key] == 4)) {
			g_ratio[key] = 1;
		}
	/*
		if ( (g_ratio[key] == 2 && g_ratio[prev_key] == 0) ){
			g_ratio[key] = 1;
		}

		if ( (g_ratio[key] == 0 && g_ratio[prev_key] == 2) ){
			g_ratio[prev_key] = 1;
		}
	*/
		if (g_ratio[key] != 0) {
			if (g_ratio[key] == g_ratio[prev_key]){
				g_ratio[key] = 1;
				g_ratio[prev_key] = 1;
			}
		}
		prev_key = key;
	}

}

function formatRatio(ratio){

	var text = "";

	for (key in ratio){

		if (ratio[key] == 0) continue;

		text += `${ratio[key]} : `

	}

	return text.slice(0,-2);

}




/* Set Phenotype

	* Function that was used for testing with a button interface initially
	* Calls updateSquare after the value has shifted to;



var setPhenotype = function() {

	var phenotype = this.attributes["data-phenotype"].value;

	// toggle this button between uppercase and lowercase

	if (phenotype == phenotype.toLowerCase()) { 

		phenotype = phenotype.toUpperCase();

	}
	else {

		phenotype = phenotype.toLowerCase();

	}

	this.attributes["data-phenotype"].value = phenotype;
	this.innerHTML = phenotype;

	var paternal = document.getElementsByClassName("paternal");
	var maternal = document.getElementsByClassName("maternal");

	var punnentt_inputs = {

		paternal : [
			paternal[0].getAttribute("data-phenotype"),
			paternal[1].getAttribute("data-phenotype")
		],

		maternal : [
			maternal[0].getAttribute("data-phenotype"),
			maternal[1].getAttribute("data-phenotype")
		]

	}			


	var square   = punnentSquare(punnentt_inputs.paternal[0] + punnentt_inputs.paternal[1], punnentt_inputs.maternal[0] + punnentt_inputs.maternal[1]);


	console.log("SQUARE", square)

	updateSquare(square);


}
*/


/* Update Square
	
	* Given as square data structure, updates the visual Punnett square
	*

*/
function updateSquare(square) {
	
	const quad1 = document.querySelector("tr:nth-child(1) > td:nth-child(1)")
	quad1.innerHTML = `<div class="pea ${gene_classes[square[0][0]]}" draggable="true" ondragstart="dragstart_handler(event, '${square[0][0]}')" data-gene="${square[0][0]}"></div> <span>${square[0][0]}</span>`; 
	
	const quad2 = document.querySelector("tr:nth-child(1) > td:nth-child(2)")
	quad2.innerHTML = `<div class="pea ${gene_classes[square[1][0]]}" draggable="true" ondragstart="dragstart_handler(event, '${square[1][0]}')" data-gene="${square[1][0]}"></div> <span>${square[1][0]}</span>`;
	
	const quad3 = document.querySelector("tr:nth-child(2) > td:nth-child(1)")
	quad3.innerHTML = `<div class="pea ${gene_classes[square[0][1]]}" draggable="true" ondragstart="dragstart_handler(event, '${square[0][1]}')" data-gene="${square[0][1]}"></div> <span>${square[0][1]}</span>`;

	const quad4 = document.querySelector("tr:nth-child(2) > td:nth-child(2)")
	quad4.innerHTML = `<div class="pea ${gene_classes[square[1][1]]}" draggable="true" ondragstart="dragstart_handler(event, '${square[1][1]}')" data-gene="${square[1][1]}"></div> <span>${square[1][1]}</span>`;


}




