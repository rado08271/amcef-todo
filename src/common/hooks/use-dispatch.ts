import * as Redux from 'react-redux'
import {AppDispatch} from "../context/store.ts";

const useDispatch = Redux.useDispatch.withTypes<AppDispatch>()

export default useDispatch