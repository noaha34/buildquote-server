DROP TABLE IF EXISTS Programmers;
CREATE TABLE Programmers (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    gradyr INT DEFAULT 0,
    skills TEXT DEFAULT "web development",
    passions TEXT DEFAULT "saving the trees",
    langs TEXT DEFAULT "python",
    experience TEXT DEFAULT "3 years of college",
    picture TEXT DEFAULT "www.minorityprogrammers.org/img/kush.jpg",
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
