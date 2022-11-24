var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// VARIABLES
var array = [];
var list = document.getElementById("list");
var listCompleted = document.getElementById("completed");
var input = document.getElementById("input");
var error = document.getElementById("error");
var btn = document.getElementById("button-addon1");
window.addEventListener("DOMContentLoaded", init);
function init() {
    fetchData();
    btn.addEventListener("click", function () {
        add();
    });
}
// CLASS
var List = /** @class */ (function () {
    function List(_id, _title, _completed) {
        this.id = _id;
        this.title = _title;
        this.completed = _completed;
    }
    return List;
}());
// FETCH get
function fetchData() {
    fetch("http://localhost:3000/list")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        array = data;
        array.map(function (e) {
            var item = new List(e.id, e.title, e.completed);
            var tr = document.createElement("tr");
            if (e.completed === true) {
                listCompleted.appendChild(tr);
                tr.classList.add("done");
            }
            else {
                list.appendChild(tr);
            }
            tr.classList.add("align-middle", "tr");
            tr.innerHTML += "\n                    <th scope=\"row\">".concat(e.id, "</th>\n                    <td>").concat(e.title, "</td>\n                    <td><button type=\"button\" id=\"btnDelete\" class=\"btn btn-light btn-outline-dark float-end\" onclick=\"deleteData(").concat(e.id, ")\"><i class=\"bi bi-x-lg\"></i></button></td>\n                ");
            tr.addEventListener("click", function () {
                // this.classList.add("done");
                if (e.completed === true) {
                    edit(e.id, e.title, false);
                }
                else {
                    edit(e.id, e.title, true);
                }
            });
        });
    })
        .then(function () {
        // alternate li colors
        var odds = document.querySelectorAll("#list tr:nth-of-type(odd)");
        odds.forEach(function (line) {
            line.classList.add("table-info");
        });
        var evens = document.querySelectorAll("#list tr:nth-of-type(even)");
        evens.forEach(function (line) {
            line.classList.add("table-primary");
        });
    });
}
// ADD user
function add() {
    if (input.value != "") {
        var data = {
            title: input.value,
            completed: false
        };
        addData(data);
    }
    else {
        // Avviso
        error.innerHTML = "<i class=\"bi bi-exclamation-triangle-fill\"></i> Compilare correttamente il campo";
        // Bordo rosso input
        input.classList.remove("border-primary", "border-opacity-25");
        input.classList.add("border-danger", "border-opacity-75");
        input.classList.remove("border-primary", "border-opacity-25");
        input.classList.add("border-danger", "border-opacity-75");
    }
}
function addData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data)
                    })];
                case 1:
                    response = _a.sent();
                    clearForm();
                    return [2 /*return*/];
            }
        });
    });
}
// DELETE user
function deleteData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Confirm
                    if (!window.confirm("Are you sure you want to delete this task?")) {
                        return [2 /*return*/];
                    }
                    ;
                    return [4 /*yield*/, fetch('http://localhost:3000/list/' + id, {
                            method: 'DELETE'
                        })];
                case 1:
                    response = _a.sent();
                    clearForm();
                    return [2 /*return*/];
            }
        });
    });
}
// CLEAR form
function clearForm() {
    input.value = "";
}
// EDIT user
function edit(id, title, completed) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/list/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({ title: "".concat(title), completed: completed })
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
