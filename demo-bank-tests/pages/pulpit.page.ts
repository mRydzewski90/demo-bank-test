import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  executeButton: Locator;
  closeButton: Locator;
  expectedMessage: Locator;

  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpAgreement: Locator;
  executePhoneButton: Locator;
  topUpButton: Locator;
  expectedMoneyValue: Locator;
  userName: Locator;
  sideMenuComponent: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenuComponent = new SideMenuComponent(this.page);

    this.transferReceiver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmount = this.page.locator("#widget_1_transfer_amount");
    this.transferTitle = this.page.locator("#widget_1_transfer_title");
    this.executeButton = this.page.getByRole("button", { name: "wykonaj" });
    this.closeButton = this.page.getByTestId("close-button");

    this.expectedMessage = this.page.locator("#show_messages");

    this.topUpReceiver = this.page.locator("#widget_1_topup_receiver");
    this.topUpAmount = this.page.locator("#widget_1_topup_amount");
    this.topUpAgreement = this.page.locator("#widget_1_topup_agreement");
    this.executePhoneButton = this.page.locator("#execute_phone_btn");
    this.topUpButton = this.page.getByTestId("close-button");
    this.expectedMoneyValue = this.page.locator("#money_value");
    this.userName = this.page.locator("#user_name");
  }
}
