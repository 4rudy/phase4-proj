import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import CharacterCreator from "./pages/CharacterCreator";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,

    }
]