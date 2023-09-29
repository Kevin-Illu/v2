-- Creación de la tabla 'user'
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
INSERT INTO user (name, email)
VALUES ('system', 'sysKVNsys@gmail.com');
-- Creación de la tabla 'colors'
CREATE TABLE IF NOT EXISTS color (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  hex_value VARCHAR(7) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
-- Creación de la tabla 'state'
CREATE TABLE IF NOT EXISTS state (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  color_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (color_id) REFERENCES color(id)
);
-- Inserts para la tabla 'state'
INSERT INTO state (name, description, color_id)
VALUES ("Active", "Things are happening!", 10),
  ("To-do", "Things to do", 20),
  ("Waiting", "Waiting for something else", 30),
  ("Canceled", "Never going to happen", 40),
  ("Deferred", "Put off until tomorrow", 50),
  ("Completed", "Things are done!", 60);
-- Creación de la tabla 'priorities'
CREATE TABLE IF NOT EXISTS priorities (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  color_id INTEGER NOT NULL,
  FOREIGN KEY (color_id) REFERENCES color(id)
);
-- Inserts para la tabla 'priorities'
INSERT INTO priorities (name, color_id)
VALUES ('High Priority', 10),
  ('Medium Priority', 20),
  ('Low Priority', 30);
-- Creación de la tabla 'labels'
CREATE TABLE IF NOT EXISTS labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  color_id INTEGER NOT NULL,
  FOREIGN KEY (color_id) REFERENCES color(id)
);
-- Inserts para la tabla 'labels'
INSERT INTO labels (name, color_id)
VALUES ('Work', 10),
  ('Personal', 20),
  ('Shopping', 30),
  ('Health', 40),
  ('Home', 50),
  ('Study', 60);
-- Creación de la tabla 'todos'
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  state_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NULL,
  archived BOOLEAN NOT NULL DEFAULT 0,
  created_date DATE NOT NULL,
  created_time TIME NOT NULL,
  color_id INTEGER NOT NULL,
  FOREIGN KEY (color_id) REFERENCES color(id) FOREIGN KEY (state_id) REFERENCES state(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
-- Creación de la tabla 'todo_labels'
CREATE TABLE IF NOT EXISTS todo_labels (
  todo_id INTEGER NOT NULL,
  label_id INTEGER NOT NULL,
  PRIMARY KEY (todo_id, label_id),
  FOREIGN KEY (todo_id) REFERENCES todos(id),
  FOREIGN KEY (label_id) REFERENCES labels(id)
);
-- Creación de la tabla 'todo_priorities'
CREATE TABLE IF NOT EXISTS todo_priorities (
  todo_id INTEGER NOT NULL,
  priority_id INTEGER NOT NULL,
  PRIMARY KEY (todo_id, priority_id),
  FOREIGN KEY (todo_id) REFERENCES todos(id),
  FOREIGN KEY (priority_id) REFERENCES priorities(id)
);
-- Creación de la tabla 'activity_log'
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
