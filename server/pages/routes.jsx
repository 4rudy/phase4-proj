import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import CharacterCreator from "./pages/CharacterCreator";
import App from "./pages/App";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: < Home />,
             },
             {
                path: "/characters",
                element: < CharacterCreator />
             }
        ]

    }
]