// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        document.forms[0].addEventListener("submit", createRequest);
        document.forms[0].addEventListener("submit", function(event) {
            event.preventDefault();
        }, false);
        console.log("opened");
        
        var e21 = $('#element_2_1').cheked
        var e22 = $('#element_2_2').cheked
        var e23 = $('#element_2_3').cheked
        var e211 = $('#element_2_1').value
        var e222 = $('#element_2_2').value
        var e233 = $('#element_2_3').value
        var e2111 = $('#element_2_1').val()
        var e2222 = $('#element_2_2').val()
        var e2333 = $('#element_2_3').val()
        
        console.log("Checkbox 1 is: " + e21);
        console.log("Checkbox 2 is: " + e22);
        console.log("Checkbox 3 is: " + e23);
        console.log("Checkbox 1 is: " + e211);
        console.log("Checkbox 2 is: " + e222);
        console.log("Checkbox 3 is: " + e233);
        console.log("Checkbox 1 is: " + e2111);
        console.log("Checkbox 2 is: " + e2222);
        console.log("Checkbox 3 is: " + e2333);
    }
);

// Function to run when form is submitted.
function createRequest(){
    // Gather form entries as variables.
    var ele_1 = $('#element_1').val();
    var ele_2_1 = 0;
    var ele_2_2 = 0;
    var ele_2_3 = 0;
    
    if ($('#element_2_1').cheked == true) {
        ele_2_1 = 1;
    } 
    if ($('#element_2_2').cheked == true) {
        ele_2_2 = 1;
    }
    if ($('#element_2_3').cheked == true) {
        ele_2_3 = 1;
    }
    
    alert("Checkbox 1 is: " + ele_2_1 + "\n");
    alert("Checkbox 2 is: " + ele_2_2 + "\n");
    alert("Checkbox 3 is: " + ele_2_3 + "\n");

    var ele_3 = $('#element_3').val();
    
    alert($('form').serialize())

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
    
    window.open('https://www.sunyorange.edu/machform/view.php?id=418263&element_1='+ele_1+'&element_2_1='+ele_2_1+'&element_2_2='+ele_2_2+'&element_2_3='+ele_2_3+'&element_3='+ele_3, '_blank');
    
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
