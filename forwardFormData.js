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
    // Gather form entries as variables.
    var ele_1 = $('#element_1').val();
    var ele_2 = $('#element_2').val();
    var ele_3 = $('#element_3').val();
    
    // Create variable should_stop and set it to false.
    // Create variable repsonse and leave it blank.
    var should_stop = false;
    var response = "";

    if (should_stop)
    {
        alert("Please enter " + response);
        $(this).find(':input[type=submit]').prop('disabled', false);
        return false;
    }

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
    
    window.open('https://www.sunyorange.edu/machform/view.php?id=418263&element_1='+ele_1+'&element_2=${ele_2}&element_3=${ele_3}', '_blank');
    
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
