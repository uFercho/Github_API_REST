import { Component, Inject, Renderer2, OnInit } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GithubAPI';

  constructor (
    @Inject(DOCUMENT)
    private document: Document,
    private render: Renderer2,
  ) {}

  ngOnInit(): void {
    this.render.addClass(this.document.body,'lightTheme')
  }
}
