<?php
    session_start();

    $test = utf8_encode($_POST['hailmary']); // Don't forget the encoding
    $data = json_decode($test);

    $filename = preg_replace("/[^a-zA-Z]/", "", $data->storage[0]);
    $data->storage[0] = $filename;

    $newJSON = json_encode($data);

    if($_SESSION['UserName'] != null){
        $filePath = "../Users/".$_SESSION['UserName']."/".$filename.".json";
        if($myfile = fopen($filePath, "w")){
        fwrite($myfile, $newJSON);
        fclose($myfile);
        echo json_encode([
            'Error' => '0',
            'isSaved' => 'true',
            'time' => date("h:i:sa"),
            'msg' => $filePath
        ]);
        }
        else{
            echo json_encode([
                'Error' => '1',
                'isSaved' => 'false',
                'isSignedIn' => 'true',
                'msg' => "Unable to save in your account"
            ]);
        }
    }
    else{
        echo json_encode([
            'Error' => '1',
            'isSignedIn' => 'false'
        ]);
    }

?>
