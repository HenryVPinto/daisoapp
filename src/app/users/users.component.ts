import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AlertConstants } from '../utils/alert-constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  @BlockUI('user-view') userLoader: NgBlockUI;

  private alert = AlertConstants;
  private users = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userLoader.start('Obteniendo...');
    this.userService.list()
      .subscribe(
        result => {
          this.userLoader.stop();
          this.verifyListUsersResponse(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  private verifyListUsersResponse(response) {
    const result = response.result;
    const view = response.view;
    if (result === undefined || result.error === 1) {
      const message = result ? result.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.users = view;
    }
  }

  private confirmDelete(id) {
    swal({
      title: 'Información',
      text: '¿Esta seguro que desea eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.alert.DONE_BUTTON_COLOR,
      cancelButtonColor: this.alert.CANCEL_BUTTON_COLOR,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.delete(id);
      }
    });
  }

  private delete(id) {
    this.userLoader.start('Eliminando...');
    this.userService.delete(id)
      .subscribe(
        result => {
          this.userLoader.stop();
          this.verifyDeleteUserResponse(result);
        },
        err => {
          this.userLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyDeleteUserResponse(response) {
    const error = response.error;
    if (error === undefined || error === 1) {
      const message = response.message ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Usuario eliminado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.getUsers();
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
