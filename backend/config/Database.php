<?php
class Database {
    // These credentials should be set in your Render environment variables
    private $host;
    private $db_name;
    private $username; 
    private $password;     
    private $port;
    public $conn;

    public function __construct() {
        // Here is where your Supabase URL goes for local testing!
        // When deployed to Render, it will use the Render Environment Variable instead.
        $fallback_url = "postgresql://postgres:blood_bank2026@db.idqfxengfnrgzknpxwyd.supabase.co:5432/postgres";
        $database_url = getenv('DATABASE_URL') ?: $fallback_url;

        if ($database_url) {
            $parsed = parse_url($database_url);
            $this->host = $parsed['host'];
            $this->port = $parsed['port'] ?? "5432";
            $this->db_name = ltrim($parsed['path'], '/');
            $this->username = $parsed['user'];
            $this->password = $parsed['pass'];
        } else {
            $this->host = getenv('DB_HOST') ?: "localhost";
            $this->db_name = getenv('DB_NAME') ?: "blood_bank";
            $this->username = getenv('DB_USER') ?: "postgres";
            $this->password = getenv('DB_PASS') ?: "admin";
            $this->port = getenv('DB_PORT') ?: "5432";
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            // Updated to use pgsql for PostgreSQL (Supabase)
            $dsn = "pgsql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            // Strict error reporting
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode(["error" => "Database connection error.", "details" => $exception->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}
?>