import { Todo, RawTodo, State, Step } from '$globalTypes/databaseResponse'
import { MainDatabaseInstance, RunResult } from '@main/types'
import { formatRawData } from '../../utils/formatTodoRawResponse'

interface ITodoRepository {
  create(todo: Todo, user_id: number): Promise<RunResult>
  createStep(step: Step, todo_id: number): Promise<RunResult>

  getStates(): Promise<State[]>
  getAll(): Promise<Todo[]>
  getById(id: number): Promise<Todo>

  update(todo: Todo): Promise<RunResult>
  updateStep(step: Step): Promise<RunResult>
}

// TODO: clean the return types of this repository
export class TodoRepository implements ITodoRepository {
  constructor(private db: MainDatabaseInstance) {}

  public getStates = (): Promise<State[]> => {
    return this.db.fetch<State>(`
      SELECT id
      , name
      , description
      FROM states
    `)
  }

  public getAll = async (): Promise<Todo[]> => {
    const rawData = await this.db.fetch<RawTodo>(
      `
WITH RECURSIVE steps_tree(
  id,
  todo_id,
  parent_step_id,
  name,
  level,
  parent_name
) AS (
  SELECT
    s.id,
    s.todo_id,
    s.parent_step_id,
    s.name,
    0 AS level,
    NULL AS parent_name
  FROM
    steps s
  WHERE
    s.parent_step_id IS NULL

  UNION ALL

  SELECT
    s.id,
    s.todo_id,
    s.parent_step_id,
    s.name,
    st.level + 1 AS level,
    st.name AS parent_name
  FROM
    steps s
  JOIN
    steps_tree st ON st.id = s.parent_step_id
)

SELECT
  t.id AS todo_id,
  t.name AS todo_name,
  t.state_id as todo_state_id,
  (SELECT name from states WHERE id = t.state_id) as todo_state_name,
  st.id AS step_id,
  st.name AS step_name,
  st.parent_step_id,
  st.level,
  st.parent_name,
  t.description AS todo_description,
  s.description AS step_description,
  t.archived AS todo_archived,
  s.completed AS step_completed
FROM
  todos t
LEFT JOIN
  steps_tree st ON t.id = st.todo_id
LEFT JOIN
  steps s ON s.id = st.id
ORDER BY
  t.id,
  st.level,
  st.id,
  st.parent_name;
    `
    )

    const formatedData = formatRawData(rawData)
    return formatedData
  }

  public getById = (id: number): Promise<Todo> => {
    return this.db.fetch<Todo>('SELECT * FROM todos WHERE id = ?', [id])[0]
  }

  public create = (todo: Todo, user_id: number): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO todos (
        user_id
        , state_id
        , name
        , description
        , created_date
      )
      VALUES (
        ?,           -- user_id
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATETIME('now') -- created_date
      )
    `,
      [user_id, todo.state_id, todo.name, todo.description]
    )
  }

  public update = (todo: Todo): Promise<RunResult> => {
    return this.db.execute(
      `
        UPDATE todos
        SET name = ?
        WHERE id = ?
      `,
      [todo.name, todo.id]
    )
  }

  public createStep = (step: Step, todo_id: number): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO steps
      (todo_id, parent_step_id, name, description, completed)
      VALUES (?, ?, ?, ?, ?)
      `,
      [todo_id, step.parent_step_id, step.name, step.description, step.completed]
    )
  }

  public updateStep = (step: Step): Promise<RunResult> => {
    return this.db.execute(
      `
      UPDATE steps
      SET name = ?,
        description = ?,
        completed = ?
      WHERE id = ?`,
      [step.name, step.description, step.completed, step.id]
    )
  }
}
