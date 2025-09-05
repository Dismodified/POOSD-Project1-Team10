<?php
    $inData = getRequestInfo();

    $id     = isset($inData["id"]) ? (int)$inData["id"] : 0;
    $userId = isset($inData["userId"]) ? (int)$inData["userId"] : 0;

    if ($id <= 0 || $userId <= 0) {
        returnWithError("Missing or invalid id/userId");
        exit;
    }

    $conn = new mysqli("localhost", "Great", "White", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? AND UserID = ?");
        $stmt->bind_param("ii", $id, $userId);

        if ($stmt->execute())
        {
            if ($stmt->affected_rows > 0) {
                returnWithInfo("Contact deleted successfully");
            } else {
                returnWithError("Contact not found for this user");
            }
        }
        else
        {
            returnWithError($stmt->error);
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($msg)
    {
        $retValue = '{"error":"", "message":"' . $msg . '"}';
        sendResultInfoAsJson($retValue);
    }
?>

