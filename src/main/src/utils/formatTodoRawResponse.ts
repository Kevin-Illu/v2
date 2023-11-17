import { Todo, Step, RawTodo } from '$globalTypes/databaseResponse'

/*
 * return a redeable data structure for represent
 * a todo tree
 */
export function formatRawData(rawData: RawTodo[]): Todo[] {
  const todosMap = new Map<number, Todo>()

  for (const item of rawData) {
    const {
      todo_id,
      todo_name,
      todo_state_id,
      todo_state_name,
      step_id,
      step_name,
      parent_step_id,
      todo_description,
      step_description,
      todo_archived,
      step_completed
    } = item

    let todo: Todo

    if (!todosMap.has(todo_id)) {
      todo = {
        todo_id,
        todo_name,
        todo_archived: Boolean(todo_archived),
        state_id: todo_state_id,
        state_name: todo_state_name,
        description: todo_description || null,
        steps: []
      }
      todosMap.set(todo_id, todo)
    } else {
      todo = todosMap.get(todo_id)!
    }

    // verificar si existe el step
    if (step_id !== null) {
      const step: Step = {
        id: step_id,
        name: step_name,
        description: step_description || null,
        completed: Boolean(step_completed),
        sub_steps: []
      }

      if (parent_step_id === null) {
        todo.steps?.push(step)
      } else if (todo.steps) {
        const parentStep = findStepWithId(todo.steps, parent_step_id)
        parentStep?.sub_steps?.push(step)
      }
    }
  }

  return [...todosMap.values()]
}

/*
 * find substeps and return it
 */
function findStepWithId(steps: Step[], id: number): Step | null {
  for (const step of steps) {
    if (step.id === id) {
      return step
    }
    const subStep = findStepWithId(step.sub_steps!, id)
    if (subStep) {
      return subStep
    }
  }

  return null
}
