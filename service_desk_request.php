<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://servicedesk.sunyorange.edu:443/api/v3/requests?TECHNICIAN_KEY=");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 100);
curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
curl_exec($ch);
curl_close($ch);
echo 'success';
exit;
?>
