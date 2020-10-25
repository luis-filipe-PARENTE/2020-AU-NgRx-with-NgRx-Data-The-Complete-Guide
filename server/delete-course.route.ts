import {Request, Response} from 'express';
import {COURSES} from "./db-data";


export function deleteCourse(req: Request, res: Response) {

    console.log("Deleting course ...");

    const id     = req.params["id"],
          course = COURSES[id];

     Math.floor((Math.random() * 10) + 1) > 5
          ? onError(res, id)
          : onError(res, id);       
}


function onSucess(res: Response, id: number) {
  console.log("[ SUCCESS ] on deleting course ...");

  delete COURSES[id];

  setTimeout(() => {
     res.status(200).json({id});
 }, 2000);
}

function onError(res: Response, id: number): void {
  console.log("[ ERROR ] on deleteing course ...");

  setTimeout(() => {
      res.status(500).json({error: `Error: course ${id} not deleted!`});
   }, 500); 
}


