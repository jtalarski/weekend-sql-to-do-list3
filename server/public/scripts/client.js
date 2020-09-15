$(document).ready(onReady);

function onReady() {
    console.log('JQ in the house');
    getTaskList();
    $(document).on('click', '#submitBtn', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    $(document).on('change', ':checkbox', completeTask)
        //$('.trialBox :checkbox').change(completeTask())
} // end onReady


function getTaskList() {
    console.log('in getTaskList');

    $('#viewTaskList').empty();
    $.ajax({
            method: "GET",
            url: '/tasks'
        }).then(function(response) {
            console.log('back from GET', response);
            // initial display
            // if statement ensures that if the task status is complete
            // a checked checkbox is appended to the display
            for (let i = 0; i < response.length; i++) {
                let task = response[i];
                if (task.status === 'complete') {
                    $('#viewTaskList').append(`
                <tr class="isComplete">
                <td>${task.task}</td>
                <td><input type="checkbox" checked></td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button> </td>
                <td></td>
                </tr>
                 `)

                } else {
                    $('#viewTaskList').append(`
                <tr>
                <td>${task.task}</td>
                <td><input type="checkbox" data-id="${task.id}" class="trialBox"></td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button> </td>
                </tr>
                 `)
                }
            }
        }).catch(function(err) {
            alert(err);
            console.log('something bad', err);
        }) // end AJAX
} // end getTaskList

function addTask() {
    console.log('in addTask');
    let objectToSend = {
        task: $('#taskIn').val()
    };

    $.ajax({
            type: 'POST',
            url: '/tasks',
            data: objectToSend
        }).then(function(response) {
            console.log('response came back with', response);
            $('#taskIn').val('');
            getTaskList();
        }).catch(function(error) {
            console.log('error in POST', error)
        }) // end AJAX
} // end addTask




function deleteTask() {
    console.log('made it into deleteTask');
    let taskId = $(this).data('id');
    console.log('this is the id of the task', taskId)
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log("Deleted!", response);
        // Refresh page (aka do another GET request)
        getTaskList();
    }).catch(function(err) {
        console.log("Error in delete", err);
        alert("ruh-roh");
    });
}



// change status to complete
// status will be used to change class of task so that a 
// line through effect can be applied
function completeTask() {
    console.log('in completeTask');
    let id = $(this).data('id');
    console.log('mark complete', id);
    $.ajax({
            method: 'PUT',
            url: `tasks/${id}`,
            data: {
                status: "complete"
            }
        }).then(function(response) {
            console.log('response from status change', response);
            getTaskList();
        }).catch(function(err) {
            console.log('error is marking complete', err);
            alert("something went horribly wrong");
        }) // end AJAX
} // end completeTask