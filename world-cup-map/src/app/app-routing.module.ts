import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/map',
        pathMatch: 'full'
    },
    {
        path: 'map',
        component: MapComponent
        //loadChildren: './pages/map/map.module#MapModule'
    },
    {
        path: '**',
        redirectTo: 'map',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
