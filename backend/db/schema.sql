-- 1. Unified Authentication Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('hospital', 'receiver')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Hospital Profiles
CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    hospital_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Receiver Profiles
CREATE TABLE receivers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(10) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Blood Samples (Inventory)
CREATE TABLE blood_samples (
    id SERIAL PRIMARY KEY,
    hospital_id INT NOT NULL,
    blood_group VARCHAR(10) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'exhausted')),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
    UNIQUE (hospital_id, blood_group)
);

-- 5. Blood Requests
CREATE TABLE blood_requests (
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL,
    sample_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    FOREIGN KEY (receiver_id) REFERENCES receivers(id) ON DELETE CASCADE,
    FOREIGN KEY (sample_id) REFERENCES blood_samples(id) ON DELETE CASCADE,
    UNIQUE (receiver_id, sample_id)
);