<?php

$conn = mysqli_connect('localhost', 'root', '', 'datamap');

if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$button = $_POST['button'];

$sql = "insert into dmap (direction) VALUES ('$button')";
mysqli_query($conn, $sql);

mysqli_close($conn);
echo $button;

?>