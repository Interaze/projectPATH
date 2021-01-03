<?php
    $subFile = filter_var($_POST["hailmary"], FILTER_SANITIZE_STRING);
    session_start();
    if($_SESSION['UserName'] != null){
        $file_pointer = "Users/".$_SESSION['UserName']."/".$subFile;
        if(unlink($file_pointer)){
            echo true;
        }
        else {
            echo false;
        }
    }
    else{
        echo false;
    }

?>
