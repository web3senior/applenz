const apps = [
    {
        name: "LUKSO dApp 1",
        description: "Description of dApp 1.",
        url: "https://lukso.network",
        image: "https://cdn.prod.website-files.com/672bdc274def2fecc6bbcf43/672bdc274def2fecc6bbcf9c_Group%201000001677.svg"
    },
    {
        name: "LUKSO dApp 2",
        description: "Description of dApp 2.",
        url: "https://docs.lukso.network",
        image: "https://cdn.prod.website-files.com/672bdc274def2fecc6bbcf43/672bdc274def2fecc6bbcf9c_Group%201000001677.svg"
    },
    // Add more apps here
];

const appList = document.getElementById("app-list");

apps.forEach(app => {
    const appElement = document.createElement("div");
    appElement.classList.add("app-item");
    appElement.innerHTML = `
        <img src="${app.image}" alt="${app.name} icon">
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <a href="${app.url}" target="_blank">Launch</a>
    `;
    appList.appendChild(appElement);
});
