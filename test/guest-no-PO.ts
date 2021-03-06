import { expect } from "chai";
import * as faker from "faker";
describe("Guest", function() {
  it("should be able to buy item", function() {
    browser.url("/rubber-ducks-c-1/red-duck-p-3");
    const quantityItmBeforeAddToCard = Number($("span.quantity").getText());
    const quantitySumBeforeAddToCard = Number(
      $("span.formatted_value")
        .getText()
        .slice(1)
    );
    $("button.btn-success").click();
    browser.pause(1500); //bad practics
    const quantityItmAftAddToCard = Number($("span.quantity").getText());
    const quantitySumAftAddToCard = Number(
      $("span.formatted_value")
        .getText()
        .slice(1)
    );
    expect(quantityItmAftAddToCard).to.equal(quantityItmBeforeAddToCard + 1);
    expect(quantitySumAftAddToCard).to.equal(
      quantitySumBeforeAddToCard + quantitySumAftAddToCard
    );
    $("#cart").click();
    $('[name="company"]').setValue("CompanyName");
    $('input[name="address2"]').setValue(faker.address.streetAddress());
    $('input[name="tax_id"]').setValue(faker.random.number(6));
    $('input[name="firstname"]').setValue("firstname");
    $('input[name="lastname"]').setValue("lastname");
    $('input[name="city"]').setValue("city");
    $('input[name="postcode"]').setValue("345624");
    $('input[name="address1"]').setValue(faker.address.streetAddress());
    $('[name="email"]').setValue(faker.internet.email());
    $('[name="phone"]').setValue(faker.phone.phoneNumberFormat());
    $('[name="save_customer_details"][disabled="disabled"]').waitForExist(
      1500,
      true,
      "Wait element NOT exist in dome"
    ); //wait for NOT exist
    $('button[name="save_customer_details"]').click();
    browser.waitUntil(
      () => $('button[name="confirm_order"]').getAttribute("disabled") == null,
      undefined,
      "Confirm order button should become enabled to click"
    );
    $('button[name="confirm_order"]').click();
    $("#box-order-success>.title").waitForDisplayed(
      7000,
      false,
      "Order is completed"
    );
    const conformationText = $("#box-order-success>.title").getText();
    expect(conformationText).to.match(
      /Your order #[1-9]{1,3} is successfully completed!/
    );
  });
});
