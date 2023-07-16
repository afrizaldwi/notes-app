const form = document.querySelector("form");
const nDate = new Date().toLocaleString();

function generateId() {
    const randomId = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()";

    let ID = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * randomId.length);
        ID += randomId.charAt(randomIndex);
    }
    return ID;
}

form.addEventListener("submit", () => {
    const title = document.getElementById("title");
    const noteText = document.getElementById("noteText");
    const id = generateId();
    const dataElement = {
        id: id,
        title: title.value,
        noteText: noteText.value,
        timestamp: nDate,
    };
    localStorage.setItem(`element_${id}`, JSON.stringify(dataElement));
});

const showData = Object.values(localStorage).map((item) => JSON.parse(item));

showData.forEach((data) => {
    const htmlStructure = /*html*/ `
    <div class="col-md-6 mb-4">
        <div class="card shadow-lg border-0" id="${data.id}" style="height:250px">
            <div class="card-header">
                <h4 class="card-title text-overflow">${data.title}</h4>
            </div>
            <div class="card-body mb-5">
                <p class="card-text text-end">
                    <small class="text-body-secondary">${data.timestamp}</small>
                </p>
                <p class="card-text text-overflow">${data.noteText}</p>
            </div>
            <button
                type="button"
                class="btn btn-info w-25 text-white position-absolute bottom-0 end-0 m-3 detailBtn"
                data-bs-toggle="modal"
                data-bs-target="#detailModal"
            >
                Detail
            </button>
            <button
                type="button"
                class="btn btn-danger position-absolute bottom-0 start-0 m-3 deleteBtn"
            >
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    `;

    const row = document.getElementById("row");
    row.innerHTML += htmlStructure;
});

function getId(dataId) {
    return dataId.id;
}

const row = document.getElementById("row");
row.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
        const card = event.target.closest(".card");
        const cardId = getId(card);
        if (event.target.classList.contains("deleteBtn")) {
            if (confirm("apakah anda yakin ?")) {
                deleteData(cardId, card);
                location.reload();
            }
        }
        if (event.target.classList.contains("detailBtn")) {
            detailData(cardId);
        }
        if (event.target.classList.contains("editBtn")) {
            editData();
        }
    }
});

function deleteData(dataId, card) {
    localStorage.removeItem(`element_${dataId}`);
    card.remove();
}

function detailData(dataId) {
    const localData = localStorage.getItem(`element_${dataId}`);
    const parseData = JSON.parse(localData);

    const detailTitle = document.getElementById("detailTitle");
    const detailBody = document.getElementById("detailBody");

    detailTitle.textContent = parseData.title;
    detailBody.textContent = parseData.noteText;

    editData(parseData);
}

function editData(data) {
    const editTitle = document.getElementById("editTitle");
    const editNoteText = document.getElementById("editNoteText");

    editTitle.value = data.title;
    editNoteText.textContent = data.noteText;

    const editForm = document.getElementById("editForm");
    editForm.addEventListener("submit", () => {
        const newDataElement = {
            id: data.id,
            title: editTitle.value,
            noteText: editNoteText.value,
            timestamp: nDate,
        };
        localStorage.setItem(`element_${data.id}`, JSON.stringify(newDataElement));
    });
}
