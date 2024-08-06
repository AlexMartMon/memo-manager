import React,{ useEffect, useState } from "react";

export default function Login({ onLoginSuccess }){
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
 
  useEffect(() => {
    if (accessToken === "" || !uuidRegex.test(accessToken)) {
      setIsDisabled(true);
      setError(accessToken === "" ? "" : "Token's Format must be an UUID valid.");
    } else {
      setIsDisabled(false);
      setError("");
    }
  }, [accessToken]);

  const handleLogin = () => {
    if (uuidRegex.test(accessToken)) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
          }, 1000);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="access_token" className="block text-gray-700 text-sm font-bold mb-2">
            Access Token
          </label>
          <input
            type="text"
            id="access_token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            disabled={isLoading}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          onClick={handleLogin}
          disabled={isDisabled || isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white ${isDisabled || isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 `}
        >
          Login
        </button>
      </div>
    </div>
  );
}
