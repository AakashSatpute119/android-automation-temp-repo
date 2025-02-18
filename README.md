
# Appium Automation Setup Guide

## Prerequisites

### 1. Install Java Development Kit (JDK)

- Download and install the latest JDK from the [Oracle website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- Set the `JAVA_HOME` environment variable.

[Watch this video for help on setting `JAVA_HOME`](https://www.youtube.com/watch?v=mAIxIhVJ7N0).

### 2. Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio).
- Configure the Android SDK and AVD (Android Virtual Device) as part of the Android Studio setup.

### 3. Install Node.js and npm

- Download and install the latest LTS version of Node.js from the [official website](https://nodejs.org/).
- Verify the installation by running:

```bash
node -v
npm -v
```

### 4. Install Appium

- Install Appium globally by running:

```bash
npm install -g appium
```

- Install Appium Doctor to verify system dependencies:

```bash
npm install -g appium-doctor
```

- Run `appium-doctor` to check if your system is correctly set up:

```bash
appium-doctor
```

- Install the Appium UIAutomator2 driver:

```bash
npm install -g appium-uiautomator2-driver
```

---

## Project Setup

### 1. Initialize Node.js Project

Navigate to your project directory and run the following to create a `package.json` file:

```bash
npm init -y
```

### 2. Install Project Dependencies

Install the necessary dependencies:

```bash
npm install appium
npm install mocha chai appium mocha-awesome
```

### 3. Add Scripts to package.json

Add the following script in the `scripts` section of your `package.json`:

```json
"scripts": {
  "test": "node --experimental-vm-modules node_modules/.bin/mocha test/*.js"
}
```

---

## Project Structure

Create directories for your tests, following this folder structure:

```
/project-root/
├── test/
│   └── sample-test.js
├── package.json
└── node_modules/
```

---

## Sample Test

Here is a sample test using Appium with Mocha and WebDriverIO:

```js
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
    } finally {
      if (driver) {
        // await driver.deleteSession();
      }
    }
  });
});
```

---

## Run Test Case Locally

1. **Start the Emulator**:
   
   Open Android Studio and start the emulator, or use the following command:

   ```bash
   emulator -avd Pixel_3a_API_30  # Replace with your device name
   ```

2. **Start Appium Server**:

   ```bash
   appium --address 0.0.0.0 --port 4723
   ```

3. **Run the Test**:

   ```bash
   cd /path/to/your/project
   npm test
   ```

---

## CI/CD Setup

### Create Workflow File

Create a `.github/workflows/test.yml` file in your repository with the following configuration:

```yaml
name: Appium Tests

on:
  push:
    branches:
      - "*"

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Install Appium
        run: npm install -g appium

      - name: Enable KVM group perms
        run: |
          echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules
          sudo udevadm control --reload-rules
          sudo udevadm trigger --name-match=kvm

      - name: Gradle cache
        uses: gradle/actions/setup-gradle@v3

      - name: AVD cache
        uses: actions/cache@v4
        id: avd-cache
        with:
          path: |
            ~/.android/avd/*
            ~/.android/adb*
          key: avd-30

      - name: Create AVD, install APK, and run tests
        uses: reactivecircus/android-emulator-runner@v2
        with:
          avd-name: pixel_30
          api-level: 30
          target: google_apis
          arch: x86_64
          profile: pixel
          disable-animations: true
          force-avd-creation: false
          emulator-boot-timeout: 1200
          script: |
            adb wait-for-device
            while [ "$(adb shell getprop sys.boot_completed | tr -d '\r')" != "1" ]; do sleep 1; done
            adb shell input keyevent 82
            adb devices
            sleep 10
            appium --address 0.0.0.0 --port 4723 > /dev/null 2>&1 &
            sleep 10
            npm test
            TEST_EXIT_CODE=$?
            echo "Stopping Appium server running on port 4723"
            PID=$(lsof -ti :4723)
            kill $PID || echo "Failed to kill Appium process on port 4723"
            exit $TEST_EXIT_CODE
```

This GitHub Actions workflow automates running Appium tests on every push or pull request.

