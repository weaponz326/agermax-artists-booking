// auth.js
// export default {
//   meEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
//   loginEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/login`,
//   registerEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/register`,
//   storageTokenKeyName: 'accessToken',
//   onTokenExpiration: 'refreshToken'
// }
export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' 
}
