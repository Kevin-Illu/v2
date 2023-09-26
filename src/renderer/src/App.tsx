import { useState } from 'react'
import { State } from '../../../types/globals'

function App(): JSX.Element {
  const [message, setMessage] = useState('states')
  const [response, setResponse] = useState<State[]>([])

  function send(sql): void {
    window.api.todos.get<State[]>(sql).then((result) => setResponse([...response, result]))
  }

  return (
    <div>
      <article>
        <p>
          Say <i>ping</i> to the main process.
        </p>
        <input
          type="text"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="button" onClick={() => send(message)}>
          Send
        </button>
        <br />
        <p>Main process responses:</p>
        <br />
        {(response && JSON.stringify(response, null, 2)) || 'No query results yet!'}
      </article>
    </div>
  )
}

export default App
