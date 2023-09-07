import Router from "./components/Router"
import ErrorBoundary from "./components/ErrorBoundary"
import { Notification } from "./components/Notification"

function App() {
    return (
        <ErrorBoundary>
            <Router />
            <Notification />
        </ErrorBoundary>
    )
}

export default App
