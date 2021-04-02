const DOMAIN = "http://localhost:3000";
let authors = [];

function getAuthors() {
    const authsContainerEl = document.getElementById('author-list-container');

    $.ajax({
        method: "GET",
        url: `${DOMAIN}/authors`,
        success: function (authorsData) {
            authors = authorsData;

            authors.forEach(function (author) {
                $.ajax({
                    method: "GET",
                    url: `${DOMAIN}/books/${author.id}`,
                    success: function (booksData) {
                        author.books = booksData;
                    }
                });
            });
        }
    });

    // End of data to be received from api

    // Add data from api to FE
    authors.forEach(author => {
        const newAuthorEl = document.createElement("div");
        newAuthorEl.className = "author-container";
        newAuthorEl.id = `author-${author.id}`;
        newAuthorEl.innerHTML =
            `
        <h3> ${author.name} </h1>
        <div> <b>Email:</b> ${author.email} </div>
        <div> <b>Writing Type:</b> ${author.writing_type} </div>

        `
        author.books.forEach(book => {

            newAuthorEl.innerHTML += `
            <div class="book-detail" id="book-${book.id}">
                <div> <b>Title:</b> ${book.title} </div>
                <div> <b>Subtitle:</b> ${book.subtitle} </div>
                <div> <b>Reviews:</b> ${book.reviews}/5 </div>

                <button onClick="getBookDetailByID(${author.id}, ${book.book_id})" class="book-btn"> Book detail </button>
            </div>`

        })


        authsContainerEl.appendChild(newAuthorEl);
    })
}

function getBookDetailByID(author_id, book_id) {
    const authContainerEl = document.getElementById(`author-${author_id}`);

    var description = "";
    var editor = "";

    $.ajax({
        method: "GET",
        url: `${DOMAIN}/books`,
        success: function (results) {
            results.forEach(function (result) {
                if (result.book_id === book_id) {
                    description = result.description;
                    editor = result.editor;

                    authContainerEl.innerHTML += `
                        <div><b>Desription:</b> ${description}</div>
                        <div><b>Editor:</b> ${editor}</div>`
                }
            });
        }
    });
}