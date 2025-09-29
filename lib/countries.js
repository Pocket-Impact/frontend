export async function getCountries() {
  // eslint-disable-next-line no-undef
  const response = await fetch("https://www.apicountries.com/countries");

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status}`);
  }

  const data = await response.json();

  const countries= data.map((country) => {
    const code = country.alpha2Code || country.code || "";
    const name = country.name || "";
    const pic =
      country.flags?.png || country.flag || country.flags?.svg || "";
    const callingCode =
      Array.isArray(country.callingCodes) && country.callingCodes.length > 0
        ? `+${country.callingCodes[0]}`
        : "";

    return { code, name, pic, callingCode };
  });

  countries.sort((a, b) => a.name.localeCompare(b.name));

  return countries;
}