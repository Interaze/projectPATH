<?php
    $subUserName = filter_var($_POST["UserName"], FILTER_SANITIZE_STRING);
    $subPassword = filter_var($_POST["Password"], FILTER_SANITIZE_STRING);

    if(!$subUserName || !$subPassword){
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
            $sql = "SELECT * from Users where UserName='".$subUserName."' and Password='".$subPassword."';";
                $resultedSQL = $conn->query($sql);
                if (($resultedSQL) !== FALSE) {
                    $result = $resultedSQL->fetch_assoc();
                    session_start();
                    session_destroy();//eliminates any old sessions
                    session_start();

                    // store session data
                    $_SESSION['FirstName'] = $result["FirstName"];
                    $_SESSION['LastName'] = $result["LastName"];
                    $_SESSION['UserName'] = $result["UserName"];
                    $_SESSION['Folder'] = $result["Folder"];
                    $_SESSION['isAdmin'] = 0;

                    echo json_encode([
                        'msg' => 'You are now Logged in as ' . $_SESSION['UserName'],
                        'firstName' => $_SESSION['FirstName'],
                        'UserName' => $_SESSION['UserName'],
                        'Error' => '0'
                    ]);
                }

                else {
                    echo json_encode([
                        'msg' => 'Sorry, We weren\'t able to log in',
                        'Error' => '1'
                    ]);
                }
        }
        else {
            echo json_encode([
                'msg' => 'Can\'t find Account with that username',
                'Error' => '1'
            ]);
        }

        $conn->close();
    }
?>
