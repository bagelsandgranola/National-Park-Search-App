
const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const stateAbbreviations = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
   ];

const apiKey = "1sXRB7sUy1vmgbkB0dF80TXEiEZfLsdsnR5NhPYT";
const searchURL = "https://api.nps.gov/api/v1/parks?";
console.log(states.length);

function watchForm() {

    console.log('watchForm ran');
    for (let i = 0; i<= states.length; i++) {
    $('#state-selector').append(`<input type="checkbox" value="${stateAbbreviations[i]}"> ${states[i]}</li></br>`);
    }

    $('#state-selector').submit(function (event)
    {
        event.preventDefault();
        var states = [];
        $('#state-selector input:checked').each(function() {
            states.push(this.value);
        console.log(states);
        var queryString = formatParams(states);
        console.log("query String =", queryString);
        var APIrequestURL = searchURL + queryString;
        console.log("APIrequestURL", APIrequestURL);
        var responseJSON = getParks(APIrequestURL);
       
    });


});

}


function getParks(APIrequestURL) {
    fetch (APIrequestURL)
    .then (response => {
        if (response.ok)
        { return response.json();}
        throw new Error(response.statusText);
    })
    .then (responseJSON =>
        { console.log(responseJSON);
        displayResults(responseJSON);
        }
        )
    .catch (error => {
        $('.js-error-message').text('Something went wrong: ${error.message}');
    });

}

function formatParams (states){

    console.log("FormatParams run");
    var queryString = "";
    for (i=0; i<= states.length -1; i++)
    {
        var newString = "stateCode=" + states[i] + "&";
        queryString += newString;
    }
    queryString += "api_key=" + apiKey;
    return queryString;
}

//https://api.nps.gov/api/v1/parks?stateCode=AS&stateCode=DC
function displayResults (responseJSON) {

        $('#results-list').empty();
        var maxResults = $('#maxResults').val();

        var parks = [];
        parks = responseJSON.data;
        console.log("data array", parks);
        for (let i=0; i< maxResults; i++)
        {
            $('#results-list').append(`<li> <a href="${parks[i].url}">${parks[i].fullName}</a></br> <p>${parks[i].description}</p></br> </li>`)
            console.log(parks[i].fullName);
            
        }

        $('#results').removeClass("hidden");


}

$(watchForm);