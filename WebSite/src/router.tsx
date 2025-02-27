import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import Enrollment from "./components/Services/Enrollment";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'services',
                element: <ServicesPage />,
                children: [
                    // { index: true, path: 'enrollment', element: <Enrollment /> },
                ]
            },
            { path: '/services/enrollment', element: <Enrollment /> },
        ]
    }
])