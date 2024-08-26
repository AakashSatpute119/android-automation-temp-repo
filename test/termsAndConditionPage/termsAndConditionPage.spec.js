import { remote } from "webdriverio";
import assert from "assert";
import * as tAndCLocators from "../../constants/locators/termsAndCondition.js";
import * as constants from "../../constants/constants.js";
import { getWdOpts } from "../../utils/wdOptions.js";

let driver;

describe("Terms and conditions page test", function () {
  this.timeout(100000);

  before(async function () {
    driver = await remote(getWdOpts());
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it("T&C_TC1_Verify able to see privacy policy title in header", async () => {
    await driver.setTimeout({ implicit: 60000 });
    const privacyPolicyHeader = await driver.$(
      tAndCLocators.privacyPolicyHeader
    );
    const isElementDisplayed = await privacyPolicyHeader.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await privacyPolicyHeader.getText();
    assert.strictEqual(
      text,
      constants.privacyPolicyHeaderText,
      `Element text is not ${constants.privacyPolicyHeaderText}, it is '${text}'`
    );
  });

  it("T&C_TC2_Verify privacy policy text is visiable on page", async () => {
    const privacyPolicy = await driver.$(tAndCLocators.privacyPolicy);
    const isElementDisplayed = await privacyPolicy.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await privacyPolicy.getText();
    assert.strictEqual(
      text,
      constants.privacyPolicyText,
      `Element text is not ${constants.privacyPolicyText}, it is '${text}'`
    );
  });

  it("T&C_TC3_Verify slideDown arrow is working", async () => {
    const privacyScoller = driver.$(tAndCLocators.privacyScoller);
    const isElementDisplayed = await privacyScoller.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    await privacyScoller.click();
  });

  it("T&C_TC4_Verify able to see i agree text and checkbox for accept t&c", async () => {
    const iAgree = await driver.$(tAndCLocators.iAgree);
    const isElementDisplayed = await iAgree.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await iAgree.getText();
    assert.strictEqual(
      text,
      constants.iAgreeText,
      `Element text is not ${constants.iAgreeText}, it is '${text}'`
    );
    //check box clickable

    const checkBox = await driver.$(tAndCLocators.checkBox);
    const checkBoxElement = await checkBox.isDisplayed();
    assert.strictEqual(checkBoxElement, true, "Element is not displayed");
    await checkBox.click();
  });

  it("T&C_TC5_Verify user gets popup when try to continue without accepting t&c", async () => {
    const checkBox = await driver.$(tAndCLocators.checkBox);
    await checkBox.click();
    await driver.$(tAndCLocators.aageBadheButton).click();

    const popupMessageOnAageBadhe = await driver.$(
      tAndCLocators.popupMessageOnAageBadhe
    );
    const isElementDisplayed = await popupMessageOnAageBadhe.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await popupMessageOnAageBadhe.getText();
    assert.strictEqual(
      text,
      constants.popupMessageOnAageBadheText,
      `Element text is not ${constants.popupMessageOnAageBadheText}, it is '${text}'`
    );
    await driver.setTimeout({ implicit: 2000 });
    await driver.$(tAndCLocators.okButton).click();
  });
});
