import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserProfile } from '../../interfaces/user.interface';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userProfile?: UserProfile;

  constructor (
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.usersService.getUserById( id ) )
      )
      .subscribe( user => {
        if ( !user ) return this.router.navigate(['/heroes/list'])

        const { body } = user as HttpResponse<UserProfile>;

        if (!body) return this.router.navigate(['/'])

        return this.userProfile = body;
      })
  }

}
