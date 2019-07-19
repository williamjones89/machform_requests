const Url='https://webhook.site/699a57c5-679e-42ba-a94d-ca0595ec55c6';

$(document).ready(
	function()
	{
		document.getElementById("form_416097").addEventListener("submit", createRequest);
	}
);

function createRequest(e){
	e.preventDefault();
	
	var student_role = document.getElementById("element_1").value;
	var first_name = document.getElementById("element_2").value;
	var last_name = document.getElementById("element_3").value;
	var a_number = document.getElementById("element_4").value;
	var phone_number = document.getElementById("element_5").value;
	var alt_email = document.getElementById("element_6").value;
	var last_login = document.getElementById("element_7").value;
	var description = document.getElementById("element_8").value;
    	
	var should_stop = false;
	var response = "";
	if (!student_role)
	{
		response = "Studdent Role";
		should_stop = true;
	}
	else if (!first_name)
	{
		response = "First Name";
		should_stop = true;
	}
	else if (!last_name)
	{
		response = "Last Name";
		should_stop = true;
	}
	else if (!a_number)
	{
		response = "A Number";
		should_stop = true;
	}
	else if (!phone_number)
	{
		response = "Phone Number";
		should_stop = true;
	}
	
	if (should_stop)
	{
		alert("Please enter " + response);
		$(this).find(':input[type=submit]').prop('disabled', false);
		return false;
	}
	
	var myJson = {
        "request": {
                "requester": {
                        "email_id": "",
                        "name": "Default User",
                        "is_vipuser": "false",
                        "id": "13203"
                },
                "subject": "Web Form Login Issue",
                "category": {
                        "name": "STATUS CHECK",
                        "id": "901"
                },
                "subcategory": {
                        "name": "Status Check",
                        "id": "1503"
                },
                "group": {
                    "name": "Service Desk (ITSD)",
                    "id": "301"
                },
                "item": {
                        "name": "Status Check",
                        "id": "3608"
                },
                "description": `<p>${description}</p><br><br><p>${student_role}</p><br><p>${first_name}</p><br><p>${last_name}</p><br><p>${alt_email}</p><br><p>${a_number}</p><br><p>Last login: ${last_login}</p>`,
                "mode": {
                        "name": "4-Web Case",
                        "id": "2"
                },
                "request_type": {
                        "name": "Incident/Interruption of Service",
                        "id": "902"
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
                "udf_sline_2703": "${phone_number}",
                "udf_pick_2702": "OFF-Campus Site"
            }
        }
    }
	
    var jsonString = JSON.stringify(myJson);
	
    var requestData = 'input_data=' + encodeURIComponent(jsonString);
    
	console.log("Submitting Request");
	
	$.ajax(
		{
			type: 'POST',
			url: Url,
			data: requestData,
			success: function(result){
				console.log(result.text);
			},
			error: function(result){
				console.log(result.text);
			},
			complete: function(){
				console.log('Request Submission Finished');
			}
		}
	);
	
	$.ajax(
		{
			type: 'POST',
			url: "/machform/view.php",
			data: $('form').serialize(),
			success: function(result){
				console.log(result.text);
			},
			error: function(result){
				console.log(result.text);
			},
			complete: function(){
				console.log('Form Submission Finished');

				var form_to_hide = document.getElementById("form_416097")
				if (form_to_hide.style.display === "none") {
					form_to_hide.style.display = "block";
				} else {
					form_to_hide.style.display = "none";
				}

				var para = document.createElement("P");
				var t = document.createTextNode("This is a paragraph.");
				para.appendChild(t);
				document.getElementById("form_container").insertBefore(para, form_to_hide);
			}
		}
	);
};
