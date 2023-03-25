// https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html


const apiBaseUrl = "https://api.shrtco.de/";
let apiversion = "v2/"

const form = document.querySelector("#form");
let errM = document.querySelector("#err");
const inputText = document.querySelector("#input-text");
const menuIcon = document.querySelector(".menu-icon");
const menuClose = document.querySelector(".menu-close");



// form submition form
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

                // creating and appending elements
                const linkDisplayParent = document.querySelector(".link-display");
                const linkContainer = document.createElement("div");
                linkContainer.classList.add("link-container");

                const mainLinkEl = document.createElement("h3");
                mainLinkEl.setAttribute("id", "shortened-link");
                mainLinkEl.textContent = `${data.result.original_link}`;

                const shortLinkContainer = document.createElement("div");
                shortLinkContainer.classList.add("short-link-copy");

                const shortLinkEl = document.createElement("input");

                shortLinkEl.value = `${data.result.full_short_link2}`;
                shortLinkEl.setAttribute("type", "text");
                shortLinkEl.setAttribute("id", "short-link");
                shortLinkEl.setAttribute("readonly", "readonly")

                const copyBtn = document.createElement("button");
                copyBtn.setAttribute("id", "copy");
                copyBtn.textContent = "Copy";

                const deleteIcon = document.createElement("img");
                deleteIcon.src = "./images/trash-can-regular.svg"
                deleteIcon.classList.add("fa-solid-can")

                shortLinkContainer.appendChild(shortLinkEl);
                shortLinkContainer.appendChild(copyBtn);
                shortLinkContainer.appendChild(deleteIcon);

                // line on mobile view div
                const line = document.createElement("div");
                line.classList.add("lineform");

                linkContainer.appendChild(mainLinkEl);
                linkContainer.appendChild(line);
                linkContainer.appendChild(shortLinkContainer);

                linkDisplayParent.appendChild(linkContainer);

                copyBtn.addEventListener("click", () => {

                    shortLinkEl.select();
                    document.execCommand("copy");
                    copyBtn.classList.add("copied");
                    copyBtn.setAttribute("background-color", "green");
                    copyBtn.textContent = "copied";




                })

                // delete function
                deleteIcon.addEventListener("click", () => {

                    linkDisplayParent.removeChild(linkContainer)
                })



            }

            )

    }

}

// opem menu

menuIcon.addEventListener("click", () => {
    const menu = document.querySelector(".nav");
    console.log(menu);
    menu.classList.add("open");
    menuClose.classList.add("open2");
    //    menuIcon.setAttribute("id", "close")
    menuIcon.classList.add("close");


}

)


// close menu
menuClose.addEventListener("click", () => {
    const menu = document.querySelector(".nav");
    console.log(menu);
    menu.classList.remove("open");
    menuClose.classList.remove("open2");
    menuIcon.classList.remove("close");


}

)