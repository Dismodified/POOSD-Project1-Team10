<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Great", "White", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Phone, Email, Address, UserID) VALUES (?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssi", $firstName, $lastName, $phone, $email, $address, $userId);
		if($stmt->execute()) {
			returnWithInfo("Contact added successfully");
		} else {
			returnWithError($stmt->error);
		}
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $msg )
	{
		$retValue = '{"error":"", "message":"' . $msg . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>

