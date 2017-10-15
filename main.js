function getRandomArticle() {
    console.log("Random article request");
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function displayResults(json) {
    var header = null;
    var para = null;
    var node = null;
    var link = null;

    // Check if the results div tag is already populated and remove all child nodes if
    // it is. This avoids appending results onto an ever-growing list
    if (document.getElementById("results").hasChildNodes()) {
        console.log("Child nodes detected.");
        node = document.getElementById("results");
        let oldNode = null;
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    }

    for (var i=0; i<json[1].length; i++) {
        header = document.createElement("h3");
        header.id = "result_" + i;

        link = document.createElement("a");
        link.href = json[3][i];

        node = document.createTextNode(json[1][i]);

        link.appendChild(node);
        header.appendChild(link);

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
