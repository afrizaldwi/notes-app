const box = document.getElementById("box");

function add() {
    box.classList.add("active");
    judul.value = "";
    isi.value = "";
}
function closeBtn() {
    box.classList.remove("active");
}

const judul = document.getElementById("judul");
const isi = document.getElementById("isi");
const form = document.getElementById("form");

function generateId() {
    const randomId = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let ID = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * randomId.length);
        ID += randomId.charAt(randomIndex);
    }
    return ID;
}

// add Note
form.addEventListener("submit", () => {
    const id = generateId();

    const header = createTextElement("h1", "text-header", judul.value);
    const p = createTextElement("p", "text-note", isi.value);

    const nDate = new Date();
    const span = createTextElement("span", "text-time", nDate.toLocaleString());

    const dataElement = {
        id: id,
        judul: header.textContent,
        isi: p.textContent,
        timestamp: span.textContent,
    };
    localStorage.setItem(`element_${id}`, JSON.stringify(dataElement));

    judul.value = "";
    isi.value = "";

    closeBtn();
});

// membuat element baru
function createTextElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    return element;
}

// mengambil data dari localStorage
const savedData = Object.values(localStorage).map((item) => JSON.parse(item));

// menampilkan data dari localStorage
savedData.forEach((data) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.id = data.id;

    const header = createTextElement("h1", "text-header", data.judul);
    const p = createTextElement("p", "text-note", data.isi);
    li.appendChild(header);
    li.appendChild(p);

    const span = createTextElement("span", "text-time", data.timestamp);
    li.appendChild(span);

    const button = createTextElement("button", "btn-list", "X");
    li.appendChild(button);

    list.appendChild(li);
});
// === === === === ===

// remove data
function deleteData(li) {
    const dataId = li.id;
    localStorage.removeItem(`element_${dataId}`);
    li.remove();
}

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-list")) {
        const li = event.target.parentElement;
        if (confirm("apakah data ingin dihapus ?")) {
            console.log(li);
            deleteData(li);
            closeBtn();
        }
    }
});
// === === === === ===
