// ** React Imports
import { createContext, useEffect, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Axios for HTTP requests
import axios from 'axios';

// ** Configurations including endpoints
import authConfig from 'src/configs/auth';

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  error: null,
  setUser: () => null,
  setLoading: () => {},
  setError: () => {},
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  initiateOAuth: (provider) => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
        if (storedToken) {
          // Make sure axios requests include credentials (cookies) if needed
          axios.defaults.withCredentials = true;
          const response = await axios.get(authConfig.meEndpoint, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          console.log('OAuth Response:', response.data); // Log the OAuth response

          setUser(response.data.userData);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (params, errorCallback) => {
    setLoading(true);
    try {
      const { data } = await axios.post(authConfig.loginEndpoint, params);
      window.localStorage.setItem(authConfig.storageTokenKeyName, data.accessToken);
      setUser(data.userData);
      const returnUrl = router.query.returnUrl || '/admin/home';
      router.replace(returnUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      if (errorCallback) errorCallback(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    setUser(null)
    router.push('/login')
  }

  const initiateOAuth = (provider) => {
    window.location.href = `${authConfig.oauthEndpoint}/${provider}`;
  };

  const values = {
    user,
    loading,
    error,
    setUser,
    setLoading,
    setError,
    login: handleLogin,
    logout: handleLogout,
    initiateOAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
