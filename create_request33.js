// API URL.
const Url='/machform33/so_php/service_desk_request.php';

// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        var urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.has('done'));
        if (urlParams.has('prev_entry_id'))
        {
            console.log(urlParams.get('prev_entry_id'));
            // POST original form data
            $.ajax(
            {
                type: 'POST',
                url: "/machform33/so_php/get_form_values.php",
                data: "&prev_form_id=" + urlParams.get('id') + "&prev_entry_id=" + urlParams.get('prev_entry_id'),
                success: function(result){
                },
                error: function(result){
                },
                complete: function(result){
                    console.log(result.responseText);
                }
            })
        }
    }
);

// Function to run when form is submitted.
function createRequest(){
    // Gather form entries as variables.
    var student_role = $('#element_1 :selected').text();;
    var first_name = $('#element_2').val();
    var last_name = $('#element_3').val();
    var a_number = $('#element_4').val();
    var phone_number = $('#element_9_1').val() + "-" + $('#element_9_2').val() + "-" + $('#element_9_3').val();
    var alt_email = $('#element_6').val();
    var last_login = $('#element_7 :selected').text();
    var description = $('#element_8').val();
    
    // Create variable should_stop and set it to false.
    // Create variable repsonse and leave it blank.
    var should_stop = false;
    var response = "";
    
    // If any of the mandatory fields are empty, set should_skip to true
    // and set response to the field label.
    if (!student_role)
    {
        response = "Studdent Role";
        should_stop = true;
    }
    else if (!first_name)
    {
        response = "your First Name";
        should_stop = true;
    }
    else if (!last_name)
    {
        response = "your Last Name";
        should_stop = true;
    }
    else if (!a_number || !a_number.match(/^a[0-9]{8}$/i))
    {
        response = "a valid A-Number (Ex: A00123456)";
        should_stop = true;
    }
    else if (!phone_number || !phone_number.match(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/))
    {
        response = "a Phone Number (Ex: XXX-XXX-XXXX)";
        should_stop = true;
    }
    else if (!alt_email || !/^\S+@\S+\.\S{2,3}$/.test(alt_email) ||alt_email.toLowerCase().includes("@sunyorange.edu"))
    {
        response = "a valid Non-SunyOrange email";
        should_stop = true;
    }
    else if (!last_login)
    {
        response = "your Last Successful Login";
        should_stop = true;
    }
    
    /*
    If should_skip is true:
        * Alter user.
        * Re-enable to submit button.
        * return false so this function ends here.
    */
    if (should_stop)
    {
        alert("Please enter " + response);
        $(this).find(':input[type=submit]').prop('disabled', false);
        return false;
    }
    
    // Create JSON to send to API URL using variables we created.
    var myJson = {
        "request": {
            "requester": {
                "email_id": "",
                "name": "Default User",
                "is_vipuser": "false",
                "id": "13203"
            },
            "subject": "Web Form Login Issue",
            "request_type": {
                "name": "Incident/Interruption of Service",
                "id": "902"
            },
            "category": {
                "name": "INCIDENTS OR INTERRUPTION OF SERVICE",
                "id": "602"
            },
            "subcategory": {
                "name": "Login/Account Issue/Failure",
                "id": "1220"
            },
            "item": {
                "name": "Login/Password Error",
                "id": "3399"
            },
            "group": {
                "name": "Service Desk (ITSD)",
                "id": "301"
            },
            "description": `<p>${description}</p><br><p>Student role: ${student_role}</p><br><p>Last login: ${last_login}</p><br><p>${first_name} ${last_name}</p><p>${phone_number}</p><p>${alt_email}</p><p>${a_number}</p>`,
            "mode": {
                "name": "4-Web Case",
                "id": "2"
            },
            "impact": {
                "name": "4-Minor/Localized",
                "id": "3"
            },
            "priority": {
                "color": "#939393",
                "name": "4-Low",
                "id": "1"
            },
            "urgency": {
                "name": "4-Low",
                "id": "4"
            },
            "udf_fields": {
                "udf_multiselect_3610": [
                    "MySUNYOrange"
                ],
                "udf_sline_2705": "N/A",
                "udf_sline_2703": `${phone_number}`,
                "udf_pick_2702": "OFF-Campus Site"
            }
        }
    }
    
    // Convert JSON to string
    var jsonString = JSON.stringify(myJson);
    
    // Add "input_data=" to the beginning of the jsonString.
    // Encode non-letter characters (Ex: } becomes %7D)
    var requestData = 'input_data=' + encodeURIComponent(jsonString);
    
    console.log("Submitting Request");
    
    // POST requestData to service_desk_request
    $.ajax(
        {
            type: 'POST',
            url: Url,
            data: requestData,
            success: function(result){
            },
            error: function(result){
            },
            complete: function(){
                console.log('Request Submission Finished');
            }
        }
    );

    // POST original form data
    $.ajax(
        {
            type: 'POST',
            url: "/machform33/view.php",
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
