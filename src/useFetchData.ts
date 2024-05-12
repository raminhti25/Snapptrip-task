import Axios, { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

interface IOutput {
  loading: boolean;
  error: Error | AxiosError | null;
  refetch: () => void;
  data: any;
}

interface IState {
  status: "loading" | "loaded" | "error";
  error?: IOutput["error"];
  payload?: any;
}

const useFetchData = (url: string): IOutput => {
  const [state, setState] = useState<IState>({
    status: "loading",
    error: null,
  });
  const isRequestInProgress = useRef(false);

  const fetchData = useCallback(
    async (skipDuplicateCheck = false) => {
      if (isRequestInProgress.current && !skipDuplicateCheck) {
        return;
      }

      isRequestInProgress.current = true;

      try {
        const response = await Axios.get(url);
        setState({ status: "loaded", payload: response.data });
      } catch (error: any) {
        setState({ status: "error", error });
      } finally {
        isRequestInProgress.current = false;
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading: state.status === "loading",
    error: state.status === "error" ? (state.error as IOutput["error"]) : null,
    data: state.status === "loaded" ? state.payload : null,
    refetch: fetchData.bind(null, true),
  };
};

export default useFetchData;
