
let gorevList = []

if(localStorage.getItem("gorevList") != null){
    gorevList = JSON.parse(localStorage.getItem("gorevList"));

}

let editID
let isEditing = false

const taskInput = document.querySelector("#todo")
const todo_container = document.querySelector(".container") 
const filters = document.querySelectorAll("#filters button")

displayTaskList("all")

function displayTaskList(filter){
    
    let ul = document.getElementById("task-list");
    ul.innerHTML = ""

    if(gorevList.length == 0){
        ul.innerHTML = "<p class='empty'>Görev listeniz boş :)</p>"
    } else {

        for(let gorev of gorevList){

            let complete = gorev.durum == "complete" ? "checked" : "";

            if(filter == gorev.durum || filter == "all"){

                let li = `
                <li class="todo-item">
                    <div class="form-check">
                        <input type="checkbox" onclick="UpdateStatus(this)" id="${gorev.id}" ${complete}>
                        <label for="${gorev.id}" ${complete}>${gorev.gorevAdi}</label>
                    </div>
                    <div class="todo-buttons">
                        <a onclick="EditBtn('${gorev.id}', '${gorev.gorevAdi}')"><i class="fa-solid fa-pen"></i></a>
                        <a onclick="DeleteBtn(${gorev.id})"><i class="fa-solid fa-trash-can"></i></a>
                    </div>
                </li> 
                `
                
                ul.insertAdjacentHTML("beforeend", li)
            }
        }
    }
}

for(let button of filters) {
    button.addEventListener("click", function() {
        document.querySelector("button.active").classList.remove("active");
        button.classList.add("active");
        displayTaskList(button.id)
    })
}


document.querySelector("#submit").addEventListener("click", AddBtn)
function AddBtn(event) {

    if(gorevList.length >= 9){
        alert("Aynı anda en fazla 9 görev eklenebilir!")
    } 

    else if(taskInput.value == "")
        alert("Görev eklemelisiniz!")
    else{

        if(!isEditing){
            gorevList.push({"id": gorevList.length+1, "gorevAdi": taskInput.value,  "durum": "pending"})
        } else{
            for(let gorev of gorevList){
                if(gorev.id == editID)
                    gorev.gorevAdi = taskInput.value
                
                isEditing= false
            }
        }

    
        taskInput.value = ""
        
        displayTaskList(document.querySelector("button.active").id)
        localStorage.setItem("gorevList", JSON.stringify(gorevList))
        taskInput.focus()
    }
    
    event.preventDefault()
}

function EditBtn(id,name){
    console.log(name)
    editID = id
    isEditing = true
    taskInput.value = name
    taskInput.focus()
}

function DeleteBtn(id){
    let deleteId
    
    deleteId = gorevList.findIndex(function(gorev) {
        return gorev.id == id
    })

    gorevList.splice(deleteId,1)
    displayTaskList(document.querySelector("button.active").id)
    localStorage.setItem("gorevList", JSON.stringify(gorevList))
}

document.querySelector("#clear-all").addEventListener("click", ClearAll);

function ClearAll() {
    gorevList.splice(0, gorevList.length);
    displayTaskList("all")
    localStorage.setItem("gorevList", JSON.stringify(gorevList))
}

function UpdateStatus(select){
    let label = select.nextElementSibling
    let status

    if(select.checked){
        label.classList.add("checked") 
        status = "complete" 

    } else {
        label.classList.remove("checked")
        status = "pending"
    }

    for(let gorev of gorevList){
        if(gorev.id == select.id){
            gorev.durum = status
        }
    }

    displayTaskList(document.querySelector("button.active").id)
    localStorage.setItem("gorevList", JSON.stringify(gorevList))
}

/* 
to-do app algoritması

1. adım: Eleman için bir html yaz
2. adım: DOM ile bu elemanların sınıfına eriş
3. adım: Liste oluşturarak, her yeni ögede yeni bir todo elemanı oluşmasını sağla
4. adım: Her todo elemanının id, görev adı, ve durum özelliği olsun
5. adım: Özelliklere göre Ekle, sil, düzenle fonksiyonları ekle
6. adım: Filtre uygulayarak hepsi, yapılacaklar, tamamlananlar butonları ekle
7. adım: Kodu localStroage'e göre optimize et
*/