import { createContext } from "react";
import { IGlobalState } from "../interfaces/interfaces";
export const GlobalContext = createContext<IGlobalState | null>(null);