import SignupForm from '@/app/components/auth/SignupForm'
// app/signup/page.tsx (server component)
import { getCountries, type Country } from '@/app/lib/countries'

export default async function SignupPage() {
  const countries: Country[] = await getCountries()

  return <SignupForm countries={countries} />
}
