<?php
class BloodSample {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function addSample($hospital_id, $blood_group) {
        // ON CONFLICT prevents duplicate rows for the same hospital/blood group combo (PostgreSQL syntax)
        $query = "INSERT INTO blood_samples (hospital_id, blood_group, status) 
                  VALUES (:hid, :bg, 'available')
                  ON CONFLICT (hospital_id, blood_group) DO UPDATE SET status = 'available'";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([':hid' => $hospital_id, ':bg' => $blood_group]);
    }

    public function getAvailableSamples() {
        $query = "SELECT bs.id as sample_id, bs.blood_group, h.hospital_name 
                  FROM blood_samples bs 
                  JOIN hospitals h ON bs.hospital_id = h.id 
                  WHERE bs.status = 'available'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
