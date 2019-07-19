// API URL.
const Url='https://webhook.site/699a57c5-679e-42ba-a94d-ca0595ec55c6';

// Once page has loaded, add an event when the form is submitted.
$(document).ready(
	function()
	{
		document.forms[0].addEventListener("submit", createRequest);
	}
);

// Function to run when form is submitted.
function createRequest(e){
	
	// Prevent default submission of form.
	e.preventDefault();
	
	// Gather form entries as variables.
	var student_role = document.getElementById("element_1").value;
	var first_name = document.getElementById("element_2").value;
	var last_name = document.getElementById("element_3").value;
	var a_number = document.getElementById("element_4").value;
	var phone_number = document.getElementById("element_5").value;
	var alt_email = document.getElementById("element_6").value;
	var last_login = document.getElementById("element_7").value;
	var description = document.getElementById("element_8").value;
    
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
		response = "First Name";
		should_stop = true;
	}
	else if (!last_name)
	{
		response = "Last Name";
		should_stop = true;
	}
	else if (!a_number || !a_number.mactch(/(A\a)?([0-9]{8})/) || a_number.length != 9)
	{
		response = "Valid A Number";
		should_stop = true;
	}
	else if (!phone_number || !phone_number.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
	{
		response = "Phone Number";
		should_stop = true;
	}
	else if (alt_email)
	{
		var email_lowered = alt_email.toLowerCase();
		console.log(email_lowered);
		if ( email_lowered.includes("@sunyorange.edu"))
		{
			response = "Valid Non-SunyOrange email";
			should_stop = true;
		}
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
			"description": `<p>${description}</p><br><br><p>${student_role}</p><br><p>${first_name}</p><br><p>${last_name}</p><br><p>${alt_email}</p><br><p>${a_number}</p><br><p>Last login: ${last_login}</p>`,
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
				"udf_sline_2703": "${phone_number}",
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
	
	// POST requestData to API URL
	$.ajax(
		{
			type: 'POST',
			url: Url,
			data: requestData,
			success: function(result){
				console.log(result);
			},
			error: function(result){
				console.log(result);
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
			url: "/machform/view.php",
			data: $('form').serialize(),
			success: function(result){
				console.log(result);
			},
			error: function(result){
				console.log(result);
			},
			complete: function(){
				console.log('Form Submission Finished');

				// Hide Form
				var form_to_hide = document.forms[0];
				if (form_to_hide.style.display === "none") {
					form_to_hide.style.display = "block";
				} else {
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
			}
		}
	);
};
