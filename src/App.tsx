import Router from "./components/Router"
import ErrorBoundary from "./components/ErrorBoundary"
import { Notification } from "./components/Notification"
import { useCheckAuth } from "./helpers/hooks/useCheckAuth"

function App() {
  useCheckAuth()

  return (
    <ErrorBoundary>
      <Router />
      <Notification />
    </ErrorBoundary>
  )
}

export default App
