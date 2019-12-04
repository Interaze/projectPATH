<?php
    session_start();
    if(session_status() == PHP_SESSION_ACTIVE){
        echo json_encode([
            'msg' => 'You are now Logged in as ' . $_SESSION['UserName'],
            'isSignedIn' => 'true',
            'firstName' => $_SESSION['FirstName'],
            'UserName' => $_SESSION['UserName'],
            'Error' => '0'
        ]);
    }
    else{
        echo json_encode([
            'Error' => '0',
            'isSignedIn' => 'false'
        ]);
    }

?>
