<?php
$data = json_decode(file_get_contents('php://input'), true);
if(isset($data)){
    $_POST = $data;
}else{
    if(!isset($_POST['json'])){
        echo json_encode(array(
            "type"  =>  "error",
            "mjs"   =>  "error json",
        ));
        exit;
    }else{
        $_POST = json_decode($_POST['json'],true);
    }
}
if(!isset($_POST['api'])){
    echo json_encode(array(
        "type"  =>  "error",
        "mjs"   =>  "error api",
    ));
    exit;
}
if(!isset($_POST['url'])){
    echo json_encode(array(
        "type"  =>  "error",
        "mjs"   =>  "error url",
    ));
    exit;
}
if(!isset($_POST['method'])){
    $_POST['method'] = 'GET';
}
if(!isset($_POST['token'])){
    echo json_encode(array(
        "type"  =>  "error",
        "mjs"   =>  "error token",
    ));
    exit;
}

$arrayCurl = array(
    CURLOPT_URL => $_POST['url'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $_POST['method'],
    CURLOPT_HTTPHEADER => array(
        'X-Shopify-Access-Token: '.$_POST['token'],
        'Content-Type: application/json',
    ),
);

if(isset($_POST['post'])){
    $arrayCurl[CURLOPT_POSTFIELDS] = json_encode($_POST['post']);
}else{
    
}

$curl = curl_init();

curl_setopt_array($curl, $arrayCurl);

$response = curl_exec($curl);

curl_close($curl);
echo json_encode(array(
    "type"  =>  "ok",
    "respond" => json_decode($response,true)
));
