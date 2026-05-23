<?php
/**
 * Connex Technologies - Contact Form Handler
 * Designed for Namecheap cPanel Hosting
 */

session_start();
header('Content-Type: application/json');

// 1. Rate Limiting: Max 1 request per 10 seconds per Session
if (isset($_SESSION['last_contact_submit']) && time() - $_SESSION['last_contact_submit'] < 10) {
    http_response_code(429);
    echo json_encode(['error' => 'Please wait a moment before submitting again.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Please use POST.']);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    $data = $_POST;
}

$to_email = "info@connextechnologies.org";
$from_email = "info@connextechnologies.org";
$website_name = "Connex Technologies";

$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$institution = isset($data['institution']) ? strip_tags(trim($data['institution'])) : '';
$role = isset($data['role']) ? strip_tags(trim($data['role'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : 'No message provided';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

// 1. Email to Roy Chumba
$email_subject = "[Connex Contact] Briefing Request: $institution";
$email_content = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body style=\"margin: 0; padding: 30px; background-color: #0b0f19; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #ffffff;\">
    <div style=\"max-width: 600px; margin: 0 auto; background: #111827; padding: 40px; border: 1px solid #1f2937; border-radius: 8px;\">
        <h1 style=\"color: #00ff88; font-size: 24px; margin-top: 0;\">Institutional Briefing Request</h1>
        <p style=\"color: #9ca3af; font-size: 16px;\">A new contact inquiry has been submitted.</p>
        <hr style=\"border: none; border-top: 1px solid #374151; margin: 25px 0;\">
        <p><strong>Name:</strong> $name</p>
        <p><strong>Institution:</strong> $institution</p>
        <p><strong>Role:</strong> $role</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Details:</strong></p>
        <div style=\"background: #1f2937; padding: 20px; border-left: 4px solid #00ff88; border-radius: 4px; margin-top: 10px; color: #e5e7eb; white-space: pre-wrap;\">" . nl2br($message) . "</div>
    </div>
</body>
</html>
";

$headers = "From: $website_name <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// 2. Email to Visitor
$visitor_subject = "Briefing Request - Connex";
$visitor_content = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style=\"margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000;\">
    <div style=\"max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-top: 3px solid #000000; border-radius: 8px; padding: 40px 35px;\">
        
        <!-- Header -->
        <div style=\"margin-bottom: 35px;\">
            <span style=\"color: #000000; font-size: 22px; font-weight: 800; letter-spacing: 1.5px;\">CONNEX.</span>
        </div>

        <p style=\"font-size: 16px; color: #000000; font-weight: 600; margin-bottom: 25px;\">Hey $name,</p>

        <p style=\"font-size: 15px; line-height: 1.7; color: #333333; margin-bottom: 20px;\">
            Got your briefing request for $institution.
        </p>

        <p style=\"font-size: 15px; line-height: 1.7; color: #333333; margin-bottom: 40px;\">
            Just wanted to say thanks for reaching out. I have your details and will follow up with you shortly to connect.
        </p>

        <p style=\"font-size: 15px; color: #000000; margin-bottom: 20px;\">Best,</p>
        
        <!-- Signature -->
        <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width: 100%; border-top: 1px solid #e5e5e5; padding-top: 25px;\">
            <tr>
                <td style=\"vertical-align: top; padding-right: 20px;\">
                    <img src=\"https://connextechnologies.org/logo-black.svg\" alt=\"Connex Logo\" style=\"height: 42px; display: block;\">
                </td>
                <td style=\"font-size: 13px; color: #666666; line-height: 1.5;\">
                    <strong style=\"color: #000000; font-size: 15px;\">Roy Chumba</strong><br>
                    Founder & CEO<br>
                    <span style=\"color: #000000; font-weight: 600;\">Connex Technologies</span><br>
                    <a href=\"https://connextechnologies.org\" style=\"color: #666666; text-decoration: none; font-size: 12px;\">connextechnologies.org</a>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
";

$visitor_headers = "From: $website_name <$from_email>\r\n";
$visitor_headers .= "Reply-To: $from_email\r\n";
$visitor_headers .= "MIME-Version: 1.0\r\n";
$visitor_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($to_email, $email_subject, $email_content, $headers, "-f$from_email")) {
    mail($email, $visitor_subject, $visitor_content, $visitor_headers, "-f$from_email");
    $_SESSION['last_contact_submit'] = time(); // Record successful submission
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Server mailing error']);
}
?>
