import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'users-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  public search = new EventEmitter<string>()

  public login: FormControl;

  constructor(
  ) {
    this.login = new FormControl( "",  [this.customValidator.bind(this), Validators.required, Validators.minLength(4)] )
  }

  customValidator(control: AbstractControl) {
    const forbiddenValue = 'gcpglobal';
    if (control.value === forbiddenValue) return { forbiddenValue: true };
    return null;
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(400)
      )
      .subscribe( value => {
        this.search.emit( value );
      });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onKeyPress( value: string ) {
    if ( this.login.valid )
      this.debouncer.next( value );
  }

  getErrorMessage() {
    if ( this.login.hasError('required') ) return 'Ingresar un valor';
    if ( this.login.hasError('minlength') ) return 'Minimo 4 caracteres';
    if ( this.login.hasError('forbiddenValue') ) return 'Valor prohibido';

    return '';
  }

}
