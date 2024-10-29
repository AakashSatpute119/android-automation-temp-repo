const { remote } = require("webdriverio");
const assert = require("assert");

let driver;

// // Load capabilities from environment variables
// const platformName = process.env.APPIUM_PLATFORM_NAME || "Android";
// const automationName = process.env.APPIUM_AUTOMATION_NAME || "UiAutomator2";
// const deviceName = process.env.APPIUM_DEVICE_NAME || "emulator-5554";
// const apkPath = process.env.APPIUM_APP_PATH || "App/app.apk";

// const wdOpts = {
//   hostname: process.env.APPIUM_HOST || "0.0.0.0",
//   port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
//   logLevel: "info",
//   capabilities: {
//     platformName,
//     "appium:automationName": automationName,
//     "appium:deviceName": deviceName,
//     "appium:app": apkPath,
//   },
// };

describe("Mobile App Test", function () {
  this.timeout(100000); // Set a longer timeout for Appium operations

  before(async function () {
    driver = await remote(wdOpts);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it("login test", async () => {
    if (!driver) {
      throw new Error("Driver is not initialized. Test cannot be run.");
    }

    await driver.setTimeout({ implicit: 60000 });

    try {
      const privacyScrollerElement = await driver.$(
        '//android.widget.ImageView[@resource-id="org.samagra.missionPrerna:id/privacy_scroller"]'
      );
      await privacyScrollerElement.click();
      await driver.setTimeout({ implicit: 2000 });

      const privacyCheckElement = await driver.$(
        '//android.widget.CheckBox[@resource-id="org.samagra.missionPrerna:id/privacy_check"]'
      );
      await privacyCheckElement.click();
      await driver.setTimeout({ implicit: 2000 });

      const privacyAcceptElement = await driver.$(
        '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/accept_policy"]'
      );
      await privacyAcceptElement.click();
      await driver.setTimeout({ implicit: 5000 });
      await driver.setTimeout({ implicit: 5000 });
      const noInputBox = await driver.$(
        '//android.widget.EditText[@resource-id="org.samagra.missionPrerna:id/etResult"]'
      );
      await noInputBox.setValue("8668727053");

      const sendOtpButton = await driver.$(
        '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/btnCollect"]'
      );
      await sendOtpButton.click();
      await driver.setTimeout({ implicit: 6000 });

      const OTP = await driver.$(
        '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)'
      );
      await OTP.addValue("0000");

      const submitOtp = await driver.$(
        '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/validate_button"]'
      );
      await submitOtp.click();

      const loggedInSuccessfully = await driver.$(
        '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/cta_button"]'
      );
      loggedInSuccessfully.click();
      const teacherProfileText = await driver.$(
        '//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title_mentor_details"]'
      );
      // Verify the element exists
      const isElementDisplayed = await teacherProfileText.isDisplayed();
      assert.strictEqual(isElementDisplayed, true, "Element is not displayed");

      // Get the text of the element
      const text = await teacherProfileText.getText();

      // Verify the text is 'abc'
      assert.strictEqual(
        text,
        "शिक्षक प्रोफाइल",
        `Element text is not 'शिक्षक प्रोफाइल', it is '${text}'`
      );
      const vidyarathiAkalanButton = await driver.$(
        '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/mtl_btn_setup_assessment"]'
      );
      await vidyarathiAkalanButton.click();

      const aankalnkare = await driver.$(
        '(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/btTakeAssessment"])[1]'
      );
      await aankalnkare.click();

      await driver.setTimeout({ implicit: 20000 });

      firstRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.missionPrerna:id/text_label"])[1]'
        )
        .click();
      secondRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.missionPrerna:id/text_label"])[4]'
        )
        .click();
      thirdRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.missionPrerna:id/text_label"])[7]'
        )
        .click();
      fourthRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.missionPrerna:id/text_label"])[10]'
        )
        .click();
      const aageBadheButton = await driver.$(
        '//android.widget.TextView[@content-desc="आगे बढ़े"]'
      );
      await aageBadheButton.click();
    } finally {
      if (driver) {
        // await driver.deleteSession();
      }
    }
  });
});
