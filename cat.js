var cats = ["Mruczek", "Puszek", "Okruszek", "Siersciuch", "Kicia"],
pictures = { "Mruczek": "images/cat1.jpg", "Puszek": "images/cat2.jpg", "Okruszek": "images/cat3.jpg", "Siersciuch": "images/cat4.jpg", "Kicia": "images/cat5.jpg"};

generateCatsUl = function(cats) {
	var html = "",
	i,
	length = cats.length;
	for (i = 0; i < length; i += 1) {
		html += "<ul>" + cats[i] + "</ul>";
	}
	return html;
},
appendHtmlToElement = function(html, element) {
	var element = document.getElementById(element);
	if (element) {
		element.innerHTML = html;
	}
},
addEventListenerToElements = function(element, listener_function) {
	var elements = element.getElementsByTagName("ul"),
	i,
	length;
	if (elements) {
		length = elements.length;
		for (i = 0; i < length; i += 1) {
			elements[i].addEventListener("click", listener_function(0, elements[i].textContent) );
		}
	}
},
listenerFunction = function(counter, cat_name) {
	return function () {
		counter += 1;
		document.getElementById("cat_name").innerHTML = cat_name;
		document.getElementById("clicks_number").innerHTML = counter;
		document.getElementById("picture").innerHTML = "<img src='" + pictures[cat_name] + "'>";
	};
};

document.onreadystatechange = function(){
	if (document.readyState === "interactive") {
		appendHtmlToElement(generateCatsUl(cats), "cats_list");
		addEventListenerToElements(document.getElementById("cats_list"), listenerFunction)
	}
};
