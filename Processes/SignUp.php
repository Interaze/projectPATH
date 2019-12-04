<?php
    $subFirstName = filter_var($_POST["FirstName"], FILTER_SANITIZE_STRING);
    $subLastName = filter_var($_POST["LastName"], FILTER_SANITIZE_STRING);
    $subUserName = filter_var($_POST["UserName"], FILTER_SANITIZE_STRING);
    $subEmail = filter_var($_POST["Email"], FILTER_SANITIZE_STRING);
    $subPassword = filter_var($_POST["Password"], FILTER_SANITIZE_STRING);

    if(!$subFirstName || !$subLastName || !$subUserName || !$subEmail || !$subPassword){
        echo json_encode([
            'msg' => 'Invalid Data',
            'Error' => '1'
        ]);
    }
    else{
        // Create connection
        $conn = new mysqli("localhost:8889", "FinalBot", "Trym3B30nc3", "Final_Project");
        // Check connection
        if ($conn->connect_error) {
            echo json_encode([
                'msg' => 'Connection Failed',
                'Error' => '1'
            ]);
        }

        $sql = "SELECT * FROM Users WHERE UserName='".$subUserName."';";
        if (($rows = $conn->query($sql)) !== FALSE) {
            $sql = "INSERT INTO `Users` (`PK`, `UserName`, `Email`, `FirstName`, `LastName`, `Password`, `Folder`, `isAdmin`) VALUES (NULL, '".$subUserName."', '".$subEmail."', '".$subFirstName."', '".$subLastName."', '".$subPassword."', '../Users/".$subUserName."', '0');";

                if (($conn->query($sql)) !== FALSE) {
                    session_destroy();//eliminates any old sessions
                    session_start();
                    if(!mkdir('../Users/'.$subUserName.'')){
                        echo json_encode([
                            'msg' => 'Could not allocate of file currently',
                            'Error' => '1'
                        ]);
                    }
                    else{
                        // store session data
                        $_SESSION['FirstName'] = $subFirstName;
                        $_SESSION['LastName'] = $subLastName;
                        $_SESSION['UserName'] = $subUserName;
                        $_SESSION['Folder'] = '../Users/".$subUserName."';
                        $_SESSION['isAdmin'] = 0;

                        echo json_encode([
                            'msg' => 'You are now registered as ' . $subUserName,
                            'firstName' => $_SESSION['FirstName'],
                            'UserName' => $_SESSION['UserName'],
                            'Error' => '0'
                        ]);
                    }
                }

                else {
                    echo json_encode([
                        'msg' => 'Please choose a different username',
                        'Error' => '1'
                    ]);
                }
        }
        else {
            echo json_encode([
                'msg' => 'Can\'t query right now',
                'Error' => '1'
            ]);
        }

        $conn->close();
    }
?>
