DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews (
    rating INT DEFAULT 10,
    name TEXT,
    description TEXT,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
