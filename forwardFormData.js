// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        document.forms[0].addEventListener("submit", createRequest);
        document.forms[0].addEventListener("submit", function(event) {
            event.preventDefault();
        }, false);
    }
);

// Function to run when form is submitted.
function createRequest(){
    // POST original form data
    $.ajax(
        {
            type: 'POST',
            url: "/machform/view.php",
            data: $('form').serialize(),
            success: function(result){
            },
            error: function(result){
            },
            complete: function(){
                console.log('Form Submission Finished');
            }
        }
    );
    
    /* JSON of element IDs and their corresponding IDs on new form
     { 
        ID_from_initial_form : ID_from_final_form 
    }
    */
    var new_ele_obj = {
        "element_1" : "element_1",
        "element_2_1" : "element_2_1",
        "element_2_2" : "element_2_2",
        "element_2_3" : "element_2_3",
        "element_3" : "element_3",
        "element_4" : "element_4"
    }
    
    var info_link = 'https://www.sunyorange.edu/machform/view.php?id=421215&';
    var data_to_pass = $('form').serialize().split('&form_id')[0]
    
    for (var obj_key in new_ele_obj) {
        data_to_pass = data_to_pass.replace(obj_key, new_ele_obj[obj_key]);
    }
    
    window.open(info_link + data_to_pass, '_blank');
    
     // Hide Form
    var form_to_hide = document.forms[0];
    if (form_to_hide.style.display === "none") {
        form_to_hide.style.display = "block";
    } 
    else {
        form_to_hide.style.display = "none";
    }

    // Create a new DIV with text in it and insert it where the form was
    var div_element = document.createElement('div');
    var para = document.createElement("H2");
    var t = document.createTextNode("Success! Your submission has been saved!");
    para.appendChild(t);
    div_element.style.textAlign = "center";
    div_element.setAttribute('class', 'form_success');
    div_element.appendChild(para);
    document.getElementById("form_container").insertBefore(div_element, form_to_hide);
};
