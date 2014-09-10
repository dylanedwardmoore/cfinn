var currentGoogleSpreadsheetURL = "https://docs.google.com/spreadsheet/pub?key=0ApcMt9L-9yyBdGxWTjgtRGNEd1lvbkdkdGVMaGxhckE&output=html";
var txt_order_is_random = true;
var txt_duration = 10000;
var txt_transition = 1000;
var txt_effect = "random";
var txt_centered = true;
var TXT_LIST_MAX_LENGTH = 3000000;
var txt_current_index = 0;


$(document).ready(function() {
	getJSONDataFromGoogleSpreadsheet(currentGoogleSpreadsheetURL);
});


function initDisplay()
{
	if(txt_order_is_random)
	{
		shuffleArray(txt_list);
	}
    txt_object = jQuery('#txtlzr');
    var txt_options = 
    {
    	"duration" : txt_duration,          // Time (ms) each blurb will remain on screen
		"rearrangeDuration" : txt_transition, // Time (ms) a character takes to reach its position
		"effect" : txt_effect,        // Animation effect the characters use to appear
		"centered" : txt_centered           // Centers the text relative to its container
    };

	if (txt_list.length > TXT_LIST_MAX_LENGTH) 
	{
		alert("Why you give so many text snippits? This is pushing my limits. \nAll the same, I will try my very best... because I care :)");
	}

    txt_object.textualizer(txt_list, txt_options);
    txt_object.textualizer('start');


    txt_object.on('textualizer.changed', function(event, args)
	{
		
		txt_current_index += 1;
	  
	  	//check if the end of txt_list has been reached
	   
			if (args.index === txt_list.length-1) 
			{
				txt_current_index = 0;
			}
	});
	// ------------


}


function getJSONDataFromGoogleSpreadsheet(spreadsheetURL)
{
	localStorage.clear();
	var googleSpreadsheet = new GoogleSpreadsheet();
	googleSpreadsheet.url(spreadsheetURL);
	googleSpreadsheet.load(function(result) {
		// console.log(result);
		currentGoogleSpreadsheetJSONData = result;//JSON.stringify(result).replace(/,/g,",\n");
		txt_list = currentGoogleSpreadsheetJSONData["data"];
		initDisplay(); 
	});
}



function shuffleArray(array) 
{
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function randomIntFromInterval(min, max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}