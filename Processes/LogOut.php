<?php
    session_start();
    session_destroy();
    if(session_status() == PHP_SESSION_ACTIVE){
        echo json_encode([
            'msg' => 'Failed To Log Out',
            'isSignedOut' => 'false',
            'Error' => '1'
        ]);
    }
    else{
        echo json_encode([
            'Error' => '0',
            'isSignedOut' => 'true',
        ]);
    }

?>
