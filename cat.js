/*globals document */
(function() {
    "use strict";

    var model = {
            current_cat: "",
            init: function() {
                this.cats = {
                    "Mruczek": {
                        image: "images/cat1.jpg",
                        click_counter: 0,
                        name: "Mruczek"
                    },
                    "Puszek": {
                        image: "images/cat2.jpg",
                        click_counter: 0,
                        name: "Puszek"
                    },
                    "Okruszek": {
                        image: "images/cat3.jpg",
                        click_counter: 0,
                        name: "Okruszek"
                    },
                    "Siersciuch": {
                        image: "images/cat4.jpg",
                        click_counter: 0,
                        name: "Siersciuch"
                    },
                    "Kicia": {
                        image: "images/cat5.jpg",
                        click_counter: 0,
                        name: "Kicia"
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
            },
            setCurrentCat: function(cat_name) {
                this.current_cat = cat_name;
            },
            setCurrentCatObject: function(cat_object) {
                this.cats[this.current_cat] = JSON.parse(JSON.stringify(cat_object));
            }
        },
        viewCats = {
            cat_name: document.getElementById("cat-name"),
            picture: document.getElementById("picture"),
            clicks_number: document.getElementById("clicks_number"),
            cats_list: document.getElementById("cats_list"),
            renderCatsList: function(cats) {
                var i,
                    length = cats.length,
                    element;
                for (i = 0; i < length; i += 1) {
                    element = document.createElement("li");
                    element.id = cats[i];
                    element.textContent = cats[i];
                    this.cats_list.appendChild(element);
                }
            },
            addEventsToCatsList: function(cats) {
                var i, length = cats.length;
                for (i = 0; i < length; i += 1) {
                    document.getElementById(cats[i]).addEventListener("click", this.clickListener);
                }
            },
            renderCat: function(name, click_count, image_path) {
                var element = document.createElement("img"),
                    div_to_clear;
                element.src = image_path;
                document.getElementById("cat-name").innerHTML = name + " (" + click_count + ")";
                div_to_clear = document.getElementById("picture");
                if (div_to_clear.firstChild) {
                    div_to_clear.removeChild(div_to_clear.firstChild);
                }
                div_to_clear.appendChild(element);
            },
            clickListener: function(a) {
                var cat_id = a.target.id;
                controller.setCurrentCat(cat_id);
                viewCats.renderCat(cat_id, controller.getAndUpdateCatClicks(cat_id), controller.getCatImage(cat_id));
            },
            init: function(cats) {
                this.renderCatsList(cats);
                this.addEventsToCatsList(cats);
            }
        },
        viewAdmin = {
            init: function() {
                this.admin_form = document.getElementById("admin-form");
                this.admin_button = document.getElementById("admin-button");
                this.cancel_button = document.getElementById("admin-cancel");
                this.admin_submit = document.getElementById("admin-submit");
                this.inputs = {
                    name: document.getElementById("name"),
                    image_path: document.getElementById("image_path"),
                    clicks_number: document.getElementById("clicks_number")
                };
                this.addEventListeners();
            },
            addEventListeners: function() {
                viewAdmin.admin_button.addEventListener("click", this.adminOnClick);
                viewAdmin.cancel_button.addEventListener("click", this.adminOnCancel);
                viewAdmin.admin_form.addEventListener("submit", this.adminOnSubmit);
            },
            adminOnClick: function() {
                viewAdmin.admin_form.className = "";
                viewAdmin.updateFormData(controller.getCurrentCatObject());
            },
            hideAdminPanel: function() {
                viewAdmin.admin_form.className = "hide";
            },
            adminOnCancel: function() {
                viewAdmin.hideAdminPanel();
            },
            adminOnSubmit: function(e) {
                e.preventDefault();
                var cat = {};
                cat.name = viewAdmin.inputs.name.value;
                cat.image = viewAdmin.inputs.image_path.value;
                cat.click_counter = parseInt(viewAdmin.inputs.clicks_number.value, 10);
                controller.updateCurrentCat(cat);
            },
            updateFormData: function(cat_object) {
                viewAdmin.inputs.name.value = cat_object.name;
                viewAdmin.inputs.image_path.value = cat_object.image;
                viewAdmin.inputs.clicks_number.value = cat_object.click_counter;
            }
        },
        controller = {
            init: function() {
                model.init();
                this.setCurrentCat(this.getCatNames()[0]);
                viewCats.init(model.getAllCatsNames());
                viewAdmin.init();
            },
            getAndUpdateCatClicks: function(cat_name) {
                model.incrementCatClickCounter(cat_name);
                return model.getCatClickCounter(cat_name);
            },
            getCatImage: function(cat_name) {
                return model.getCatImage(cat_name);
            },
            setCurrentCat: function(cat_name) {
                model.setCurrentCat(cat_name);
            },
            getCurrentCatObject: function() {
                return model.cats[this.getCurrentCatName()];
            },
            getCurrentCatName: function() {
                return model.current_cat;
            },
            updateCurrentCat: function(cat_object) {
                model.setCurrentCatObject(cat_object);
            },
            getCatNames: function() {
                return model.getAllCatsNames();
            }
        };

    document.onreadystatechange = function() {
        if (document.readyState === "interactive") {
            controller.init();
        }
    };
}());