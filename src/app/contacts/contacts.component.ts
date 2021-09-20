import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertConstants } from '../utils/alert-constants';
import { ContactsService } from './contacts.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})

export class ContactsComponent implements OnInit {
  @BlockUI('contact-view') contactLoader: NgBlockUI;

  private alert = AlertConstants;
  private contacts = [];

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  private getContacts() {
    this.contactLoader.start('Obteniendo...');
    this.contactsService.list()
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyListContactsResponse(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  private verifyListContactsResponse(response) {
    const result = response.result;
    const view = response.view;
    if (result === undefined || result.error === 1) {
      const message = result ? result.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.contacts = view;
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
    this.contactLoader.start('Eliminando...');
    this.contactsService.delete(id)
      .subscribe(
        result => {
          this.contactLoader.stop();
          this.verifyDeleteContactResponse(result);
        },
        err => {
          this.contactLoader.stop();
          this.showAlert('Ha ocurrido un error intentalo nuevamente mas tarde.', 'error', this.alert.CANCEL_BUTTON_COLOR);
        }
      );
  }

  private verifyDeleteContactResponse(response) {
    const error = response.error;
    if (error === undefined || error === 1) {
      const message = response.message ? response.message : 'Ha ocurrido un error intentalo nuevamente mas tarde.';
      this.showAlert(message, this.alert.ERROR_TYPE, this.alert.CANCEL_BUTTON_COLOR);
    } else {
      this.showAlert('Contacto eliminado exitosamente', this.alert.SUCCESS_TYPE , this.alert.DONE_BUTTON_COLOR);
      this.getContacts();
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
