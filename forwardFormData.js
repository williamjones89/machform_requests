// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        var urlParams = new URLSearchParams(window.location.search);
        var formormID = urlParams.get('id');
        var prevFormID = urlParams.get('prev_form_id');
        var prevEntryID = urlParams.get('prev_entry_id');
        
        // &prev_form_id=417527&prev_entry_id=4
        $.ajax(
        {
            type: 'POST',
            url: "/machform/so_php/get_form_values.php",
            data: "&prev_form_id=" + prevFormID + "&prev_entry_id=" + prevEntryID,
            success: function(result){
            },
            error: function(result){
            },
            complete: function(result){
                console.log(result.responseText);
            }
        })
    }
);
