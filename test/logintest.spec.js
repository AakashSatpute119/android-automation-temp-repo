const { remote } = require("webdriverio");

let driver;

// Load capabilities from environment variables
const platformName = process.env.APPIUM_PLATFORM_NAME || "Android";
const automationName = process.env.APPIUM_AUTOMATION_NAME || "UiAutomator2";
const deviceName = process.env.APPIUM_DEVICE_NAME || "emulator-5554";
const apkPath = process.env.APPIUM_APP_PATH || "App/app.apk";

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "0.0.0.0",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: "info",
  capabilities: {
    platformName,
    "appium:automationName": automationName,
    "appium:deviceName": deviceName,
    "appium:app": apkPath,
  },
};

describe("Mobile App Test", function () {
  this.timeout(60000); // Set a longer timeout for Appium operations

  before(async function () {
    driver = await remote(wdOpts);
  });

  it("login test", async () => {
    if (!driver) {
      throw new Error("Driver is not initialized. Test cannot be run.");
    }

    await driver.setTimeout({ implicit: 20000 });

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
      // await driver.setTimeout({ implicit: 5000 });
      // const notificationPermission = await driver.$(
      //   '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'
      // );
      // await notificationPermission.click();

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
    } finally {
      if (driver) {
        await driver.deleteSession();
      }
    }
  });
});
