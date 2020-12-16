DROP TABLE IF EXISTS Programmers;
CREATE TABLE Programmers (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    gradyr INT DEFAULT 0,
    skills TEXT,
    passions TEXT,
    langs TEXT,
    experience TEXT,
    picture TEXT,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
