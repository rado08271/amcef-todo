import {useContext} from "react";
import {ToastContext} from "../providers/toast-provider.tsx";

const useToast = () => useContext(ToastContext)

export default useToast