<?php

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
}

function randomstr($length = 16) {
    $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return substr(str_shuffle($chars), 0, $length);
}

$image =  '../uploads/' . randomstr() .  '.'  . basename($_FILES['image']['type']);
if (move_uploaded_file($_FILES['image']['tmp_name'], $image)) {
    $image = substr($image, 2,strlen($image));
    $response['url'] = $image;
    print_r(json_encode($response));
} else {
    $response['error'] = 'Error!';
}
