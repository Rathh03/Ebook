<?php
$host = "localhost";
$username = "root";  // Your MySQL username
$password = "030405";      // Your MySQL password
$dbname = "my_project ";  // Your database name

// Establish a connection to MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Check for a connection error
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
