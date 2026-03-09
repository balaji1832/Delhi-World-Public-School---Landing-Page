<?php

$host = "localhost";
$dbname = "dwps";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    header("Location: index.html?toast=error&msg=" . urlencode("Database connection failed") . "&modal=open");
    exit;
}

$name = trim($_POST['name'] ?? '');
$mobile = trim($_POST['mobile'] ?? '');
$email = trim($_POST['email'] ?? '');
$userCaptcha = trim($_POST['captcha_input'] ?? '');
$generatedCaptcha = trim($_POST['captcha_generated'] ?? '');

if ($name === '' || $mobile === '' || $email === '' || $userCaptcha === '' || $generatedCaptcha === '') {
    header("Location: index.html?toast=error&msg=" . urlencode("All fields are required") . "&modal=open");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.html?toast=error&msg=" . urlencode("Invalid email address") . "&modal=open");
    exit;
}

if (!preg_match('/^[0-9]{10}$/', $mobile)) {
    header("Location: index.html?toast=error&msg=" . urlencode("Enter a valid 10-digit mobile number") . "&modal=open");
    exit;
}

if (strcasecmp($userCaptcha, $generatedCaptcha) !== 0) {
    header("Location: index.html?toast=error&msg=" . urlencode("Captcha incorrect") . "&modal=open");
    exit;
}

/* -----------------------------
   SAVE TO MYSQL
----------------------------- */
$stmt = $conn->prepare("INSERT INTO enquiries (name, mobile, email) VALUES (?, ?, ?)");

if (!$stmt) {
    header("Location: index.html?toast=error&msg=" . urlencode("Prepare failed") . "&modal=open");
    exit;
}

$stmt->bind_param("sss", $name, $mobile, $email);

if (!$stmt->execute()) {
    header("Location: index.html?toast=error&msg=" . urlencode("Something went wrong") . "&modal=open");
    exit;
}

$stmt->close();
$conn->close();

/* -----------------------------
   SEND TO GOOGLE SHEET
----------------------------- */
$googleScriptUrl = "https://script.google.com/macros/s/AKfycbxl_GAFm41tOZQwDyHwMi8wb8ju39NOHy8nr6H5_WXo_jDL2Z3MRdnS0nLWgRSU53Q/exec";

$postData = [
    'name'   => $name,
    'mobile' => $mobile,
    'email'  => $email
];

$ch = curl_init($googleScriptUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // important
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

/* -----------------------------
   FINAL REDIRECT
----------------------------- */
if ($response !== false && empty($curlError) && ($httpCode == 200 || $httpCode == 302)) {
    header("Location: index.html?toast=success&msg=" . urlencode("Enquiry submitted successfully"));
    exit;
} else {
    header("Location: index.html?toast=success&msg=" . urlencode("Enquiry saved in database, but Google Sheet failed"));
    exit;
}
?>