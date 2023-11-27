import { Component } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

import { UsersService } from '../../services/users.service';
import { DataUser, User } from '../../interfaces/user.interface';
import { Pagination, PaginationConfig } from '../../interfaces/pagination.interface';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public pagination?: Pagination;
  public per_page: number = 10;
  public login: string = "";

  public paginationConfig: PaginationConfig = {
    pageSize: 10,
    pageIndex: 0,
    showFirstLastButtons: true,
  }

  public users: User[] = [];
  public loading: boolean = false;

  constructor (
    private usersService: UsersService,
    private snackBarService: SnackBarService,
  ) { }

  getIniPagination( ): Pagination {
    const iniPagination: Pagination = {
      prev:  { page: undefined },
      next:  { page: undefined },
      last:  { page: undefined },
      first: { page: undefined }
    }
    return iniPagination;
  }

  getUsers( login:string, page: number = 1, per_page: number = 10 ): void {
    this.loading = true;
    this.usersService.getUsers( login, page, per_page )
      .subscribe({
        next: (response) => {
          const { body } = response as HttpResponse<DataUser>;
          this.users = body ? body.items : [];
          this.paginationConfig.length = body ? body.total_count : 0;
          if ( this.paginationConfig.length > 100 ) this.paginationConfig.length = 100;
          this.login = login;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.snackBarService.openSnackBar(`Ha ocurrido un error: ${error.error.message} (${error.status})`, 'error', 'Ok' )
          this.loading = false;
        }
      });
  }

  onSearch(login: string): void {
    this.getUsers(login);
  }

  handlePageEvent(e: PageEvent): void {
    this.paginationConfig.length = e.length;
    this.paginationConfig.pageSize = e.pageSize;
    this.paginationConfig.pageIndex = e.pageIndex;

    const { pageIndex, pageSize } = this.paginationConfig;
    this.getUsers(this.login, pageIndex+1, pageSize);
  }

}
