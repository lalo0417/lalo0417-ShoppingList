$(document).ready(function (event) {
    console.log("loaded");
    displayList();
});



function setListArray(arr) {
    localStorage.setItem("savedTasks", JSON.stringify(arr));
}

function getListArray() {
    var savedTasks = localStorage.getItem('savedTasks');
    if (!savedTasks) {
        savedTasks = "[]";
    }
    return JSON.parse(savedTasks);
    //return JSON.parse(localStorage.getItem("savedTasks"));
}

function buttonFire() {
    if ($('#input').val().length > 0) {
        var myObj = {
            name: $("#input").val(),
            isDone: false
        };
        var theList = getListArray();
        theList.push(myObj);
        setListArray(theList);
        $("#input").val('');
        displayList();
    }
};

function selectItem(ev) {
    var li = $(ev.target);

    if ($(ev.target).hasClass("task")) {
        var newArray = getListArray();
        if (newArray[li.index()].isDone) {
            newArray[li.index()].isDone = false;
        } else {
            newArray[li.index()].isDone = true;
        }
        setListArray(newArray);
    }
    displayList();
};

function deleteStuff() {
    var theList = getListArray();
    if (theList.length > 0) {
        swal({
                title: "Are you sure?",
                text: "Your list will be cleared and can not be recovered!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, I am sure!',
                cancelButtonText: "No, keep it!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {

                if (isConfirm) {
                    swal("Cleared!", "The list has been cleared!", "success");
                    setListArray([]);
                    displayList();

                } else {
                    swal("Cancelled", "List was not cleared.", "error");
                    //e.preventDefault();
                }
            });
    } else {
        swal("Your list is empty!");
    }

};

function displayList() {
    $("#list").html("");
    var theList = getListArray();
    for (var i = 0; i < theList.length; i++) {
        var a;
        if (theList[i].isDone) a = "task checkedItem";
        else a = "task";

        $("#list").append("<li class='" + a + "'>" + theList[i].name + "<button class ='x'>X</button></li>");
    }
    $("#addToList").click(buttonFire);
    $(".task").click(selectItem);
    $("#deleteItems").click(deleteStuff);
    $(".x").click(deleteThisItem);

};

function deleteThisItem() {
    var theList = getListArray();
    var itemIndex = $(this).closest('li').index();
    theList.splice(itemIndex, 1);
    setListArray(theList);
    displayList();

}

//only one delete or select per reload, why