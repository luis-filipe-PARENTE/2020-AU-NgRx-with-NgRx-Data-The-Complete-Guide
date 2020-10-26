import { Injectable } from '@angular/core';
import { EntityActionFactory, EntityOp, MergeStrategy, ofEntityOp, ofEntityType } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { entityDataKeyCourse } from '../services/course-entity.service';

// import { State } from "./state";
@Injectable()
export class CoursesEffects {

    updateOnError$ = createEffect(() => {
        return this.actions$.pipe(
            ofEntityType(entityDataKeyCourse),
            ofEntityOp([EntityOp.SAVE_UPDATE_ONE_ERROR]),
            map(action => {

                return this.entityActionFactory.create(
                  entityDataKeyCourse,
                  EntityOp.UNDO_ONE,
                  action.payload.data.originalAction.payload.data,
                  {
                    correlationId: action.payload.data.originalAction.payload.correlationId,
                    mergeStrategy: MergeStrategy.IgnoreChanges,
                    isOptimistic: true
                  }
                );
              })
            )
    });

    delteOnError$ = createEffect(() => {
        return this.actions$.pipe(
            ofEntityType(entityDataKeyCourse),
            ofEntityOp([EntityOp.SAVE_DELETE_ONE_ERROR]),
            map(action => {
                return this.entityActionFactory.create(
                  entityDataKeyCourse,
                  EntityOp.UNDO_ONE,
                  action.payload.data.originalAction.payload.data,
                  {
                    correlationId: action.payload.data.originalAction.payload.correlationId,
                    mergeStrategy: MergeStrategy.IgnoreChanges,
                    isOptimistic: true
                  }
                );
              })
            )
    });

    constructor(
        private actions$: Actions,
        private entityActionFactory: EntityActionFactory
    ) {}
}