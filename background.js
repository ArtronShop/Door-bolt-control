
var SetLock = (lock) => {
	let url = "http://" +  localStorage.host + "/" + (lock ? "lock" : "unlock");
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.responseText);
			localStorage.status = (lock == true);
		}
	}
	xhr.send();
};

chrome.tabs.onCreated.addListener(function(tab) {
	if (localStorage.auto_lock == "true") SetLock(tab.incognito == true);
});