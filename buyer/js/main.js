var todoList = $("#todoList"),
    completeTodoList = $("#completeTodoList");

function addTodoList(text) {
    todoList.append($('<li><span><input type="checkbox" class="complete-check-box" /><b contenteditable="true">' + text + '</b><a class="del-btn" href="javascript:;">X</a></span></li>'));
};

function addCompleteTodoList(text) {
    completeTodoList.append($('<li><span><input type="checkbox" class="complete-check-box" checked /><i>' + text + '</i><a class="del-btn" href="javascript:;">X</a></span></li>'));
};

$("#newItemForm").submit(function() {
    var input = $("input", this);
    addTodoList(input.val());
    input.val('');
    return false;
});

$("#todoList").on("click", "a.del-btn", function(e) {
    var target = $(e.target);
    target.parents("li").remove();
});

$("#todoList").on("click", "input.complete-check-box", function(e) {
    var target = $(e.target),
        text = target.next().text();
    target.parents("li").remove();
    addCompleteTodoList(text);
});

$("#completeTodoList").on("click", "input.complete-check-box", function(e) {
    var target = $(e.target),
        text = target.next().text();
    target.parents("li").remove();
    addTodoList(text);
});

$("#completeTodoList").on("click", "a.del-btn", function(e) {
    var target = $(e.target);
    target.parents("li").remove();
});

$("#loadTodoBtn").click(function() {
    $.get('data.json', {}, function(data) {
        var todos = data.todos;
        
        $("#todoList").find("li").remove();
        $("#completeTodoList").find("li").remove();
        
        for(var i = 0; i < todos.length; ++i) {
            var todo = todos[i];
            addTodoList(todo);
        }
    });
});