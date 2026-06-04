<?php
class User {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($data) {
        try {
            // Check for existing email
            $stmt = $this->conn->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->execute([':email' => $data->email]);
            if ($stmt->rowCount() > 0) {
                return ["success" => false, "message" => "Email already exists."];
            }

            $this->conn->beginTransaction();

            $hash = password_hash($data->password, PASSWORD_BCRYPT);
            $stmt = $this->conn->prepare("INSERT INTO users (email, password, role) VALUES (:email, :password, :role)");
            $stmt->execute([':email' => $data->email, ':password' => $hash, ':role' => $data->role]);
            
            $userId = $this->conn->lastInsertId();

            if ($data->role === 'hospital') {
                $stmt = $this->conn->prepare("INSERT INTO hospitals (user_id, hospital_name, address) VALUES (:uid, :name, :addr)");
                $stmt->execute([':uid' => $userId, ':name' => $data->hospital_name, ':addr' => $data->address]);
            } else {
                $stmt = $this->conn->prepare("INSERT INTO receivers (user_id, receiver_name, blood_group) VALUES (:uid, :name, :bg)");
                $stmt->execute([':uid' => $userId, ':name' => $data->receiver_name, ':bg' => $data->blood_group]);
            }

            $this->conn->commit();
            return ["success" => true, "message" => "Registration successful."];
        } catch (Exception $e) {
            $this->conn->rollBack();
            return ["success" => false, "message" => "Registration failed: " . $e->getMessage()];
        }
    }

    public function login($email, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                // Fetch specific profile data
                $profileData = [];
                if ($row['role'] === 'hospital') {
                    $pStmt = $this->conn->prepare("SELECT id as hospital_id, hospital_name FROM hospitals WHERE user_id = :uid");
                    $pStmt->execute([':uid' => $row['id']]);
                    $profileData = $pStmt->fetch(PDO::FETCH_ASSOC);
                } else {
                    $pStmt = $this->conn->prepare("SELECT id as receiver_id, receiver_name, blood_group FROM receivers WHERE user_id = :uid");
                    $pStmt->execute([':uid' => $row['id']]);
                    $profileData = $pStmt->fetch(PDO::FETCH_ASSOC);
                }

                unset($row['password']); // Never send password back
                return ["success" => true, "user" => array_merge($row, $profileData)];
            }
        }
        return ["success" => false, "message" => "Invalid email or password."];
    }
}
?>