INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES
('admin@university.edu.ph', '$2a$10$zP3plSjyRB7SChe.auycZuHvkIPYoA/54q1KnPbhz5ebuYRLGzQLO', 'admin', 'Diana', 'Evale'),
('faculty@university.edu.ph', '$2a$10$spAalwqHSsGAiDooCXIJHeUVhkdTqLcz0xiGw.Jschtn4pKa/Eigu', 'faculty', 'Juan', 'Santos')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role), first_name = VALUES(first_name), last_name = VALUES(last_name);

INSERT INTO curriculum (program_name, year_level, semester, course_description, learning_outcomes) VALUES
('Information Technology', 3, '1st Semester', 'Bachelor of Science in Information Technology', 'Apply IT concepts and principles'),
('Computer Science', 3, '1st Semester', 'Bachelor of Science in Computer Science', 'Design algorithms and systems'),
('Computer Engineering', 3, '1st Semester', 'Bachelor of Science in Computer Engineering', 'Design and analyze computing systems');
