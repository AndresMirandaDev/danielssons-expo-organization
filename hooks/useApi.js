import { useState } from 'react';

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limitedData, setLimitedData] = useState([]);

  const request = async (...args) => {
    let data;
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return response;
    }

    data = [...response.data];
    setError(false);
    setData(response.data);
    setLimitedData(data.slice(0, 5));
    return response;
  };

  const loadMore = () => {
    setLoading(true);
    const last = limitedData.length - 1;
    const newData = data.slice(last + 1, last + 6);

    setLimitedData([...limitedData, ...newData]);
    setLoading(false);
  };
  return { data, error, loading, request, limitedData, loadMore };
};
