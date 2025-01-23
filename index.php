<?php
include 'db_connection.php';

$sql = "SELECT id, title, cover_url FROM books";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>eBook Site</title>
</head>
<body>
    <h1>Welcome to the eBook Site</h1>

    <h2>Available Books:</h2>
    <?php while ($book = $result->fetch_assoc()): ?>
        <div>
            <img src="<?= $book['cover_url'] ?>" alt="<?= $book['title'] ?>" width="100">
            <h3><?= $book['title'] ?></h3>
            <a href="view_book.php?id=<?= $book['id'] ?>">Read</a>
        </div>
    <?php endwhile; ?>

    <h2>User Links:</h2>
    <a href="update_profile.php">Update Profile</a> | 
    <a href="recommendations.php">Recommendations</a>
</body>
</html>
