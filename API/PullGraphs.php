<?php
    session_start();
    if($_SESSION['UserName'] != null){
        $arr["error"] = 0;
        $arr["isSignedIn"] = true;
        $i = 0;
        foreach (glob("Users/".$_SESSION['UserName']."/*.json") as $filename) {
            $arr[$i] = basename($filename);
            $i++;
        }
        $arr["length"] = $i;
        echo json_encode($arr);
    }
    else{
        echo json_encode([
            'Error' => '0',
            'isSignedIn' => 'false'
        ]);
    }

?>
