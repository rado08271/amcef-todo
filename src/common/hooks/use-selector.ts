import * as Redux from 'react-redux'
import {RootState} from "../context/store.ts";

const useSelector = Redux.useSelector.withTypes<RootState>()

export default useSelector