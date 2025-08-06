export async function getCountries() {
  const response = await fetch("https://www.apicountries.com/countries");
  const data = await response.json();

  const countries = data.map((country) => {
    // Get calling code as +XXX
    const callingCode =
      Array.isArray(country.callingCodes) && country.callingCodes.length > 0
        ? `+${country.callingCodes[0]}`
        : "";

    return {
      code: country.alpha2Code || country.code,
      name: country.name,
      pic: country.flags?.png || country.flag || country.flags?.svg || "",
      callingCode: callingCode,
    };
  });

  countries.sort((a, b) => a.name.localeCompare(b.name));

  return countries;
}

// Example usage
const countries = await getCountries();
console.log(countries);