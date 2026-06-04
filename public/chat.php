<?php
/**
 * Connex Technologies - AI Chat Handler
 * Secure Proxy for DeepSeek API on Namecheap cPanel
 */

session_start();
header('Content-Type: application/json');

// 1. Rate Limiting: Max 1 request per 3 seconds per Session to prevent API abuse
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

// 2. Parse request payload
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['messages']) || !is_array($data['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid message payload.']);
    exit;
}

// 3. Load Environment Variables from root .env
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

// 4. Construct System Instruction Prompt
$system_prompt = <<<TEXT
You are the Connex Technologies Virtual Briefing Assistant. Your purpose is to explain Connex to bank executives, fintech founders, regulators, and investors.
Your tone must be professional, direct, clear, and confident. Do not add conversational fluff, pleasantries, or unnecessary intro/outro filler. Speak like a senior fintech systems architect.

KEY PRINCIPLES OF CONNEX:
- Slogan: One system. Complete data. Provable handoffs.
- Slogan: Certainty for everyone.
- Sits alongside existing payment systems without touching the payment flow (alongside, not in-line). If offline, payments continue.
- Sits in the handoff gap between financial institutions.
- Addresses two primary problems in Kenyan payments:
  1. The Data Gap: Core banking platforms (running legacy ISO 8583) drop 35+ compliance and structured address fields when translating messages.
  2. The Evidence Gap: Banks maintain separate logs, meaning disputes (like reconciliation anomalies) take weeks of manual coordination to resolve.
- Sits in the middle as a coordination layer that:
  1. ENRICHES data to arrive complete and ISO 20022 compliant.
  2. PROVES the handoff cryptographically so disputes resolve in seconds instead of weeks.

THREE-LAYER ARCHITECTURE:
1. Data Enrichment Layer: Automatically fills in missing compliance fields, purpose codes, and structured addresses using a local rules engine and local AI models (XGBoost for purpose codes, DistilBERT for address parsing, KYC database lookups).
2. Coordination Proof Layer: Hash of the enriched message is sent to 3 independent witness nodes in parallel. Uses Ed25519 signatures, 2-of-3 quorum consensus, and SHA-256 hash chaining to generate an immutable, tamper-evident proof bundle.
3. Delivery Layer: Forwards compliant ISO 20022 message to KEPSS/PesaLink/RTGS, commits proof to append-only PostgreSQL database, and logs metadata for audits.

TECHNOLOGY STACK:
- Core Consensus: Go (sub-10ms signature verification, parallel execution channels).
- AI Microservices: Python (local XGBoost, local DistilBERT running over Unix sockets for latency and data privacy).
- API Routing & Authentication: Node.js.
- Storage: PostgreSQL (using immutable rules at database level).
- Frontend Portal: React + Vite.

FOUNDER STORY:
- Founded and built by Roy Chumba, a 19-year-old self-taught developer and three-time Kenya Science and Engineering Fair winner.
- Connex is based in Kenya.

COMPETITIVE MOAT:
1. Structural Neutrality: Connex earns zero revenue from transaction volume, ensuring absolute neutral witness credibility.
2. Kenyan AI Training: Models trained specifically on local transaction patterns, addresses, and business profiles.
3. Cryptographic Proof: Verifiable multi-node consensus proves every translation decision.

CRITICAL INSTRUCTIONS FOR RESPONSE FORMATTING:
- Do NOT use asterisks (*) anywhere in your response for styling or formatting. No markdown bold/italic elements like **text** or *text*.
- If you need to emphasize a point or create a heading, write the heading in ALL CAPS and use double line breaks for spacing.
- Keep sentences concise, clear, and easy to read for non-technical business leaders.
TEXT;

// Prepend system prompt to the message chain
$messages = $data['messages'];
array_unshift($messages, ['role' => 'system', 'content' => $system_prompt]);

// 5. Send POST to DeepSeek Chat Completions API
$url = "https://api.deepseek.com/chat/completions";
$post_data = [
    'model' => 'deepseek-chat',
    'messages' => $messages,
    'temperature' => 0.2,
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

// 6. Guarantee no asterisks remain in the response string (Roy constraint)
$reply = str_replace('*', '', $reply);

$_SESSION['last_chat_request'] = time();

echo json_encode(['message' => $reply]);
?>
