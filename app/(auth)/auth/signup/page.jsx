import SignupForm from '@/components/auth/SignupForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCountries } from '@/lib/countries'

export default async function SignupPage() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('accessToken')

  if (cookie) {
    redirect('/feedback/dashboard')
  }

  const countries = await getCountries()

  return <SignupForm countries={countries} />
}
