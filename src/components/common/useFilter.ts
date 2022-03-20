import { useCallback, useState } from "react";

export const useFilter = (initialState = "") => {
  const [filter, setFilter] = useState(initialState);

  const handleFilterChange = useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  return { filter, handleFilterChange };
};
