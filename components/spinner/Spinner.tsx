import { ClipLoader } from "react-spinners";

export function Spinner() {
  return (
    <div>
      <ClipLoader
        color={"#000000"}
        size={20}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
