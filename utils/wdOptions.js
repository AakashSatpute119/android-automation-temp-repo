import { remote } from "webdriverio";

export const getWdOpts = () => {
  const platformName = process.env.APPIUM_PLATFORM_NAME || "Android";
  const automationName = process.env.APPIUM_AUTOMATION_NAME || "UiAutomator2";
  const deviceName = process.env.APPIUM_DEVICE_NAME || "emulator-5554";
  const apkPath = process.env.APPIUM_APP_PATH || "App/app.apk";

  return {
    hostname: process.env.APPIUM_HOST || "0.0.0.0",
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: "info",
    capabilities: {
      platformName,
      "appium:automationName": automationName,
      "appium:deviceName": deviceName,
      "appium:app": apkPath,
      "appium:autoGrantPermissions": true,
    //   "noReset": true,  
    // "fullReset": false 
    },
  };
};
