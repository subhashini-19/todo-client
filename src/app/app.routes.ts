import { Routes } from '@angular/router';
import { Todo } from '../todo/todo';
import { Unauthorized } from '../unauthorized/unauthorized';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'todo',
        component: Todo
    },
    {
        path: 'unauthorized',
        component: Unauthorized
    },
    {
        path: '**',
        redirectTo: '/unauthorized'
    }
];
