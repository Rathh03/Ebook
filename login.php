<?php
include('db_connection.php');  // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if required data is provided
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(["message" => "Email and password are required."]);
        exit;
    }

    // Sanitize and validate inputs
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["message" => "Invalid email format."]);
        exit;
    }

    // Prepare and execute the SQL query
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // Bind the email parameter
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch user data
        $row = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $row['password'])) {
            echo json_encode(["message" => "Login successful!"]);
        } else {
            echo json_encode(["message" => "Invalid login credentials."]);
        }
    } else {
        echo json_encode(["message" => "Invalid login credentials."]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
