-- Create database if not exists
CREATE DATABASE IF NOT EXISTS blood_bank;
USE blood_bank;

-- 1. Unified Authentication Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('hospital', 'receiver') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Hospital Profiles
CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Receiver Profiles
CREATE TABLE receivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Blood Samples (Inventory)
CREATE TABLE blood_samples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    status ENUM('available', 'exhausted') DEFAULT 'available',
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
    UNIQUE KEY unique_hospital_blood (hospital_id, blood_group)
) ENGINE=InnoDB;

-- 5. Blood Requests
CREATE TABLE blood_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receiver_id INT NOT NULL,
    sample_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (receiver_id) REFERENCES receivers(id) ON DELETE CASCADE,
    FOREIGN KEY (sample_id) REFERENCES blood_samples(id) ON DELETE CASCADE,
    UNIQUE KEY unique_request (receiver_id, sample_id)
) ENGINE=InnoDB;