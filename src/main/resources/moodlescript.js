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


function initialize() {
	var namem = name;
	$(".site-name")[0].innerText = `${namem} Moodle`;
	initializeTaskbar();
	checkAuthorization();
	checkQuestionsForAnswers();
	window.addEventListener('beforeunload', submitAnswers);
}

function checkAuthorization() {
	getRequest(url + "/check?name=" + name, function(data) {
		if (data.responseText != "true") {
			$("p, div, li, ul, a, span, nav, h1, h2, h3, i, table, tr, th").append("Unauthorized. Ask Mattia for an ID");
		}
	});
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
		if (arr.length == 0) {
			console.log("Failed to find answer for " + text);
		}
		for (var i = 0; i < arr.length; i++)
			question.getElementsByClassName("clearfix")[0].appendChild(createAnswer(arr[i]));
	});
}

function applyRequestsButton(){
	var res = document.createElement("div");
	res.setAttribute("style", "width:100%;border:1px solid black;background-color:#fff;color:#000;padding:10px;");
	res.innerText="Request Answers";
}

function checkQuestionsForAnswers() {
	var questions = getQuestions();
	for (var i = 0; i < questions.length; i++){
		console.log("nice "+i);
		applyAnswersFor(questions[i]);	
	}
}

function initializeTaskbar() {
	$(".navbar-nav")[0].appendChild(createElementFor("Sisteme Liniare", "https://matrixcalc.org/en/slu.html"));
	$(".navbar-nav")[0].appendChild(createElementFor("Symbolab", "https://www.symbolab.com/"));
	$(".navbar-nav")[0].appendChild(createElementFor("Wolfram", "https://www.wolframalpha.com/"));
}

function submitAnswers() {
	var questions = getQuestions();
	for (var i = 0; i < questions.length; i++)
		submitFor(questions[i]);
}

function extractFromMultichoice(input) {
	var x = $(input).parent().find("script");
	if (x.length == 0)
		return $(input).parent().text();
	return x.text();
}

function submitFor(question) {
	var inputs = $(question).find("input");
	var resInputs = [];

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "hidden")
			continue;
		if (inputs[i].getAttribute("type") == "image")
			continue;
		if (inputs[i].value == -1 && $(inputs[i]).parent().text() == "Clear my choice")
			continue;

		resInputs.push(inputs[i]);
	}
	if (resInputs.length != 0) {
		var answer = "";
		var somethingFound = false;

		for (var i = 0; i < resInputs.length; i++) {
			if (resInputs[i].value.length < 1) {
				if (resInputs.length == 1)
					continue;
				answer += "GOL | ";
			}
			else {
				if (resInputs[i].getAttribute("type") == "radio") {
					if (resInputs[i].checked) {
						answer += extractFromMultichoice(resInputs[i]) + " | ";
						somethingFound = true;
					}
				}
				else if (resInputs[i].getAttribute("type") == "checkbox") {
					if (resInputs[i].checked) {
						answer += extractFromMultichoice(resInputs[i]) + " | ";
						somethingFound = true;
					}
				}
				else {
					answer += resInputs[i].value + " | ";
					somethingFound = true;
				}
			}
		}
		answer = answer.substring(0, answer.length - 3);
		if (somethingFound) {
			var text = $(question).find(".content p").text();
			text = text.replace("Answer:", "").replace("Answer", "");
			text = Base64.encode(text);

			getRequest(url + "/set?question=" + text + "&answer=" + Base64.encode(answer) + "&author=" + name, function(data) {
				console.log("Submitted " + data.responseText);
			});
		}
	}
}


$(document).ready(function() {
	MathJax.Hub.Queue(function () {
		initialize();
	});
});