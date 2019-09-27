// API URL.
const Url='/machform33/so_php/service_desk_request.php';

// Once page has loaded, add an event when the form is submitted.
$(document).ready(
    function()
    {
        var urlParams = new URLSearchParams(window.location.search);
        console.log("Submitted: " + urlParams.has('done'));
        if (urlParams.has('prev_entry'))
        {
            console.log("Entry id: " + urlParams.get('prev_entry'));
            // POST original form data
            $.ajax(
            {
                type: 'POST',
                url: "/machform33/so_php/get_form_values.php",
                data: "&prev_form_id=73507&prev_entry_id=" + urlParams.get('prev_entry'),
                success: function(result){
                },
                error: function(result){
                },
                complete: function(result){
                    console.log(result.responseText);
                    
                    var jsonData = result.responseText;
                    var obj = JSON.parse(jsonData);
                    
                     // Hide Form
                    var form_to_hide = document.forms[0];
                    if (form_to_hide.style.display === "none") {
                        form_to_hide.style.display = "block";
                    } 
                    else {
                        form_to_hide.style.display = "none";
                    }
                    
                    var student_role = ${"element_1"}.options[obj["element_1"]["default_value"]].text;
                    var first_name = obj["element_2"]["default_value"];
                    var last_name = obj["element_3"]["default_value"];
                    var a_number = obj["element_4"]["default_value"];
                    var phone_number = obj["element_9_1"]["default_value"] + "-" + obj["element_9_2"]["default_value"] + "-" + obj["element_9_3"]["default_value"];
                    var alt_email = obj["element_6"]["default_value"];
                    var last_login = ${"element_7"}.options[obj["element_7"]["default_value"]].text;
                    var description = obj["element_8"]["default_value"];
                    
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

                    // Create a new DIV with text in it and insert it where the form was
                    var div_element = document.createElement('div');
                    var para = document.createElement("H2");
                    var t = document.createTextNode("Success! Your submission has been saved!");
                    para.appendChild(t);
                    div_element.style.textAlign = "center";
                    div_element.setAttribute('class', 'form_success');
                    div_element.appendChild(para);
                    document.getElementById("form_container").insertBefore(div_element, form_to_hide);
                }
            })
        }
    }
);
