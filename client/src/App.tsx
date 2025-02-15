import { Toaster } from "sonner";

import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
