createFooter();

// Creazione footer
function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("bg-dark", "text-white", "text-center", "py-5", "border-top", "border-white");

    const footerText = document.createElement("p");
    footerText.classList.add("m-0");
    footerText.innerText = "Created by ";

    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/flavio-pinto";
    githubLink.classList.add("text-warning", "fw-bold", "text-decoration-underline");
    githubLink.innerText = "Flavio Pinto";
    githubLink.target = "_blank";

    footerText.appendChild(githubLink);
    footer.appendChild(footerText);

    document.body.appendChild(footer);
}
