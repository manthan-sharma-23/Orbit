import { useState } from "react";

function useRerender() {
  const [rerenderKey, setRerenderKey] = useState(0);

  const rerender = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  return rerender;
}

export default useRerender;
