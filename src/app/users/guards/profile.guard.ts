import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap, map, switchMap, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { DataUser, User } from '../interfaces/user.interface';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Injectable({providedIn: 'root'})
export class ProfileGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const login: string = route.params['id'];
    return this.usersService.getUsers(login)
      .pipe(
        switchMap( user => {
          const { body } = user as HttpResponse<DataUser>;
          if ( !body ||  body.items[0].score < 20 ) {
            this.snackBarService.openSnackBar('Score invalido, debe ser mayor a 20', 'update', 'Ok' )
            return this.router.navigate(['/'])
          }
          return of(true)
        })
      )
  }

}
