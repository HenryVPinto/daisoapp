import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../users/user.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertConstants } from '../utils/alert-constants';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {
  @BlockUI('create-user-view') createUserLoader: NgBlockUI;

  private alert = AlertConstants;
  private user = new User();
  private id = '';
  private buttonTitle = 'Crear Usuario';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buttonTitle = 'Guardar Cambios';
      this.getUser();
    }
  }

  private getUser() {
    this.createUserLoader.start('Obteniendo usuario...');
    this.userService.get(this.id)
      .subscribe(
        result => {
          this.createUserLoader.stop();
          this.verifyGetUserResponse(result);
        },
        err => {
          this.createUserLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyGetUserResponse(response) {
    const result = response.result;
    const error = response.error;
    if (result === undefined || result.error === 1 || error === 1) {
      const message = result ? result.message : error ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.user = response.record;
    }
  }

  private verify() {
    if (this.id) {
      this.editUser();
    } else {
      this.createUser();
    }
  }

  private createUser() {
    this.createUserLoader.start('Guardando...');
    this.user.typeUser = 'vendedor';
    this.user.idPlanSale = null;
    this.userService.create(this.user)
      .subscribe(
        result => {
          this.createUserLoader.stop();
          this.verifyCreateUserResponse(result);
        },
        err => {
          this.createUserLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyCreateUserResponse(response) {
    const result = response.result;
    const records = response.records;
    if (result === undefined || result.error === 1 || records[0].error === 1) {
      const message = result ? result.message : records ? records[0].messageError : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Usuario creado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.user = new User();
    }
  }

  private editUser() {
    this.createUserLoader.start('Guardando...');
    this.user.id = this.id;
    this.user.typeUser = 'vendedor';
    this.user.idPlanSale = null;
    this.userService.edit(this.user)
      .subscribe(
        result => {
          this.createUserLoader.stop();
          this.verifyEditUserResponse(result);
        },
        err => {
          this.createUserLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyEditUserResponse(response) {
    const error = response.error;
    if (error === 1) {
      const message = response.message || 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Usuario editado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
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
