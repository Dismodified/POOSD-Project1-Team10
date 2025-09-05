<?php

    $inData = getRequestInfo();

    $id        = isset($inData["id"]) ? (int)$inData["id"] : 0;
    $userId    = isset($inData["userId"]) ? (int)$inData["userId"] : 0;
    $firstName = $inData["firstName"] ?? "";
    $lastName  = $inData["lastName"]  ?? "";
    $phone     = $inData["phone"]     ?? "";
    $email     = $inData["email"]     ?? "";

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
        $chk = $conn->prepare("SELECT ID FROM Contacts WHERE ID = ? AND UserID = ?");
        $chk->bind_param("ii", $id, $userId);
        $chk->execute();
        $exists = $chk->get_result()->fetch_assoc();
        $chk->close();

        if (!$exists) {
            returnWithError("Contact not found for this user");
            $conn->close();
            exit;
        }

        $stmt = $conn->prepare("
            UPDATE Contacts
               SET FirstName = ?, LastName = ?, Phone = ?, Email = ?, Address = ?
             WHERE ID = ? AND UserID = ?
        ");
        $stmt->bind_param("sssssii", $firstName, $lastName, $phone, $email, $address, $id, $userId);

        if ($stmt->execute())
        {
            returnWithInfo("Contact updated successfully");
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

