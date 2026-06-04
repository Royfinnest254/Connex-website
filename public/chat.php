<?php
/**
 * Connex Technologies - AI Chat Handler
 * Secure Proxy for DeepSeek API on Namecheap cPanel
 */

session_start();
header('Content-Type: application/json');

// 1. Rate Limiting
if (isset($_SESSION['last_chat_request']) && time() - $_SESSION['last_chat_request'] < 3) {
    http_response_code(429);
    echo json_encode(['error' => 'System processing request. Please wait.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
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
    if (!file_exists($env_file)) {
        $env_file = __DIR__ . '/.env';
    }
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
    echo json_encode(['error' => 'Server configuration error.']);
    exit;
}

// 2. System prompt with strict length limits
$system_prompt = <<<TEXT
You are the Virtual Briefing Representative of Connex Technologies. Explain Connex to bank executives, fintech founders, and investors in a direct and highly concise manner.

CONCISE RESPONSE CONSTRAINT:
- Your response must be extremely brief. Limit your answer to a maximum of 2 short paragraphs (no more than 2 to 3 sentences per paragraph).
- Use clear spacing and do not build large walls of text.

KEY PRINCIPLES OF CONNEX:
- Slogan: One system. Complete data. Provable handoffs.
- Sits in the handoff gap between financial institutions to coordinate payments.
- Addresses two primary problems in Kenyan payments:
  1. The Data Gap: Core banking platforms (running legacy ISO 8583) drop 35+ compliance and structured address fields when translating messages.
  2. The Evidence Gap: Banks maintain separate logs, meaning disputes (like reconciliation anomalies) take weeks of manual coordination to resolve.
- Sits in the middle as a coordination layer that:
  1. ENRICHES data to arrive complete and ISO 20022 compliant (generating validated pacs.008.001.08 XML messages).
  2. PROVES the handoff cryptographically so disputes resolve in seconds instead of weeks.

TECHNICAL ARCHITECTURE & GITHUB SOURCE DETAILS (Royfinnest254/CONNEX):
- Gateway (written in Go): Core coordinator that parses ISO 8583, runs the rules engine, validates against XSD, and orchestrates consensus.
- 3 Witness Nodes Alpha, Beta, Gamma (written in Go): Ports 8091-8093. Each manages its own Ed25519 keypair. Requires 2-of-3 quorum consensus.
- Storage: SQLite ledger enforced by DB-level BEFORE UPDATE and BEFORE DELETE triggers to guarantee append-only immutability.
- Independent Verifier (written in Python): Recomputes hashes and verifies signatures using the PyNaCl library.
- Cryptography: Ed25519 (RFC 8032) for fast, deterministic 64-byte signatures and 32-byte keys. SHA-256 for secure hash chaining (linking each block to the previous link).
- Performance Benchmarks: End-to-end P50 latency is 8 to 12 ms, P95 is 15 to 20 ms, and P99 is 25 to 35 ms. Throughput is 250 to 500 transactions per second (TPS).

FOUNDING BIOGRAPHY:
- Connex Technologies was founded by Roy Chumba, a Kenyan systems engineer.
- Roy is a self-taught programmer with deep experience in building high-throughput transactional and distributed systems infrastructure.
- He founded Connex to address the coordination gaps, data loss, and log mismatch delays across East African payment networks.
- Never share personal information such as Roy's age, specific academic results, high school achievements, or personal hobbies. Keep all details strictly focused on his professional capacity as the founder and architect of Connex.
- Do not mention or mix Clean Heights Initiative (CHI) or other unrelated freelance work.

CRITICAL FORMATTING INSTRUCTIONS:
- Do NOT use asterisks (*) anywhere in your response for styling or formatting. No markdown bold/italic elements.
- Do NOT use em-dashes (—) or en-dashes (–) anywhere. Always use standard hyphens (-) or standard punctuation instead.
- Speak confidently, directly, and honestly. Do not add polite conversational padding, introductions, or concluding filler (e.g. do not say "Hi there!", "Hope this helps!", or "Let me know if you need anything else"). Get straight to the answer.
TEXT;

$messages = $data['messages'];
array_unshift($messages, ['role' => 'system', 'content' => $system_prompt]);

$url = "https://api.deepseek.com/chat/completions";
$post_data = [
    'model' => 'deepseek-chat',
    'messages' => $messages,
    'temperature' => 0.2,
    'max_tokens' => 400
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
    echo json_encode(['error' => 'Failed to connect to AI engine.']);
    exit;
}

$response_data = json_decode($response, true);
$reply = $response_data['choices'][0]['message']['content'] ?? '';

// Ensure absolute absence of asterisks and em/en dashes
$reply = str_replace(['*', '—', '–'], ['', ' - ', '-'], $reply);

$_SESSION['last_chat_request'] = time();

echo json_encode(['message' => $reply]);
?>
