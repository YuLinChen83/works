var todoList = $("#todoList"),
    completeTodoList = $("#completeTodoList");

var out_date_flag = 0;//設定過期flag

var set_date=$("#newItemInput_time");//讀取輸入日期


function addTodoList(text) {
debugger;
var set_date_to_show=set_date.val();

    if(out_date_flag==0)
    {
        todoList.append($('<li><span><input type="checkbox" class="complete-check-box" /><b＿            contenteditable="true">' + text + '</b><a class="del-btn"                                       href="javascript:;">X</a>'+set_date_to_show+'</span></li>'));
    }else
        {
            todoList.append($('<li><span style="background-color: RED"><input type="checkbox"               class="complete-check-box" /><b＿contenteditable="true">' + text + '</b><a                       class="del-btn" href="javascript:;">X</a>'+set_date_to_show+'</span></li>'));
        }
    
};

function backTodoList(text) {

    todoList.append($('<li><span><input type="checkbox" class="complete-check-box" /><b＿            contenteditable="true">' + text + '</b><a class="del-btn"                                       href="javascript:;">X</a></span></li>'));
 
};

function addCompleteTodoList(text) {
    completeTodoList.append($('<li><span><input type="checkbox" class="complete-check-box" checked /><i>' + text + '</i><a class="del-btn" href="javascript:;">X</a></span></li>'));
};

$("#newItemForm").submit(function() {
    var input = $("input", this);//讀取輸入字串至變數 input
    
    //-------------把輸入日期讀出來------------//
    var todojob_date_index =set_date.val();
    var todo_date_array = todojob_date_index.split("-");
    var time_year_index = todo_date_array[0];
    var time_month_index = todo_date_array[1];
    var time_day_temp= todo_date_array[2];
    var time_day_array = time_day_temp.split("T");
    var time_day_index = time_day_array[0];
    //-------------把輸入日期讀出來------------//
    
    var Today=new Date();//得到目前日期，存在變數today中。

    if(time_year_index<Today.getFullYear())
        {
            out_date_flag=1;
        }else
        {
            if(time_year_index==Today.getFullYear()&&time_month_index<(Today.getMonth()+1))
            {
                 out_date_flag=1;
            }else
            {
                if(time_year_index==Today.getFullYear()&&time_month_index==(Today.getMonth()+1)&&time_day_index<Today.getDate())
                {
                     out_date_flag=1;
                }
            }
        }//比較當前日期與設定日期的差別，若過期則將out_date_flag設為1。
        
    addTodoList(input.val());//將輸入放到todolist中
    input.val('');//清空變數值?
    out_date_flag=0;//過期flag回歸預設值
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
    backTodoList(text);
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

   
    
