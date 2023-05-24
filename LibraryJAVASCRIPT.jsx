let searchInputEl = document.getElementById("searchInput");
let selectDisplayEl = document.getElementById("selectDisplayCount");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let bookHeading = document.getElementById("bookHeading");
let bookElFound = document.getElementById("booksFound");

let searchValue = "";
let search_res = [];
let defVal = 10;

function createBookPage(book) {
    let containerEl = document.createElement("div");
    containerEl.classList.add("m-3", "col-5");
    searchResultsEl.appendChild(containerEl);

    let imageEl = document.createElement("img");
    imageEl.src = book.imageLink;
    imageEl.classList.add("image");
    imageEl.classList.add("col-6");
    containerEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = book.author;
    authorEl.classList.add("author");
    containerEl.appendChild(authorEl);
}

function displayOutput(search_results) {
    let {
        search_results: array
    } = search_results;

    for (let book of array) {
        let authorName = book.author;
        if (searchResultsEl.length == 0) {
            bookElFound.textContent = "No Book Found";
            bookElFound.classList.remove("d-none");
        } else {
            bookElFound.textContent = "Popular Books";
            bookElFound.classList.remove("d-none");
            createBookPage(book);
        }
    }
}

function searchStore() {
    let url = "https://apis.ccbp.in/book-store?title=" + searchValue + "&maxResults=" + defVal;
    console.log(url);
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            bookElFound.textContent = "";
            spinnerEl.classList.add("d-none");
            search_results = data;
            displayOutput(search_results);
        });
}

function updateSearchValue() {
    if (event.key == "Enter") {
        searchResultsEl.textContent = "";
        searchValue = searchInputEl.value;
        console.log(searchValue);
        searchStore();
    }
}

function onSelectDisplay() {
    defVal = selectDisplayEl.value;
    console.log(defVal);
    searchStore();
}

selectDisplayEl.addEventListener("change", onSelectDisplay);

searchInputEl.addEventListener("keydown", updateSearchValue);