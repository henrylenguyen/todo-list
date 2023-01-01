let form = document.querySelector(".card__add");
let todo = document.querySelector("#todo");
let completed = document.querySelector("#completed");
window.addEventListener("load",()=>{
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  document.querySelector(".dateTask").innerHTML = `Today is : ${date}`;
  deleteTodoItem();
  completeTodoTask();
})


let todosList = localStorage.length > 0 ? JSON.parse(localStorage.getItem("todoList")) : [];
let completedList = localStorage.length > 0 ? JSON.parse(localStorage.getItem("todoCompleted")) : [];

  if (Array.isArray(todosList) && todosList.length > 0) {
    todosList.forEach(item => {
      createTodoItem(item);
    })
  }
  if (Array.isArray(completedList) && completedList.length > 0) {
    completedList.forEach(item => {
      createCompleteItem(item);
    })
  }

// -----------------------------------TẠO VIỆC LÀM MỚI-----------------------

function createTodoItem(value) {
    let template = `<li class="todo-task">
                        <span clas="todo-title">${value}</span>
                        <div class="btn-group">
                          <i class="fas fa-trash-can icon-delete"></i>
                          <i class="fas fa-check icon-check"></i>
                        </div>

                      </li>`;
    todo.insertAdjacentHTML("afterbegin", template);
  }

// ------------------------------TẠO VIỆC HOÀN THÀNH------------------------------
function createCompleteItem(value) {
  let template = `<li class="todo-task">
                        <span clas="todo-title">${value}</span>
                        <div class="btn-group">
                          <i class="fas fa-trash-can icon-delete"></i>
                        </div>
                      </li>`;
  completed.insertAdjacentHTML("afterbegin", template);
}

// ------------------------- XÓA VIỆC LÀM ---------------------------
function check(e){
  // Lấy ra thẻ cha là li
  const todoItem = e.target.parentNode.parentNode;
  //  console.log(todoItem.parentNode);

  //  từ thẻ li lấy ra thẻ ul và xóa đi thẻ li
  todoItem.parentNode.removeChild(todoItem);
  // lấy ra nội dung của thẻ cần xóa
}

function deleteTodoItem() {
 todo.addEventListener("click", function (e) {
   if (e.target.matches(".icon-delete")) {
   check(e);
     const todoText = e.target.parentNode.previousElementSibling.textContent;
    // Dùng hàm findIndex để kiểm tra giá trị thỏa mãn, nếu đúng là nó sẽ trả về vị trí phần tử đó
    const index = todosList.findIndex((item) => item === todoText);

    // Hàm splice dùng để xóa tại vị trí chỉ định
    todosList.splice(index, 1);
    // Lưu lại kết quả dưới localStorage
  localStorage.setItem("todoList", JSON.stringify(todosList));

 }
 });
 completed.addEventListener("click", function (e) {
 if (e.target.matches(".icon-delete")) {
  check(e);
    const todoText = e.target.parentNode.previousElementSibling.textContent;
    // Dùng hàm findIndex để kiểm tra giá trị thỏa mãn, nếu đúng là nó sẽ trả về vị trí phần tử đó
    const index = completedList.findIndex((item) => item === todoText);

    // Hàm splice dùng để xóa tại vị trí chỉ định
    completedList.splice(index, 1);
    // Lưu lại kết quả dưới localStorage
  localStorage.setItem("todoCompleted", JSON.stringify(completedList));

 }
 });

 }

 // ------------------------------- VIỆC HOÀN THÀNH-------------------------
function completeTodoTask(){
  todo.addEventListener("click", function (e) {
    if (e.target.matches(".icon-check")) {
      check(e);
        const todoText = e.target.parentNode.previousElementSibling.textContent;
       // Dùng hàm findIndex để kiểm tra giá trị thỏa mãn, nếu đúng là nó sẽ trả về vị trí phần tử đó
       const index = todosList.findIndex((item) => item === todoText);

       // Hàm splice dùng để xóa tại vị trí chỉ định
       todosList.splice(index, 1);
       // Lưu lại kết quả dưới localStorage
       localStorage.setItem("todoList", JSON.stringify(todosList));
      console.log(todoText)
        // Dùng hàm findIndex để kiểm tra giá trị thỏa mãn, nếu đúng là nó sẽ trả về vị trí phần tử đó
      completedList.push(todoText);
      // console.log(completedList);
      createCompleteItem(todoText);
      localStorage && localStorage.setItem("todoCompleted", JSON.stringify(completedList));

  }})
}
// ------------------------ KHI NGƯỜI DÙNG GỬI FORM--------------------------
form.addEventListener("submit",function(e){
  e.preventDefault();
  const newTask = this.elements["newTask"].value;
  // console.log(newTask)
  if (!newTask) return;
 todosList.push(newTask);
 createTodoItem(newTask);
 this.elements["newTask"].value = "";
 localStorage && localStorage.setItem("todoList", JSON.stringify(todosList));

})


// -------------------------------Sắp xếp theo từ A-Z------------------------
document.querySelector(".icon-down").addEventListener("click", () => {
  todo.innerHTML = "";
  todosList.sort(function (a, b) {
    let x = a.toLowerCase();
    let y = b.toLowerCase();

    return x == y ? 0 : (x > y) ? -1 : 1;
  });
  todosList.forEach(item => createTodoItem(item));
  completed.innerHTML = "";
  completedList.sort(function (a, b) {
    let x = a.toLowerCase();
    let y = b.toLowerCase();

    return x == y ? 0 : (x > y) ? -1 : 1;
  });
  completedList.forEach(item => createCompleteItem(item));

})

document.querySelector(".icon-up").addEventListener("click", () => {
  todo.innerHTML = "";
  todosList.sort(function (a, b) {
    let x = a.toLowerCase();
    let y = b.toLowerCase();

    return x == y ? 0 : (x > y) ? -1 : 1;
  });
  todosList.forEach(item => createTodoItem(item));
  completed.innerHTML = "";
  completedList.sort(function (a, b) {
    let x = a.toLowerCase();
    let y = b.toLowerCase();

    return x == y ? 0 : (x > y) ? 1 : -1;
  });
  completedList.forEach(item => createCompleteItem(item));

})
document.querySelector(".icon-check").addEventListener("click", () => {
  completed.innerHTML = "";
})
document.querySelector(".icon-all").addEventListener("click", () => {
  completedList.forEach(item => {
    createCompleteItem(item);
  })
})