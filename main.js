function getRandomArticle() {
    console.log("Random article request");
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

function processJSON() {
    console.log("Got here");
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
        console.log(request.response);
    }
}
