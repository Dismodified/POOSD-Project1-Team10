<?php
    $inData = getRequestInfo();
    
    $id = $inData["id"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    $userId = $inData["userId"];
    
    $conn = new mysqli("localhost", "Great", "White", "SharkWeek");
    
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        // UPDATE query instead of SELECT
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
        $stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $id, $userId);
        
        if($stmt->execute()) {
            if($stmt->affected_rows > 0) {
                returnWithInfo("Contact updated successfully");
            } else {
                returnWithError("No contact found or no changes made");
            }
        } else {
            returnWithError($stmt->error);
        }
        
        $stmt->close();
        $conn->close();
    }
    
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }
    
    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }
    
    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($msg) {
        $retValue = '{"error":"", "message":"' . $msg . '"}';
        sendResultInfoAsJson($retValue);
    }
?>
