/*
 Creación de la tabla 'user'
 */
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
/*

 table states and
 default values

 */
CREATE TABLE IF NOT EXISTS states (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);
INSERT INTO states (name, description)
VALUES ("Active", "Things are happening!"),
  ("To-do", "Things to do"),
  ("Waiting", "Waiting for something else"),
  ("Canceled", "Never going to happen"),
  ("Deferred", "Put off until tomorrow"),
  ("Completed", "Things are done!");
/*


 Creación de la tabla 'todos'
 */
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  state_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NULL,
  archived BOOLEAN NOT NULL DEFAULT 0,
  created_date DATETIME NOT NULL,
  steps_id INTEGER NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (state_id) REFERENCES states(id)
);
/*



 Creación de la tabla 'steps'
 */
CREATE TABLE "steps" (
	"id"	INTEGER NOT NULL,
	"todo_id"	INTEGER NOT NULL,
	"description"	TEXT,
	"completed"	BOOLEAN NOT NULL DEFAULT 0,
	"archived"	BOOLEAN NOT NULL DEFAULT 0,
	"name"	TEXT NOT NULL, parent_step_id INTEGER NULL,
	FOREIGN KEY("todo_id") REFERENCES "todos"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
)

/*
para pruebas:
  DELETE from todos
  DELETE FROM sqlite_sequence WHERE name = 'todos';
*/
