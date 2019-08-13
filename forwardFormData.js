// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        document.forms[0].addEventListener("submit", createRequest);
        document.forms[0].addEventListener("submit", function(event) {
            event.preventDefault();
        }, false);
        console.log("opened");
    }
);

// Function to run when form is submitted.
function createRequest(){
    // Gather form entries as variables.
    var ele_1 = $('#element_1').val();
    var ele_3 = $('#element_3').val();

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
    
    var info_link = 'https://www.sunyorange.edu/machform/view.php?id=418263&element_1='+ele_1+'&element_3='+ele_3;
    if ($('#element_2_1').cheked) {
        info_link += 'element_2_1=1';
    } 
    if ($('#element_2_2').cheked) {
        info_link += 'element_2_2=1';
    }
    if ($('#element_2_3').cheked) {
        info_link += 'element_2_3=1';
    }
    
    console.log($('form').serialize())
    console.log(info_link)
    
    window.open(info_link, '_blank');
    
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
