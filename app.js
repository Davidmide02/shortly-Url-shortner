// https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html

// alert("hello world")

const apiBaseUrl = "https://api.shrtco.de/";
let apiversion = "v2/"

const form = document.querySelector("#form");
// const linkContainer = document.querySelector(".link-container");
// const copyBtn = document.querySelector("#copy");
let errM = document.querySelector("#err");
const inputText = document.querySelector("#input-text");
// const linkCome = document.querySelector(".come");

console.log(form);
// console.log(linkContainer);
console.log(errM);
// console.log(copyBtn);
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
                inputText.classList.remove("err-indicator");
                errM.textContent = "";
                console.log(data)
                // mainLinkEl.textContent = `${data.result.original_link}`;
                // document.querySelector("#short-link").value = `${data.result.full_short_link2}`
                // creating pre-styled elements
                const formContainer = document.querySelector(".form-container");
                const linkContainer = document.createElement("div")
                linkContainer.classList.add("link-container");

                const mainLinkEl = document.createElement("h3");
                mainLinkEl.setAttribute("id", "shortened-link");
                mainLinkEl.textContent = `${data.result.original_link}`;

                const shortLinkContainer = document.createElement("div");
                shortLinkContainer.classList.add("short-link-copy");

                const shortLinkEl = document.createElement("input");

                // shortLinkEl.type("text");
                shortLinkEl.value = `${data.result.full_short_link2}`;
                shortLinkEl.setAttribute("type", "text");
                shortLinkEl.setAttribute("id", "short-link");
                shortLinkEl.setAttribute("readonly","readonly")

                const copyBtn = document.createElement("button");
                copyBtn.setAttribute("id", "copy");
                copyBtn.textContent = "Copy";

                shortLinkContainer.appendChild(shortLinkEl);
                shortLinkContainer.appendChild(copyBtn);

                linkContainer.appendChild(mainLinkEl);
                linkContainer.appendChild(shortLinkContainer);

                formContainer.appendChild(linkContainer);
                

               


            }
            )

    }

}

