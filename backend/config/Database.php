<?php
class Database {
    // Update these credentials for your live deployment later
    private $host = "localhost";
    private $db_name = "blood_bank";
    private $username = "root"; 
    private $password = "admin";     
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // Strict error reporting
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode(["error" => "Database connection error."]);
            exit;
        }
        return $this->conn;
    }
}
?>