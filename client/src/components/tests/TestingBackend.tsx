import { useState } from "react";

const TestingBackend = (): JSX.Element => {
  const [msg, setMsg] = useState<string | null>(null);
  const handleTestRequest = () => {
    async function fetchRequest() {
      const response: Response = await fetch(
        "http://127.0.0.1:8000/assist_api/test/"
      );

      if (!response.ok) {
        throw new Error("error fetching: " + response.status);
      }
      const data = await response.json();

      console.log(data);

      setMsg(data.message);
    }
    fetchRequest();
  };
  return (
    <div>
      <button className="bg-blue-100" onClick={handleTestRequest}>
        Msg: {msg}
      </button>
    </div>
  );
};

export default TestingBackend;
