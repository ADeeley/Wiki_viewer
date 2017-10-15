function getRandomArticle() {
    console.log("Random article request");
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function displayResults(json) {
    var header = null;
    var para = null;
    var node = null;
    // Add headers
    for (var i=0; i<json[1].length; i++) {
        header = document.createElement("h3");
        header.id = "result_" + i;
        node = document.createTextNode(json[1][i]);
        header.appendChild(node);
        document.getElementById("results").appendChild(header);

        para = document.createElement("p");
        para.id = "result_body_" + i;
        node = document.createTextNode(json[2][i]);
        para.appendChild(node);
        document.getElementById("results").appendChild(para);
    }


}

function searchFor() {
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
