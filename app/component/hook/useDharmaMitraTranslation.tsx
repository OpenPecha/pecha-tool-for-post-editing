import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import _ from "lodash";
function useDharmaMitraTranslation(
  debouncedText: string,
  language: languageType
) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      const res = await fetchDharmaMitraData(debouncedText, language);

      setData(res?.data);
      setError(res?.error);
      setIsLoading(false);
    }

    if (debouncedText && language) {
      fetchData();
    }
  }, [debouncedText, language]);

  return { data, isLoading, error };
}

export default useDharmaMitraTranslation;
