import { getRandomText } from "./utils/functions";

function App() {
  return (
    <div className="w-full min-h-[100vh] bg-blue-400">
      {getRandomText(100)}
    </div>
  );
}

export default App;
