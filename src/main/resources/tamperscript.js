// ==UserScript==
// @name         Moodle CrowdSourcer
// @namespace    http://masecla.dev/
// @version      0.0.01
// @description  Basic Moodle Crowd Sourcer
// @author       masecla22, Matt
// @match        *://*/*/attempt.php*
// @require      http://code.jquery.com/jquery-latest.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant GM.xmlHttpRequest
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @grant GM_notification
// ==/UserScript==

(function() {
	'use strict';

	var name = "Mattia";



	// Decide source for downloading script.
	var devMode = true;
	var url = "https://raw.githubusercontent.com/masecla22/MoodleCrowdSource/main/src/main/resources/moodlescript.js";
	if (devMode)
		url = "http://localhost:12345/source";

	// Download script and execute
	GM.xmlHttpRequest({
		method: "GET",
		url: url,
		onload: function(response){
			eval(response.responseText);
		}
	});
	name = name;
})();