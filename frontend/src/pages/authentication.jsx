import * as React from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Authentication() { // Renamed to App for default export in Canvas

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0); // 0 for Sign In, 1 for Sign Up
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const {handleRegister, handleLogin} = React.useContext(AuthContext);
    
    // const handleRegister = async (name, username, password) => {
    //     console.log("Mock Register:", { name, username, password });
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (username === "test@example.com") {
    //                 reject(new Error("User already exists!")); // Simulate error
    //             } else {
    //                 resolve("Registration successful! Please log in.");
    //             }
    //         }, 1000);
    //     });
    // };

    // const handleLogin = async (username, password) => {
    //     console.log("Mock Login:", { username, password });
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (username === "user@example.com" && password === "password") {
    //                 resolve("Login successful!");
    //             } else {
    //                 reject({ response: { data: { message: "Invalid credentials." } } }); // Simulate error
    //             }
    //         }, 1000);
    //     });
    // };


    // // Function to handle authentication (login or register)
    // const handleAuth = async () => {
    //     setError(''); // Clear previous errors
    //     setMessage(''); // Clear previous messages
    //     setOpenSnackbar(false); // Close any open snackbars

    //     try {
    //         if (formState === 0) { // Sign In
    //             await handleLogin(username, password);
    //             setMessage("Login successful!");
    //             setOpenSnackbar(true);
    //             // Optionally redirect or update UI on successful login
    //         } else { // Sign Up
    //             const result = await handleRegister(name, username, password);
    //             setMessage(result);
    //             setOpenSnackbar(true);
    //             setUsername(""); // Clear username field after successful registration
    //             setPassword(""); // Clear password field after successful registration
    //             setName(""); // Clear name field after successful registration
    //             setFormState(0); // Switch to Sign In form after successful registration
    //         }
    //     } catch (err) {
    //         // Error handling for both login and registration
    //         console.error("Authentication error:", err);
    //         let errorMessage = "An unexpected error occurred.";
    //         if (err.response && err.response.data && err.response.data.message) {
    //             errorMessage = err.response.data.message;
    //         } else if (err.message) {
    //             errorMessage = err.message;
    //         }
    //         setError(errorMessage);
    //     }
    // };

    // Handler for closing the Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleAuth = async()=>{
        try{
            if(formState===0){
                let result = await handleLogin(username, password);
                console.log("res->",result);
                setMessage(result);
                setOpenSnackbar(true);
                setError("");
            }   
            if(formState===1){
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpenSnackbar(true);
                setError("");
                setFormState(0);
                setPassword("");
                
            }
        }catch(err){
            let message = err.response?.data?.message || "An unexpected error occurred.";
            setError(message);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter p-4">
            {/* Main content area (form) */}
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 sm:p-8 border border-gray-200">
                <div className="flex flex-col items-center space-y-6">
                    {/* Lock icon avatar */}
                    <div className="flex justify-center">
                        <div className="p-3 bg-gray-800 rounded-full shadow-md">
                            {/* Using an inline SVG for the lock icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {formState === 0 ? 'Login to your Account' : 'Create your Account'}
                    </h2>

                    {/* Sign In / Sign Up toggles */}
                    <div className="flex justify-center space-x-4 mb-6 w-full">
                        <button
                            className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                formState === 0
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setFormState(0)}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                formState === 1
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => setFormState(1)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form fields */}
                    <form noValidate className="space-y-4 w-full">
          
                        {formState === 1 && (
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-500"
                                required
                            />
                        )}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-500"
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 placeholder-gray-500"
                            required
                        />

                        {/* Error message display */}
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        {/* Submit button */}
                        <button
                            type="button"
                            onClick={handleAuth}
                            className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 shadow-md text-lg font-medium"
                        >
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Optional: Add "Forgot Password?" or "Don't have an account?" links */}
                    <div className="text-sm text-gray-600 space-y-2 text-center">
                        {formState === 0 && (
                            <a href="#" className="text-gray-600 hover:underline">
                                Forgot Password?
                            </a>
                        )}
                        <p>
                            {formState === 0 ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setFormState(formState === 0 ? 1 : 0)}
                                className="text-gray-800 font-semibold hover:underline"
                            >
                                {formState === 0 ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Snackbar/Toast Notification */}
            {openSnackbar && (
                <div
                    className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ease-out ${
                        openSnackbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    role="alert"
                >
                    <div className="flex items-center justify-between">
                        <span>{message}</span>
                        <button
                            onClick={handleCloseSnackbar}
                            className="ml-4 text-gray-400 hover:text-white focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
