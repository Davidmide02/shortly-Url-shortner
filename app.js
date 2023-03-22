// https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html

// alert("hello world")

const apiBaseUrl = "https://api.shrtco.de/";
let apiversion = "v2/"

const form = document.querySelector("#form");
const mainLinkEl = document.querySelector("#shortened-link");
const copyBtn = document.querySelector("#copy");
let errM = document.querySelector("#err");
const inputText = document.querySelector("#input-text")

console.log(form);
console.log(mainLinkEl);
console.log(errM);
console.log(copyBtn);
console.log(inputText);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    shortLink(inputText.value)
}
)

function shortLink(link) {



    if (!link) {
        console.log("empty");
        errM.textContent = "please add a link";
        inputText.classList.add("err-indicator");
    }

    else {

        const searchUrl = `${apiBaseUrl}${apiversion}shorten?url=${link}`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {

                console.log(data)
                mainLinkEl.textContent = `${data.result.original_link}`;
                document.querySelector("#short-link").value = `${data.result.full_short_link2}`

            }
            )

    }

}

