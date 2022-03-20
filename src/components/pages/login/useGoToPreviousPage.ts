import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useGoToPreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const state = location.state as { from: Location };
    return state?.from ? state.from.pathname : "/";
  }, [location]);

  return () => navigate(from, { replace: true });
};
