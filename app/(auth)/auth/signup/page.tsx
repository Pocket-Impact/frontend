import SignupForm from '@/components/auth/SignupForm'
import { getCountries, type Country } from '@/lib/countries'

export default async function SignupPage() {
  const countries: Country[] = await getCountries()

  return <SignupForm countries={countries} />
}
