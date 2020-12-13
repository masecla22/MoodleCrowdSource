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
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @grant GM_notification
// ==/UserScript==

(function() {
	'use strict';

	var name = "YOURNAME";

	// Download script and evaluate
	$.get("https://raw.githubusercontent.com/masecla22/MoodleCrowdSource/main/src/main/resources/moodlescript.js", (data) => {
		eval(data);
	});
})();