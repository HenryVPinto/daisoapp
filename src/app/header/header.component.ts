import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  private name = '';

  constructor(
    private storage: SessionStorageService
  ) { }

  ngOnInit() {
    const firstName = atob(this.storage.retrieve('firstName'));
    const lastName = atob(this.storage.retrieve('lastName'));
    this.name = `${firstName} ${lastName}`;
  }

}
