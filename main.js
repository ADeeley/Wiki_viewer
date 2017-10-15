function getRandomArticle() {
    console.log("Random article request");
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function shiftResult() {
    console.log("Gothere");
    if (/container_\d/.test(event.target.id)) {
        console.log(event.target);
        event.target.style.transform = "translate(10px, -10px)";
    }
}

function reallignResult() {
    console.log("Children" + event.target.children);
    if (/container_\d/.test(event.target.id)) {
        console.log(event.target);
        event.target.style.transform = "translate(0px, 0px)";
    }
}

function removePreviousResults() {
    /**
     * Check if the results div tag is already populated and remove all child nodes if
     * it is. This avoids appending results onto an ever-growing list
     */

    if (document.getElementById("results").hasChildNodes()) {
        //console.log("Child nodes detected.");
        node = document.getElementById("results");
        let oldNode = null;
        //Loop over the given node, destroying child nodes until none remain
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    }
}

function displayResults(json) {
    /**
     * Updates the HTML to display the search results and provide links to the 
     * relevant Wikipedia pages.
     */
    var header = null;
    var divContainer = null;
    var para = null;
    var node = null;
    var link = null;
    var odd = false;

    removePreviousResults();

    // Populate the div tag with the id "results" with the results of the search
    // DOM: results --> divContainer --> (header, para)
    for (var i=1; i<json[1].length; i++) {
        divContainer = document.createElement("div");
        divContainer.id = "container_" + i;

        // Adds dynamic movement to the result blocks
        divContainer.onmouseenter = function(){shiftResult()};
        divContainer.onmouseleave = function(){reallignResult()};

        header = document.createElement("h3");
        header.id = "result_header" + i;
        
        // Add link to Wikipedia
        link = document.createElement("a");
        link.href = json[3][i];

        // Add alternating background colour for results
        if (odd) {
            divContainer.className += "oddResult";
            odd = false;
        }
        else {
            divContainer.className += "evenResult";
            link.className += "evenLink";
            odd = true;
        }


        node = document.createTextNode(json[1][i]);

        link.appendChild(node);
        header.appendChild(link);

        divContainer.appendChild(header);

        // Add summary of the page below the header
        para = document.createElement("p");
        para.id = "result_body_" + i;
        node = document.createTextNode(json[2][i]);
        para.appendChild(node);

        divContainer.appendChild(para);
        document.getElementById("results").appendChild(divContainer);
    }
}

function searchFor() {
    /**
     * Pulls the JSON from the Wikipedia API URL. 
     */
    var keyword = document.getElementById("keywordString").value;
    var requestURL ="https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=";

    //Get JSON from the Wiki API
    var request = new XMLHttpRequest();
    request.open('GET', requestURL + keyword);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        displayResults(request.response);
    }
}
