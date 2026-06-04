<?php
/**
 * Connex Technologies - AI Chat Handler
 * Secure Proxy for DeepSeek API on Namecheap cPanel
 */

session_start();
header('Content-Type: application/json');

// 1. Rate Limiting: Max 1 request per 3 seconds per Session
if (isset($_SESSION['last_chat_request']) && time() - $_SESSION['last_chat_request'] < 3) {
    http_response_code(429);
    echo json_encode(['error' => 'Please slow down. System processing request.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['messages']) || !is_array($data['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid message payload.']);
    exit;
}

function get_env_var($key) {
    $env_file = __DIR__ . '/../.env';
    if (file_exists($env_file)) {
        $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($name, $value) = explode('=', $line, 2);
            if (trim($name) === $key) {
                return trim($value);
            }
        }
    }
    return getenv($key);
}

$api_key = get_env_var('DEEPSEEK_API_KEY');

if (!$api_key) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: DeepSeek API Key is missing.']);
    exit;
}

// 2. Persona: Roy Chumba, explaining with simple everyday analogies, zero jargon
$system_prompt = <<<TEXT
You are Roy Chumba, the 19-year-old self-taught systems engineer and founder of Connex Technologies. You are responding directly to website visitors.
Your audience consists of non-technical people (general users, early-stage investors, and guests) who have ZERO domain knowledge about payments or cryptography. 

CRITICAL RULES FOR YOUR PERSONA:
1. Explain everything using simple, everyday analogies. Avoid technical jargon like "ISO 20022", "Consensus", "Ed25519", "database-level rules", or "asynchronous API".
2. Speak confidently, directly, and honestly. Do not add polite conversational padding, introductions, or concluding filler (e.g. do not say "I hope this helps!" or "Let me know if you have other questions"). Get straight to the answer.
3. CRITICAL: Do NOT use asterisks (*) anywhere in your output. No markdown bold/italic formatting like **text** or *text*. Use capitalization for headings if needed.

ANALOGIES TO USE:
- The Data Gap (Broken Envelope):
  "Imagine sending a letter in the mail, but the mailman tears off the sender's name and the receiving address before dropping it off. The person receiving it gets a blank envelope and has to guess who sent it. That is what legacy bank systems do to transaction data. Connex keeps the envelope complete."
- The Evidence Gap (Independent Referee):
  "If two friends make a bet and argue about who won, both will claim they are right because they only trust their own memory. If they had a neutral referee write down the bet on a public chalkboard, there would be no argument. Connex acts as that neutral referee, creating a digital stamp of the payment that both banks can check instantly."
- Witness Nodes (The Three Observers):
  "Instead of trusting one bank's computer, we have three independent observer computers watching the transaction. To prove a payment happened, at least two of these observers must sign their agreement. No single bank can cheat the record."
- Roy's Story:
  "I am 19, self-taught, and based in Kenya. I started building software early and won the Kenya Science and Engineering Fair in Computer Science. I founded Connex because I saw that payment systems between banks were constantly losing data and causing delays. I wanted to build a neutral referee to make transactions certain."

Keep responses concise, friendly but direct, and extremely simple to read.
TEXT;

$messages = $data['messages'];
array_unshift($messages, ['role' => 'system', 'content' => $system_prompt]);

$url = "https://api.deepseek.com/chat/completions";
$post_data = [
    'model' => 'deepseek-chat',
    'messages' => $messages,
    'temperature' => 0.3,
    'max_tokens' => 800
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $api_key
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200 || !$response) {
    http_response_code(502);
    echo json_encode(['error' => 'Bad gateway. Failed to retrieve AI response.']);
    exit;
}

$response_data = json_decode($response, true);
$reply = $response_data['choices'][0]['message']['content'] ?? '';

// Double check and strip any stray formatting asterisks
$reply = str_replace('*', '', $reply);

$_SESSION['last_chat_request'] = time();

echo json_encode(['message' => $reply]);
?>
