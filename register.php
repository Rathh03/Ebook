<?php
// Handle JSON request
$data = json_decode(file_get_contents("php://input"), true);

// Database connection
$conn = new mysqli("localhost", "root", "030405", "users");

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed: " . $conn->connect_error]));
}

// Check if the form data is valid
if (isset($data['fullname'], $data['email'], $data['password'])) {
    $fullname = htmlspecialchars(trim($data['fullname']));
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $password = trim($data['password']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["message" => "Invalid email format"]);
        exit;
    }

    // Check if email already exists
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["message" => "Email already registered."]);
        exit;
    }

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into the database
    $query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registration Successful!"]);
    } else {
        echo json_encode(["message" => "Error: " . $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["message" => "Full name, email, and password are required"]);
}

// Close the connection
$conn->close();
?>
