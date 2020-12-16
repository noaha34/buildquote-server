DROP TABLE IF EXISTS Projects;
CREATE TABLE Projects (
    budget INT DEFAULT 0,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    contact_info TEXT,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
