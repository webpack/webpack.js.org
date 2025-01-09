import React, {Suspense} from "react";
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
  return (
    <div>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor:"greenyellow"
      }}>
        <h1>App1</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp/>
      </Suspense>
    </div>)
}


export default App;
