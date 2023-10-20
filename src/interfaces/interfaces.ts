export interface IGlobalState {
    language: 'en' | 'spa',
    type: 'week' | "check",
    changeLanguage: (payload: string) => void;
    changeType: (payload: string) => void;
}
export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
}
export interface IAction{
    type: string,
    payload: any
}