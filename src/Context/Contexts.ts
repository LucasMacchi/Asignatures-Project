import { createContext } from "react";
import { IGlobalState, IAsigantureState, IUserState } from "../interfaces/interfaces";
export const GlobalContext = createContext<IGlobalState | null>(null);
export const AsignaturesContext = createContext<IAsigantureState | null>(null)
export const UserContext = createContext<IUserState | null>(null)