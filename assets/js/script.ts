// VARIABLES
var array: organizeList[] = [];
var list = document.getElementById("list") as HTMLElement;
var input = document.getElementById("input") as HTMLInputElement;
var error = document.getElementById("error") as HTMLElement;
var btn = document.getElementById("button-addon1") as HTMLButtonElement;

window.addEventListener("DOMContentLoaded", init);

function init() {
    fetchData();

    btn.addEventListener("click", () => {
        add();
    })
}


// CLASS
class List implements organizeList {
    id: number;
    title: string;
    completed: boolean;

    constructor(_id: number, _title: string, _completed: boolean) {
        this.id = _id;
        this.title = _title;
        this.completed = _completed;
    }
}

// INTERFACES
interface organizeList {
    id: number;
    title: string;
    completed: boolean;
}
interface organizeListValues {
    title: string;
    completed: boolean;
}

// FETCH get
function fetchData() {
    fetch("http://localhost:3000/list")
        .then((response) => {
            return response.json();
        })
        .then((data: organizeList[]) => {
            array = data;
            array.map((e) => {
                let item = new List(e.id, e.title, e.completed);
                let tr = document.createElement("tr");
                list.appendChild(tr);

                tr.classList.add("align-middle", "tr");

                tr.innerHTML += `
                    <th scope="row">${e.id}</th>
                    <td>${e.title}</td>
                    <td>${e.completed}</td>
                    <td><button type="button" id="btnDelete" class="btn btn-light btn-outline-dark float-end" onclick="deleteData(${e.id})"><i class="bi bi-x-lg"></i></button></td>
                `;

                tr.addEventListener("click", function () {
                    // this.classList.add("done");
                    
                    if(e.completed === true){
                        edit(e.id, e.title, false);
                    } else {
                        edit(e.id, e.title, true);
                    }
                });
            })
        })
        .then(() => {
            // alternate li colors
            const odds = document.querySelectorAll("tr:nth-of-type(odd)");
            odds.forEach((riga) => {
                riga.classList.add("table-info");
            });
            const evens = document.querySelectorAll("tr:nth-of-type(even)");
            evens.forEach((riga) => {
                riga.classList.add("table-primary");
            });

            // markDone();
        });
}

// ADD user
function add() {
    if (input.value != "") {
        var data: organizeListValues = {
            title: input.value,
            completed: false
        };
        addData(data);

    } else {
        // Avviso
        error.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Compilare correttamente il campo`;

        // Bordo rosso input
        input.classList.remove("border-primary", "border-opacity-25");
        input.classList.add("border-danger", "border-opacity-75");
        input.classList.remove("border-primary", "border-opacity-25");
        input.classList.add("border-danger", "border-opacity-75");
    }
}

async function addData(data: organizeListValues) {
    let response = await fetch('http://localhost:3000/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
    clearForm();
}

// DELETE user
async function deleteData(id: number) {

    // Confirm
    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    };

    // Delete
    let response = await fetch('http://localhost:3000/list/' + id, {
        method: 'DELETE'
    });

    clearForm();
}

// CLEAR form
function clearForm() {
    input.value = "";
}

// EDIT user
async function edit(id: number, title: string, completed: boolean) {
    let response = await fetch('http://localhost:3000/list/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ title: `${title}`, completed: completed })
    });
}