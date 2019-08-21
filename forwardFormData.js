// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        var transferJson = {
            "element_1" : "element_1",
            "element_2_3" : "element_2_3",
            "element_2_2" : "element_2_2",
            "element_2_1" : "element_2_1",
            "element_3" : "element_3",
            "element_4" : "element_4",
            "element_5" : "element_5"
        };
        
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
                    
                    for (i = 0; i < document.forms[0].elements.length; i++) {
                        var element = document.forms[0].elements[i];
                        if (transferJson hasOwnProperty(element.id))
                        {
                            console.log(element.type);
                        }
                        if (element.type == "checkbox"){
                            
                        }
                    }
                    
                    document.getElementById("element_1").value = obj["element_1"]["default_value"];
                    document.getElementById("element_2_1").checked = obj["element_2_1"]["default_value"] > 0;
                    document.getElementById("element_2_2").checked = obj["element_2_2"]["default_value"] > 0;
                    document.getElementById("element_2_3").checked = obj["element_2_3"]["default_value"] > 0;
                    document.getElementById("element_3").value = obj["element_3"]["default_value"];
                    document.getElementById("element_4_1").checked = obj["element_4"]["default_value"] == 1;
                    document.getElementById("element_4_2").checked = obj["element_4"]["default_value"] == 2;
                    document.getElementById("element_4_3").checked = obj["element_4"]["default_value"] == 3;
                    document.getElementById("element_5").selectedIndex = obj["element_5"]["default_value"];
                }
            })
        }
    }
);
