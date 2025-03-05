import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="my-4 text-gray-500">We can't find that page.</p>

                <Link
                    to={'/'}
                    className="px-4 py-2 hover:text-red-600 text-white border border-red-500 bg-red-500 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage