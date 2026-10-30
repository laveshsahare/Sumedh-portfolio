import { useStore } from '../store/useStore'
import AdminLogin from '../components/admin/AdminLogin'
import AdminLayout from '../components/admin/AdminLayout'

export default function AdminPage() {
  const isAdmin = useStore((s) => s.isAdmin)
  return isAdmin ? <AdminLayout /> : <AdminLogin />
}