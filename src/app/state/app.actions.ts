import { createAction } from '@ngrx/store';

export enum AppActionTypes {
    StartAppInitializer = "[ AppActipnTypes ] Start App Initializer",
    FinishAppInitializer = "[ AppActipnTypes ] Finish App Initializer",
    CheckAppLocalStorage = "[ AppActipnTypes ] Check user on localstorage" ,
} 

export const StartAppInitializer = createAction(
    AppActionTypes.StartAppInitializer
);

export const FinishAppInitializer = createAction(
    AppActionTypes.FinishAppInitializer
);

export const CheckAppLocalStorage = createAction(
    AppActionTypes.CheckAppLocalStorage
);

