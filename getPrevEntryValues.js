// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        //////////////////////////////////////////////////////////////////////////////////////
        // JSON of values to fill
        //-----------------------
        // format:
        // "element id of this form" : "element id of previous form"
        //
        // example:
        // "element_1" : "element_5"
        // This will fill element_1 of this form with the value of element_5 of prev_form_id
        //
        // notes:
        // * Use a comma after each entry except the last entry
        // * File upload and Signatures are not supported at this time
        //////////////////////////////////////////////////////////////////////////////////////
        var transferJson = {
            "element_1" : "element_1",
            "element_2_3" : "element_2_3",
            "element_2_2" : "element_2_2",
            "element_2_1" : "element_2_1",
            "element_3" : "element_3",
            "element_4_1" : "element_4_1",
            "element_4_2" : "element_4_2",
            "element_4_3" : "element_4_3",
            "element_5" : "element_5",
            "element_6_1" : "element_6_1",
            "element_6_2" : "element_6_2",
            "element_7_1" : "element_7_1",
            "element_7_2" : "element_7_2",
            "element_7_3" : "element_7_3",
            "element_8_1" : "element_8_1",
            "element_8_2" : "element_8_2",
            "element_8_4" : "element_8_4",
            "element_9_1" : "element_9_1",
            "element_9_2" : "element_9_2",
            "element_9_3" : "element_9_3",
            "element_10_1" : "element_10_1",
            "element_10_2" : "element_10_2",
            "element_10_3" : "element_10_3",
            "element_10_4" : "element_10_4",
            "element_10_5" : "element_10_5",
            "element_10_6" : "element_10_6",
             "element_11" : "element_11",
            "element_12_1" : "element_12_1",
            "element_12_2" : "element_12_2",
            "element_13" : "element_13",
            "element_14_1" : "element_14_1",
            "element_14_2" : "element_14_2",
            "element_14_3" : "element_14_3",
            "element_14_4" : "element_14_4",
            "element_15_1" : "element_15_1",
            "element_15_2" : "element_15_2",
            "element_15_3" : "element_15_3",
            "element_15_4" : "element_15_4",
            "element_16_1" : "element_16_1",
            "element_16_2" : "element_16_2",
            "element_16_3" : "element_16_3",
            "element_16_4" : "element_16_4",
            "element_17_1" : "element_17_1",
            "element_17_2" : "element_17_2",
            "element_17_3" : "element_17_3",
            "element_17_4" : "element_17_4",
            "element_18" : "element_18",
            "element_19" : "element_19"
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
                        if (transferJson.hasOwnProperty(element.id)) {
                            console.log(element.id + ': ' +element.type);
                            if (element.type == "text" || element.type == "textarea" || element.type == "select-one"){
                                document.getElementById(element.id).value = obj[element.id]["default_value"];
                            }
                            else if (element.type == "checkbox"){
                                document.getElementById(element.id).checked = obj[element.id]["default_value"] > 0;
                            }
                            else if (element.type == "radio") {
                                var splitName = element.id.split('_');
                                var elementID = splitName[0] + '_' + splitName[1];
                                var checkedElement = elementID + '_' + obj[elementID]["default_value"];
                                document.getElementById(checkedElement).checked = true;
                            }
                            else if (element.type == "hidden"){
                                if (element.class == "")
                                document.getElementById(element.id).checked = obj[element.id]["default_value"] > 0;
                            }
                        }
                    }
                }
            })
        }
    }
);
