const API_BASE_URL = (
  process.env.VUE_APP_API_URL || 'https://apismartwater.onrender.com'
).replace(/\/+$/, '')

export default API_BASE_URL
