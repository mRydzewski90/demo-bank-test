import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  transferReceiverInput: Locator;
  transferAccountInput: Locator;
  transferAmountInput: Locator;
  executeTransferButton: Locator;
  closeButton: Locator;
  expectedMessage: Locator;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.getByTestId("transfer_receiver");
    this.transferAccountInput = this.page.getByTestId("form_account_to");
    this.transferAmountInput = this.page.getByTestId("form_amount");
    this.executeTransferButton = this.page.locator("#execute_btn");
    this.closeButton = this.page.getByTestId("close-button");

    this.expectedMessage = this.page.locator("#show_messages");
  }
}
