import SignupForm from '@/components/auth/SignupForm'
import { getCountries, type Country } from '@/lib/countries'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function SignupPage() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('accessToken')

  if (cookie) {
    redirect('/feedback/dashboard')
  }

  const countries: Country[] = await getCountries()

  return <SignupForm countries={countries} />
}
