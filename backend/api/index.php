<?php
// Handle CORS and preflight requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/Database.php';
require_once '../models/User.php';
require_once '../models/BloodSample.php';
require_once '../models/Request.php';

$database = new Database();
$db = $database->getConnection();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

// ROUTE: POST /api/register
if (strpos($uri, '/register') !== false && $method === 'POST') {
    $user = new User($db);
    $result = $user->register($data);
    if ($result['success']) {
        http_response_code(201);
        echo json_encode($result);
    } else {
        http_response_code(400);
        echo json_encode(["error" => $result['message']]);
    }
    exit;
}

// ROUTE: POST /api/login
if (strpos($uri, '/login') !== false && $method === 'POST') {
    $user = new User($db);
    $result = $user->login($data->email, $data->password);
    if ($result['success']) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(401);
        echo json_encode(["error" => $result['message']]);
    }
    exit;
}

// ROUTE: GET /api/samples
if (strpos($uri, '/samples') !== false && $method === 'GET') {
    $bloodSample = new BloodSample($db);
    echo json_encode($bloodSample->getAvailableSamples());
    exit;
}

// ROUTE: POST /api/add-blood (Hospital only)
if (strpos($uri, '/add-blood') !== false && $method === 'POST') {
    $bloodSample = new BloodSample($db);
    if ($bloodSample->addSample($data->hospital_id, $data->blood_group)) {
        http_response_code(201);
        echo json_encode(["message" => "Sample added."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add sample."]);
    }
    exit;
}

// ROUTE: POST /api/request-sample (Receiver only)
if (strpos($uri, '/request-sample') !== false && $method === 'POST') {
    $request = new Request($db);
    $result = $request->createRequest($data->receiver_id, $data->sample_id);
    if ($result['success']) {
        http_response_code(201);
        echo json_encode($result);
    } else {
        http_response_code(400);
        echo json_encode(["error" => $result['message']]);
    }
    exit;
}

// ROUTE: GET /api/requests (Hospital only)
if (strpos($uri, '/requests') !== false && $method === 'GET') {
    $hospital_id = $_GET['hospital_id'] ?? null;
    if ($hospital_id) {
        $request = new Request($db);
        echo json_encode($request->getRequestsForHospital($hospital_id));
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Hospital ID required."]);
    }
    exit;
}

// Fallback
http_response_code(404);
echo json_encode(["error" => "Endpoint not found."]);
?>