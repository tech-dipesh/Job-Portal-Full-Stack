import { useState } from "react";

export default function useFetchData(fetchFn) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const execute = async (params=null) => {
    setLoading(true);
    try {
      const {data} = await fetchFn(params);
      setData(data);
      return data;
    } catch (err) {
      const {data, status}=err.response
      if(status==401){
        setError("User Please Logged in First")
      }
      console.log('message', data.message)
      const msg = data?.message || "Network Error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
}