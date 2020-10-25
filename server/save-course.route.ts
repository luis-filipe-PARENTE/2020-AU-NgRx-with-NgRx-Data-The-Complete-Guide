import { Request, Response } from 'express';
import { Course } from '../src/app/courses/model/course';

import { COURSES } from './db-data';


export function saveCourse(req: Request, res: Response) {

    console.log("Saving course ...");

    const 
        id = req.params["id"],
        changes = req.body.update.changes;

        Math.floor((Math.random() * 10) + 1) > 5
            ? onSucess(res, id, changes)
            : onError(res, id, changes);
}

function onSucess(res: Response, id: number, changes: Partial<Course>) {
    console.log("[ SUCCESS ] on saving course ...", JSON.stringify(changes));

    COURSES[id] = {
        ...COURSES[id],
        ...changes
    };

    setTimeout(() => {
       res.status(200).json(COURSES[id]);
    }, 200);
}

function onError(res: Response, id: number, changes: Partial<Course>): void {
    console.log("[ ERROR ] on saving course ...");

    setTimeout(() => {
        res.status(500).json({error: `Error: course ${id} not saved!`});
     }, 500); 
}




