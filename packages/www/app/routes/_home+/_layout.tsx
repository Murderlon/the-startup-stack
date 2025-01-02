import { Outlet } from 'react-router'

export const ROUTE_PATH = '/' as const

export async function loader() {
  return {}
}

export default function Home() {
  return <Outlet />
}
