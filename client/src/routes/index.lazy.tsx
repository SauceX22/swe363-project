import mafqoodLogo from "/logo.svg";
import { useState } from "react";

import { createLazyFileRoute } from "@tanstack/react-router";

import reactLogo from "../assets/react.svg";
import tailwindLogo from "../assets/tailwind.svg";
import tanstackLogo from "../assets/tanstack.png";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center justify-center gap-x-6">
        <a href="https://vitejs.dev" target="_blank">
          <svg
            width="42"
            height="27"
            viewBox="0 0 42 27"
            fill="#eee"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5922 26.168L41.2542 26.168L29.186 18.5347L0.523919 18.5347L12.5922 26.168ZM29.1862 18.5347L29.1862 0.40567L41.2544 8.03893V26.1679L29.1862 18.5347Z"
              fill="#000"
            />
          </svg>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tanstack.com" target="_blank">
          <img src={tanstackLogo} className="logo" alt="TanStack logo" />
        </a>
        <a href="https://tailwind.com" target="_blank">
          <img src={tailwindLogo} className="logo" alt="Tailwind logo" />
        </a>
      </div>
      <h1>React Tanning 🌴</h1>
      <p className="mt-2 font-bold">
        React + Vite + TypeScript + TanStack + Tailwind
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className="mb-6">
          count is {count}
        </button>
        <p>
          Edit <code>src/routes/index.lazy.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
