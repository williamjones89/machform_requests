import sys
import json
import requests
import time

serverURL = "https://servicedesk.sunyorange.edu:443"
technicianKey = ''
reqID= '47069'
with requests.Session() as s:
detail_data = {
	"list_info": {
		"search_fields": {
			"name": "William Jones"
		},
	}
}
jsonData = json.dumps(detail_data)
data = {'INPUT_DATA': jsonData}

r = s.get(serverURL + '/api/v3/requesters?TECHNICIAN_KEY=' + technicianKey + '&OPERATION_NAME=GET&input_data=' + jsonData)

if(r.status_code == 200):
	print("Task Added successfully through Custom Triggers")
	print(r.json())
else:
	print(r.status_code)
