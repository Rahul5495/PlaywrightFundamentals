-- Seed for 289_DDT_MYSQL.spec.ts
--   mysql -u root -p < tests/19_Data_Driven_Testing/test-data/seed.sql
-- Same seven rows as login-data.csv / .xlsx / .yaml, so every reader in
-- module 19 is driving the identical dataset.

CREATE DATABASE IF NOT EXISTS playwright_ddt
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE playwright_ddt;

DROP TABLE IF EXISTS login_data;
CREATE TABLE login_data (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  description    VARCHAR(100) NOT NULL,
  username       VARCHAR(255) NOT NULL,
  password       VARCHAR(255) NOT NULL,
  should_pass    TINYINT(1)   NOT NULL DEFAULT 0,
  expected_error VARCHAR(255) NOT NULL DEFAULT '',
  is_active      TINYINT(1)   NOT NULL DEFAULT 1
);

INSERT INTO login_data
  (description, username, password, should_pass, expected_error, is_active)
VALUES
  ('valid credentials',    'admin@gamil.com',        'admin123',  1, '',                    1),
  ('invalid password',     'admin@gamil.com',        'wrongpass', 0, 'Invalid credentials', 1),
  ('empty username',       '',                       'admin123',  0, 'Username is required',1),
  ('empty password',       'admin@gamil.com',        '',          0, 'Password is required',1),
  ('locked account',       'locked_user@gamil.com',  'pass123',   0, 'Account is locked',   1),
  ('special chars',        'admin@gamil.com',        'p@$$w0rd!', 1, '',                    1),
  ('SQL injection attempt',"admin' OR '1'='1",       'password',  0, 'Invalid credentials', 1),
  -- is_active = 0, so the reader's WHERE clause filters this one out.
  ('retired case',         'old@gamil.com',          'old',       0, 'Deprecated',          0);

SELECT CONCAT('Seeded ', COUNT(*), ' active rows') AS result
FROM login_data WHERE is_active = 1;
