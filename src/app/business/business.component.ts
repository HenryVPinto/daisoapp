import { Component, OnInit } from '@angular/core';
import { BussinesService } from './business.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertConstants } from '../utils/alert-constants';
import swal from 'sweetalert2';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.less']
})
export class BusinessComponent implements OnInit {
  @BlockUI('account-view') accountLoader: NgBlockUI;

  private alert = AlertConstants;
  private accounts = [];

  constructor(
    private bussinesService: BussinesService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  private getAccounts() {
    this.accountLoader.start('Obteniendo...');
    this.bussinesService.list()
      .subscribe(
        result => {
          this.accountLoader.stop();
          this.verifyListAccountsResponse(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  private verifyListAccountsResponse(response) {
    const result = response.result;
    const view = response.view;
    if (result === undefined || result.error === 1) {
      const message = result ? result.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.accounts = view;
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
    this.accountLoader.start('Eliminando...');
    this.bussinesService.delete(id)
      .subscribe(
        result => {
          this.accountLoader.stop();
          this.verifyDeleteAccountResponse(result);
        },
        err => {
          this.accountLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyDeleteAccountResponse(response) {
    const error = response.error;
    if (error === undefined || error === 1) {
      const message = response.message ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Empresa eliminada exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.getAccounts();
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
