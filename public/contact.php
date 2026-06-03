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

$formatted_message = nl2br($message);

// 1. Email to Roy Chumba
$email_subject = "[Connex Contact] Briefing Request: $institution";
$email_content = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #0a0a0b; font-family: Calibri, 'Segoe UI', Arial, sans-serif; color: #f2f1ec;">
    <div style="max-width: 580px; margin: 0 auto; background-color: #101012; border: 1px solid rgba(242,241,236,0.12); border-radius: 16px; padding: 44px 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        
        <!-- Header -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px; width: 100%;">
            <tr>
                <td style="vertical-align: middle;">
                    <span style="color: #00869B; text-transform: uppercase; font-size: 11px; letter-spacing: 0.18em; font-weight: 600; display: block; margin-bottom: 4px;">Inbound request</span>
                    <h2 style="font-family: Georgia, serif; font-size: 22px; font-weight: 800; color: #f2f1ec; margin: 0; text-transform: uppercase; letter-spacing: -0.02em;">Briefing Request</h2>
                </td>
                <td style="vertical-align: middle; text-align: right;">
                    <img src="https://connextechnologies.org/logo.png" alt="Connex" style="height: 34px; width: 34px; display: inline-block;">
                </td>
            </tr>
        </table>

        <!-- Details Grid -->
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 15px;">
            <tr style="border-bottom: 1px solid rgba(242,241,236,0.08);">
                <td style="padding: 12px 0; color: #a7a6a0; width: 130px;">Name</td>
                <td style="padding: 12px 0; color: #f2f1ec; font-weight: 600;">$name</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(242,241,236,0.08);">
                <td style="padding: 12px 0; color: #a7a6a0;">Institution</td>
                <td style="padding: 12px 0; color: #f2f1ec; font-weight: 600;">$institution</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(242,241,236,0.08);">
                <td style="padding: 12px 0; color: #a7a6a0;">Role</td>
                <td style="padding: 12px 0; color: #f2f1ec;">$role</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(242,241,236,0.08);">
                <td style="padding: 12px 0; color: #a7a6a0;">Email</td>
                <td style="padding: 12px 0; color: #00869B; font-weight: 600;"><a href="mailto:$email" style="color: #00869B; text-decoration: none;">$email</a></td>
            </tr>
        </table>

        <!-- Message Details -->
        <span style="color: #6c6b66; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Message Details</span>
        <div style="background-color: #16161a; border-left: 3px solid #C09E5A; border-radius: 6px; padding: 20px; font-size: 15px; line-height: 1.6; color: #f2f1ec; white-space: pre-wrap; font-family: inherit;">$formatted_message</div>

    </div>
</body>
</html>
HTML;

$headers = "From: $website_name <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// 2. Email to Visitor
$visitor_subject = "Thank you for contacting Connex Technologies";
$visitor_content = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #0a0a0b; font-family: Calibri, 'Segoe UI', Arial, sans-serif; color: #f2f1ec;">
    <div style="max-width: 580px; margin: 0 auto; background-color: #101012; border: 1px solid rgba(242,241,236,0.12); border-radius: 16px; padding: 44px 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
        
        <!-- Logo Header -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 38px;">
            <tr>
                <td style="vertical-align: middle; padding-right: 12px;">
                    <img src="https://connextechnologies.org/logo.png" alt="Connex" style="height: 38px; width: 38px; display: block;">
                </td>
                <td style="vertical-align: middle;">
                    <span style="font-family: Georgia, serif; font-size: 20px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #f2f1ec;">Connex</span>
                </td>
            </tr>
        </table>

        <!-- Greeting -->
        <h2 style="font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #f2f1ec; margin-top: 0; margin-bottom: 24px; line-height: 1.25;">Dear $name,</h2>

        <!-- Message Body -->
        <p style="font-size: 16px; line-height: 1.6; color: #a7a6a0; margin-bottom: 20px; font-weight: 400;">
            Thank you for reaching out to Connex Technologies. We have successfully received your request for an institutional briefing regarding <strong style="color: #f2f1ec;">$institution</strong>.
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #a7a6a0; margin-bottom: 32px; font-weight: 400;">
            Our team is reviewing the integration details you provided. We will follow up with you shortly to coordinate a technical briefing and discuss how the Connex payment coordination layer can support your operations.
        </p>

        <!-- Divider -->
        <hr style="border: none; border-top: 1px solid rgba(242,241,236,0.1); margin-bottom: 28px;">

        <!-- Signoff / Footer -->
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
            <tr>
                <td style="vertical-align: top; font-size: 14px; line-height: 1.5; color: #a7a6a0;">
                    <span style="color: #6c6b66; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">Sender</span>
                    <strong style="color: #f2f1ec; font-size: 16px; font-family: Georgia, serif; display: block; margin-bottom: 2px;">Roy Chumba</strong>
                    <span style="color: #C09E5A; font-weight: 600; font-size: 13px; display: block; margin-bottom: 4px;">Founder & CEO</span>
                    <span style="color: #00869B; font-weight: 500; font-size: 13px; display: block;">Connex Technologies</span>
                </td>
                <td style="vertical-align: bottom; text-align: right; font-size: 12px; color: #6c6b66;">
                    <a href="https://connextechnologies.org" style="color: #a7a6a0; text-decoration: none; border-bottom: 1px solid rgba(242,241,236,0.2); padding-bottom: 2px;">connextechnologies.org</a>
                </td>
            </tr>
        </table>

    </div>
</body>
</html>
HTML;

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
