import { useEffect, useState } from "react";
import { fetchDharmaMitraData, languageType } from "~/api";
import { useFetcher } from "@remix-run/react";
import _ from "lodash";
function useDharmaMitraTranslation(
  debouncedText: string,
  language: languageType
) {
  const fetcher = useFetcher();
  useEffect(() => {
    if (debouncedText && language)
      fetcher.submit(
        {
          sentence: debouncedText,
          language: language,
        },
        {
          action: "/api/mitra",
          method: "POST",
        }
      );
  }, [debouncedText, language]);
  const data = fetcher.data?.data;
  const isLoading = fetcher.state !== "idle";
  const error = fetcher.data?.error;
  return { data, isLoading, error };
}

export default useDharmaMitraTranslation;
