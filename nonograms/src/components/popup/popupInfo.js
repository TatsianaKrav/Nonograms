import { Popup } from "./popup.js";

export class PopupInfo extends Popup {
    constructor() {
        super();
    }

    create() {
        super.create();
        this.modalInfo.setInnerText('There is not saved games');

        const field = document.getElementsByClassName('field')[0];
        field.classList.remove('continue');
    }
}