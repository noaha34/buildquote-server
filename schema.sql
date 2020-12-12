DROP TABLE IF EXIST Programmers
CREATE TABLE Programmers(
    id SERIAL PRIMARY KEY,
    gradyr INT DEFAULT 0,
    skills TEXT,
    passions TEXT DEFAULT, 'Not passionate about things',
    langssenum ENUM('html', 'css', 'javascript', 'java', 'python', 'C', 'C++', 'Ruby'),
    skillsenum ENUM('Data Science', 'Machine Learning', 'Artificial Intelligence', 'Front End Web Development',
                     'Full Stack Developer', 'Databases', 'Search Engine Optimization', 'Systems Design'),
    experience TEXT DEFAULT 'No experience',
    picture TEXT DEFAULT 'https://www.minorityprogrammers.org/img/rosie.jpg',
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
