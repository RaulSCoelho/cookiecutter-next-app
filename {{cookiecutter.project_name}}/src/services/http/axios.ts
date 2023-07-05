import axios from 'axios'
import { parseCookies } from 'nookies'

export const api = getApiClient()

export function getApiClient(ctx?: any) {
  const { access_token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST
  })

  if (access_token) {
    api.defaults.headers.Authorization = `Bearer ${access_token}`
  }

  return api
}
