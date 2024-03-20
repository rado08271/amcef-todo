import {useContext} from "react";
import {DialogContext} from "../providers/dialog-provider.tsx";

const useDialog = () => useContext(DialogContext)

export default useDialog