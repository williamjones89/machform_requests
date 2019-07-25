# machform_requests

These scripts are designed to validate information entered into a form created by MACHFORM and create a request within ServiceDesk.

create_request.js:
	- Disable default POST action from MACHFORM form
	- Validates information on form
	- Organizes form data into request formatted in JSON
	- Passes JSON data encoded for URL to service_desk_request.php
	- Passes form data to default MACHFORM php file

service_desk_request.php:
	- Stores API KEY and URL for ServiceDesk so that it is not shown in client-side scripts
	- Sends data received from POST request from create_request.js and passes it into a request to ServiceDesk
