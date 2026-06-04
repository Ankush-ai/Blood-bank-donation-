<?php
class Request {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createRequest($receiver_id, $sample_id) {
        try {
            $query = "INSERT INTO blood_requests (receiver_id, sample_id) VALUES (:rid, :sid)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([':rid' => $receiver_id, ':sid' => $sample_id]);
            return ["success" => true, "message" => "Sample requested successfully."];
        } catch (PDOException $e) {
            // Error 23000 is a constraint violation (e.g., UNIQUE key trigger for duplicate requests)
            if ($e->getCode() == 23000) {
                return ["success" => false, "message" => "You have already requested this sample."];
            }
            return ["success" => false, "message" => "Database error."];
        }
    }

    public function getRequestsForHospital($hospital_id) {
        $query = "SELECT req.id, r.receiver_name, bs.blood_group, req.status 
                  FROM blood_requests req
                  JOIN receivers r ON req.receiver_id = r.id
                  JOIN blood_samples bs ON req.sample_id = bs.id
                  WHERE bs.hospital_id = :hid";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([':hid' => $hospital_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>