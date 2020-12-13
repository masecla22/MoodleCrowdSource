var Base64 = {
	decode: function(str) {
		str = str.replaceAll("\\.", "+");
		str = str.replaceAll("\\_", "/");
		str = str.replaceAll("\\~", "=");
		return decodeURIComponent(atob(str).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	},

	encode: function(str) {
		var output = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
			}));
		output = output.replaceAll("\\+", ".");
		output = output.replaceAll("\\/", "_");
		output = output.replaceAll("\\=", "~");
		return output;
	}
}

// +/= becomes ._~
function getRequest(url, callback) {
	GM.xmlHttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			callback(response);
		}
	});
}


var url = "http://localhost:12345";

function getQuestions() {
	return $("div[id^=question]");
}

function submitAnswers() {
	alert("cringe");
}

function initialize() {
	var namem = name;
	$(".site-name")[0].innerText = `${namem} Moodle`;
	initializeTaskbar();
	checkQuestionsForAnswers();
}

function createElementFor(name, link) {
	var res = document.createElement("li");
	res.setAttribute("class", "nav-item nav-link");
	res.setAttribute("onclick", "window.open('" + link + "', '_blank')");
	res.innerText = name;
	return res;
}

function createAnswer(object) {
	var res = document.createElement("div");
	res.setAttribute("style", "width:100%;border:1px solid black;background-color:#fff;color:#000;padding:10px;");
	res.innerText = object.author + " said " + Base64.decode(object.answer);
	return res;
}

function applyAnswersFor(question) {
	var text = $(question).find(".content p").text();
	text = text.replace("Answer:", "").replace("Answer", "");
	text = Base64.encode(text);

	getRequest(url + "/get?question=" + text, function(data) {
		var arr = JSON.parse(data.responseText);
		//console.log(text);
		for (var i = 0; i < arr.length; i++)
			question.getElementsByClassName("clearfix")[0].appendChild(createAnswer(arr[i]));
	});
}

function checkQuestionsForAnswers() {
	var questions = getQuestions();
	for (var i = 0; i < questions.length; i++)
		applyAnswersFor(questions[i]);
}

function initializeTaskbar() {
	$(".navbar-nav")[0].appendChild(createElementFor("Sisteme Liniare", "https://matrixcalc.org/en/slu.html"));
	$(".navbar-nav")[0].appendChild(createElementFor("Symbolab", "https://www.symbolab.com/"));
	$(".navbar-nav")[0].appendChild(createElementFor("Wolfram", "https://www.wolframalpha.com/"));
}

$(document).on("unload", submitAnswers)


$(document).ready(initialize);