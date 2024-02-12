// auth.js
export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/login`,
  logoutEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/register`,
  oauthEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  storageTokenKeyName: 'accessToken',
}

// export default {
//   meEndpoint: '/auth/me',
//   loginEndpoint: '/jwt/login',
//   registerEndpoint: '/jwt/register',
//   storageTokenKeyName: 'accessToken',
//   onTokenExpiration: 'refreshToken'
// }
