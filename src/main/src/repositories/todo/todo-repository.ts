import { State as StateModel, Todo as TodoModel } from '$globalTypes/models'
import { Todo, RawTodo } from '$globalTypes/databaseResponse'
import { MainDatabaseInstance, RunResult } from '@main/types'
import { ITodoRepository } from './ITodoRepository'
import { formatRawData } from '../../utils/formatTodoRawResponse'

// TODO: clean the return types of this repository
export class TodoRepository implements ITodoRepository {
  constructor(private db: MainDatabaseInstance) {}

  public getStates = (): Promise<StateModel[]> => {
    return this.db.fetch<StateModel>(`
      SELECT id
      , name AS state_name
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
    (SELECT name from states WHERE id = t.state_id) as todo_sate_name,
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
    steps_tree st
  JOIN
    todos t ON t.id = st.todo_id
  JOIN
    steps s ON s.id = st.id
  WHERE
    t.id IS NOT NULL
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

  public getById = (taskId: string): Promise<Todo> => {
    return this.db.fetch<Todo>('SELECT * FROM todos WHERE id = ?', [taskId])[0]
  }

  public create = (todo: TodoModel): Promise<RunResult> => {
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
        1,           -- user_id
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATETIME('now') -- created_date
      )
    `,
      [todo.state_id, todo.name, todo.description]
    )
  }

  public update = (todo: TodoModel): Promise<RunResult> => {
    return this.db.execute(
      `
        UPDATE todos
        SET name = ?
        WHERE id = ?
      `,
      [todo.name, todo.id]
    )
  }
}
