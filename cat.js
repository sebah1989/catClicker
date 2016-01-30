/*globals document */
(function() {
    "use strict";

    var model = {
            init: function() {
                this.cats = {
                    "Mruczek": {
                        image: "images/cat1.jpg",
                        click_counter: 0
                    },
                    "Puszek": {
                        image: "images/cat2.jpg",
                        click_counter: 0
                    },
                    "Okruszek": {
                        image: "images/cat3.jpg",
                        click_counter: 0
                    },
                    "Siersciuch": {
                        image: "images/cat4.jpg",
                        click_counter: 0
                    },
                    "Kicia": {
                        image: "images/cat5.jpg",
                        click_counter: 0
                    }
                };
            },
            getAllCatsNames: function() {
                var key, names = [],
                    cats = this.cats;
                for (key in cats) {
                    if (cats.hasOwnProperty(key)) {
                        names.push(key);
                    }
                }
                return names;
            },
            getCatImage: function(cat_name) {
                return (this.cats[cat_name] && this.cats[cat_name].image) || "";
            },
            getCatClickCounter: function(cat_name) {
                return (this.cats[cat_name] && this.cats[cat_name].click_counter) || 0;
            },
            incrementCatClickCounter: function(cat_name) {
                if (this.cats.hasOwnProperty(cat_name)) {
                    this.cats[cat_name].click_counter += 1;
                }
            }
        },
        view = {
            cat_name: document.getElementById("cat_name"),
            picture: document.getElementById("picture"),
            clicks_number: document.getElementById("clicks_number"),
            cats_list: document.getElementById("cats_list"),
            renderCatsList: function(cats) {
                var html = "",
                    i,
                    length = cats.length;
                for (i = 0; i < length; i += 1) {
                    html += "<li id='" + cats[i] + "'>" + cats[i] + "</li>";
                }
                this.cats_list.innerHTML = html;
            },
            addEventsToCatsList: function(cats) {
                var i, length = cats.length;
                for (i = 0; i < length; i += 1) {
                    document.getElementById(cats[i]).addEventListener("click", this.clickListener);
                }
            },
            renderCat: function(name, click_count, image_path) {
                document.getElementById("cat_name").innerHTML = name;
                document.getElementById("clicks_number").innerHTML = click_count;
                document.getElementById("picture").innerHTML = "<img src='" + image_path + "'>";
            },
            clickListener: function(a) {
                var cat_id = a.target.id;
                view.renderCat(cat_id, controller.getAndUpdateCatClicks(cat_id), controller.getCatImage(cat_id));
            },
            init: function(cats) {
                this.renderCatsList(cats);
                this.addEventsToCatsList(cats);
            }
        },
        controller = {
            init: function() {
                model.init();
                view.init(model.getAllCatsNames());
            },
            getAndUpdateCatClicks: function(cat_name) {
                model.incrementCatClickCounter(cat_name);
                return model.getCatClickCounter(cat_name);
            },
            getCatImage: function(cat_name) {
                return model.getCatImage(cat_name);
            }
        };

    document.onreadystatechange = function() {
        if (document.readyState === "interactive") {
            controller.init();
        }
    };
}());