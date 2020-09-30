<?php 
$token='1320636598:AAHG5OzvOmf1HBMjvGQV3Q7ulcSGU6oUpSo';
$chat_id='434145726';
$chat_kir='951595289';

var_dump($_POST);
echo "<script>
	alert('success');
</script>";

$text= "
=========================  
Имя: {$_POST['name']}   
email: {$_POST['email']}  
телефон: {$_POST['tel']} 
описание:{$_POST['text']}";


$ch=curl_init();
curl_setopt($ch, CURLOPT_URL,
       'https://api.telegram.org/bot'.$token.'/sendMessage');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS,
       'chat_id='.$chat_id.'&text='.urlencode($text));
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

$result=curl_exec($ch);

curl_close($ch);

$ch=curl_init();
curl_setopt($ch, CURLOPT_URL,
       'https://api.telegram.org/bot'.$token.'/sendMessage');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS,
       'chat_id='.$chat_kir.'&text='.urlencode($text));
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

$result=curl_exec($ch);

curl_close($ch);
 ?>