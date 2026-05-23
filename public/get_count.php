<?php
/**
 * Connex Technologies - Get Waitlist Count
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$count_file = 'waitlist_count.txt';
$default_count = 966;

if (file_exists($count_file)) {
    $count = (int)file_get_contents($count_file);
} else {
    $count = $default_count;
    // Initialize file if it doesn't exist
    file_put_contents($count_file, $count);
}

echo json_encode(['count' => $count]);
?>
