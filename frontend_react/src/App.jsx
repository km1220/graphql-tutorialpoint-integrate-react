import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)


  async function loadGreeting() {
    const response = await fetch('http://localhost:9000/graphql', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: '{greeting}' })
    })
    const resBody = await response.json();
    console.log("end of greeting func: resBody: ", resBody)

    return resBody.data.greeting;
  }
  async function loadSayHello(name) {
    const response = await fetch('http://localhost:9000/graphql', {
      method: 'POST',
      headers: { 'content-type': "application/json" },
      body: JSON.stringify({ query: `{sayHello(name: "${count}")}` })
    })
    const resBody = await response.json();
    console.log("end of sayHello func: resBody: ", resBody)

    return resBody.data.sayHello;
  }

  const handleGreeting = async () => {
    let result = await loadGreeting()
    console.log(result)
  }
  const handleSayHello = async () => {
    let result = await loadSayHello()
    console.log(result)
  }

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={handleGreeting}>Greeting from server!</button>


        <input type="text" value={count} onChange={e => setCount(e.target.value)} />
        <button onClick={handleSayHello}>SayHello from server!</button>
      </div>
    </div>
  )
}

export default App
