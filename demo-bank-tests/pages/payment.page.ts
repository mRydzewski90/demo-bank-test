import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
  transferReceiverInput: Locator;
  transferAccountInput: Locator;
  transferAmountInput: Locator;
  executeTransferButton: Locator;
  closeButton: Locator;
  expectedMessage: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {

    this.sideMenuComponent = new SideMenuComponent(this.page);

    this.transferReceiverInput = this.page.getByTestId("transfer_receiver");
    this.transferAccountInput = this.page.getByTestId("form_account_to");
    this.transferAmountInput = this.page.getByTestId("form_amount");
    this.executeTransferButton = this.page.locator("#execute_btn");
    this.closeButton = this.page.getByTestId("close-button");

    this.expectedMessage = this.page.locator("#show_messages");
  }
}
