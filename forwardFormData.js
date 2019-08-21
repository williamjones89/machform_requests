var transferJson = {
    "element_1" : "element_1",
    "element_2_3" : "element_2_3"
    "element_2_2" : "element_2_2"
    "element_2_1" : "element_2_1"
    "element_3" : "element_3"
    "element_4" : "element_4"
    "element_5" : "element_5"
}

// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        var urlParams = new URLSearchParams(window.location.search);
        var prevFormID = urlParams.get('prev_form_id');
        var prevEntryID = urlParams.get('prev_entry_id');
        
        console.log("prev form id: " + prevFormID);
        console.log("prev entry id: " + prevEntryID);
        
        // &prev_form_id=417527&prev_entry_id=4
        if (prevFormID != null && prevEntryID != null){
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
                    
                    var jsonData = result.responseText;
                    var obj = JSON.parse(jsonData);
                    
                    console.log(obj["element_1"]["default_value"]);
                    
                    document.getElementById("element_1").value = obj["element_1"]["default_value"];
                }
            })
        }
    }
);
