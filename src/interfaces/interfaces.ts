//Types
export type Tdays = 0|1|2|3|4|5|6;
export type Thours = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|20|21|22|23;
export type Tminutes = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20 
|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45
|46|47|48|49|50|51|52|53|54|55|56|57|58|59;


//Interfaces------------------------------------------------------------
export interface IGlobalState {
    language: 'en' | 'spa',
    type: 'week' | "check",
    translation: Ilabels,
    changeLanguage: (payload: string) => void;
    changeType: (payload: string) => void;
}
export interface IAsigantureState{
    asignatures: IAsignature[] | null,
    getAllTasks: () => void;
    taskDone: (id: number) => void;
    taskDelete: (id: number) => void;
}
export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
}
export interface IAction{
    type: string,
    payload: any
}

export interface IAsignature{
    title: string,
    description: string,
    hour: Thours,
    minutes: Tminutes,
    isDone: boolean,
    isExpire: boolean,
    day: Tdays,
    isCheck: boolean,
    id: number
}
export interface Ilabels{
    days: string[],
    types: string[]
}