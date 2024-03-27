import { useEffect, useState } from "react";

type country = { name: { common: string } };

export const useGetCountries = () => {
  const [countries, setCountries] = useState<country[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data: country[]) => {
        setCountries(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return countries;
};
