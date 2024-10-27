import { AuthForm } from '@/components/auth/auth-form'

export default function AuthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Rapid Reels</h1>
      <AuthForm />
    </div>
  )
}
