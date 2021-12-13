import { useSelector } from "react-redux";
import { ReducerState } from "../../redux/reducerRoot";

const useLoadSpin = (): boolean => {
  const status = useSelector((state: ReducerState) => state.filter.loading);
  return status;
};

export default useLoadSpin;
