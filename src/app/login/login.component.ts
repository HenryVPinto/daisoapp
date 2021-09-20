import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AlertConstants } from '../utils/alert-constants';

import { LoginService } from './login.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  @BlockUI('login-view') loginLoader: NgBlockUI;

  private alert = AlertConstants;
  public email: string;
  public password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: SessionStorageService
  ) { }

  ngOnInit() { }

  validateInputs() {
    if (this.email !== '' && this.password !== '') {
      this.login();
    } else {
      this.showAlert('Usuario y contraseña deben estar llenos.', 'error', this.alert.CANCEL_BUTTON_COLOR);
    }
  }

  login() {
    const md5 = new Md5();
    const passwordHash = md5.appendStr(this.password).end();

    this.loginLoader.start('Iniciando sesión...');
    this.loginService.login(this.email, passwordHash)
      .subscribe(
        result => {
          this.loginLoader.stop();
          this.verifyLoginResponse(result);
        },
        error => {
          this.loginLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  verifyLoginResponse(response) {
    const result = response.result;
    if (result.error === 1) {
      this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
    } else {
      const userInfo = response.infoUser;
      this.storage.store('token', userInfo.token);
      this.storage.store('email', btoa(userInfo.email));
      this.storage.store('firstName', btoa(userInfo.firstName));
      this.storage.store('lastName', btoa(userInfo.lastName));
      this.storage.store('typeUser', btoa(userInfo.typeUser));
      this.router.navigate(['/dashboard']);
    }
  }

  private showAlert(
    message,
    type,
    buttonColor
  ) {
    swal({
      title: this.alert.INFORMATION_TITLE,
      text: message,
      type: type,
      confirmButtonText: this.alert.DONE_BUTTON_LABEL,
      confirmButtonColor: buttonColor,
    });
  }

}
