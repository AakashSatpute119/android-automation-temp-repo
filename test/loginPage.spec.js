import { remote } from "webdriverio";
import assert from "assert";
import * as tAndCLocators from "../constants/locators/termsAndCondition.js";
import * as constants from "../constants/constants.js";
import { getWdOpts } from "../utils/wdOptions.js";
import * as loginPageLocators from "../constants/locators/loginPage.js";

let driver;

describe("Login Page Test", function () {
  this.timeout(100000);

  before(async function () {
    driver = await remote(getWdOpts());
    await driver.setTimeout({ implicit: 60000 });
    const privacyScoller = driver.$(tAndCLocators.privacyScoller);
    await privacyScoller.click();
    const checkBox = await driver.$(tAndCLocators.checkBox);
    await checkBox.click();
    await driver.$(tAndCLocators.aageBadheButton).click();
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it("LP_TC1_Verify nipun lakshya app logo and tittle is displayed on login page", async () => {
    const logoAndAppName = await driver.$(
      loginPageLocators.nipunlakshyaTextAndLogoInHeader
    );
    await logoAndAppName.isDisplayed();
  });

  it("LP_TC2_Verify app version is displayed", async () => {
    const appVersion = await driver.$(loginPageLocators.appVersion);
    await appVersion.isDisplayed();
  });

  it("LP_TC3_Verify teacher logo image is displayed", async () => {
    const teacherLogoImg = await driver.$(loginPageLocators.teacherLogoImg);
    await teacherLogoImg.isDisplayed();
  });

  it("LP_TC4_Verify mentor,Teacher,Examiner title text is visiable on page", async () => {
    const titleTextOnLoginPage = await driver.$(loginPageLocators.titleOnPage);
    const isElementDisplayed = await titleTextOnLoginPage.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await titleTextOnLoginPage.getText();
    assert.strictEqual(
      text,
      constants.titleTextOnLoginPage,
      `Element text is not ${constants.titleTextOnLoginPage}, it is '${text}'`
    );
  });

  it("LP_TC5_Verify enter register number text is visiable", async () => {
    const enterRegisterNumber = await driver.$(
      loginPageLocators.enterRegisterNumber
    );
    const isElementDisplayed = await enterRegisterNumber.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await enterRegisterNumber.getText();
    assert.strictEqual(
      text,
      constants.enterRegisterNumberText,
      `Element text is not ${constants.enterRegisterNumberText}, it is '${text}'`
    );
  });

  it("LP_TC6_Verify mobile number input box is visiable", async () => {
    const mobileNumberInputBox = await driver.$(
      loginPageLocators.mobileNumberInputBoxDefaultText
    );
    const isElementDisplayed = await mobileNumberInputBox.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await mobileNumberInputBox.getText();
    assert.strictEqual(
      text,
      constants.mobileNumberInputBoxText,
      `Element text is not ${constants.mobileNumberInputBoxText}, it is '${text}'`
    );
  });

  it("LP_TC7_Verify mobile number not registered ? text is visiable", async () => {
    const numberNotregisted = await driver.$(
      loginPageLocators.numberNotregisted
    );
    const isElementDisplayed = await numberNotregisted.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await numberNotregisted.getText();
    assert.strictEqual(
      text,
      constants.numberNotregistedText,
      `Element text is not ${constants.numberNotregistedText}, it is '${text}'`
    );
  });

  it("LP_TC8_Verify helpline number is displayed and enabled", async () => {
    const helplineNumber = await driver.$(loginPageLocators.helplineNumber);
    const isElementDisplayed = await helplineNumber.isDisplayed();
    const isElementEnable = await helplineNumber.isEnabled();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await helplineNumber.getText();
    assert.strictEqual(
      text,
      constants.helplineNumberText,
      `Element text is not ${constants.helplineNumberText}, it is '${text}'`
    );
  });

  it("LP_TC9_Verify mobile number field should accept only 10 digits", async () => {
    const mobileNumberInputBox = await driver.$(
      loginPageLocators.mobileNumberInputBox
    );
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.tenDigitNumber);
    let value = await mobileNumberInputBox.getText();
    assert.strictEqual(
      value,
      constants.tenDigitNumber,
      "Input box should accept 10 digits"
    );
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.moreThanTenDigitNumber);
    value = await mobileNumberInputBox.getText();
    assert.strictEqual(
      value,
      constants.tenDigitNumber,
      "Input box should only accept 10 digits"
    );
  });

  it("LP_TC10_Verify users gets popup when mobile number is invalid", async () => {
    const mobileNumberInputBox = await driver.$(
      loginPageLocators.mobileNumberInputBox
    );
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.tenDigitNumber);
    const sendOtpButton = await driver.$(loginPageLocators.sendOtpButton);
    await sendOtpButton.click();

    //please check number text
    const pleaseCheckNumber = await driver.$(
      loginPageLocators.pleaseCheckNumber
    );
    const isElementDisplayed = await pleaseCheckNumber.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await pleaseCheckNumber.getText();
    assert.strictEqual(
      text,
      constants.pleaseCheckNumberText,
      `Element text is not ${constants.pleaseCheckNumberText}, it is '${text}'`
    );

    // enter correct number
    const pleaseEnterCorrectNumber = await driver.$(
      loginPageLocators.pleaseEnterCorrectNumber
    );
    const pleaseEnterCorrectNumberIsDisplayed =
      await pleaseCheckNumber.isDisplayed();
    assert.strictEqual(
      pleaseEnterCorrectNumberIsDisplayed,
      true,
      "Element is not displayed"
    );
    const pleaseEnterCorrectNumberText =
      await pleaseEnterCorrectNumber.getText();
    assert.strictEqual(
      pleaseEnterCorrectNumberText,
      constants.pleaseEnterCorrectNumberText,
      `Element text is not ${constants.pleaseEnterCorrectNumberText}, it is '${pleaseEnterCorrectNumberText}'`
    );
    await driver.$(loginPageLocators.okButton).click();
  });

  it("LP_TC11_Verify users gets popup when mobile number is not registered on prerna portal.", async () => {
    const mobileNumberInputBox = await driver.$(
      loginPageLocators.mobileNumberInputBox
    );
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.mobileNotRegisteredOnPortal);
    const sendOtpButton = await driver.$(loginPageLocators.sendOtpButton);
    await sendOtpButton.click();
    //unable to send otp text on popup
    const unableToSendOtp = await driver.$(loginPageLocators.unableToSendOtp);
    const unableToSendOtpIsDisplayed = await unableToSendOtp.isDisplayed();
    assert.strictEqual(
      unableToSendOtpIsDisplayed,
      true,
      "Element is not displayed"
    );
    const unableToSendOtpText = await unableToSendOtp.getText();
    assert.strictEqual(
      unableToSendOtpText,
      constants.unableToSendOtpText,
      `Element text is not ${constants.unableToSendOtpText}, it is '${unableToSendOtpText}'`
    );

    // number is not registered on prerana portal text
    const numberIsNotRegisteredOnPernaPortal = await driver.$(
      loginPageLocators.numberIsNotRegisteredOnPernaPortal
    );
    const numberIsNotRegisteredOnPernaPortalIsDisplayed =
      await unableToSendOtp.isDisplayed();
    assert.strictEqual(
      numberIsNotRegisteredOnPernaPortalIsDisplayed,
      true,
      "Element is not displayed"
    );
    const numberIsNotRegisteredOnPernaPortalText =
      await numberIsNotRegisteredOnPernaPortal.getText();
    assert.strictEqual(
      numberIsNotRegisteredOnPernaPortalText,
      constants.numberIsNotRegisteredOnPernaPortalText,
      `Element text is not ${constants.numberIsNotRegisteredOnPernaPortalText}, it is '${numberIsNotRegisteredOnPernaPortalText}'`
    );
    await driver.$(loginPageLocators.okButton).click();
  });
});
