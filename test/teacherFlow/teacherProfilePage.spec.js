import { remote } from "webdriverio";
import assert from "assert";
import * as tAndCLocators from "../../constants/locators/termsAndCondition.js";
import * as constants from "../../constants/constants.js";
import { getWdOpts } from "../../utils/wdOptions.js";
import * as loginPageLocators from "../../constants/locators/loginPage.js";
import * as teacherFlowLocators from "../../constants/locators/teacherFlow.js";
import { refreshScreenByScrollDown } from "../../utils/refresh.js";

let driver;

describe("Teacher profile page test cases", function () {
  this.timeout(100000);

  before(async function () {
    driver = await remote(getWdOpts());
    await driver.setTimeout({ implicit: 60000 });
    const privacyScoller = driver.$(tAndCLocators.privacyScoller);
    await privacyScoller.click();
    const checkBox = await driver.$(tAndCLocators.checkBox);
    await checkBox.click();
    await driver.$(tAndCLocators.aageBadheButton).click();
    const mobileNumberInputBox = await driver.$(
      loginPageLocators.mobileNumberInputBox
    );
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.teacherValidMobileNumber);
    (await driver.$(loginPageLocators.sendOtpButton)).click();
    await driver.setTimeout({ implicit: 6000 });
    const OTP = await driver.$(loginPageLocators.otpInputBox);
    await OTP.addValue(constants.defaultOtp);
    const submitOtp = await driver.$(loginPageLocators.submitOtpButton);
    await submitOtp.click();

    const loggedInSuccessfully = await driver.$(
      loginPageLocators.buttonOnLoggedInsuccessfullyPopUp
    );
    loggedInSuccessfully.click();
    // refresh on screen
    await refreshScreenByScrollDown(driver);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  // test cases

  it("Verify Teacher profile is logged in successfully ", async () => {
    const teacherProfileText = await driver.$(
      teacherFlowLocators.teacherProfileText
    );
    // Verify the element exists
    const isElementDisplayed = await teacherProfileText.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await teacherProfileText.getText();
    assert.strictEqual(
      text,
      constants.teacherProfileText,
      `Element text is not ${constants.teacherProfileText}, it is '${text}'`
    );
  });

  it("Verify Nipun Lakshya app title is visiable in header on teacher profile page", async () => {
    const appName = await driver.$(teacherFlowLocators.nipunLakshyaAppTitle);
    // Verify the element exists
    const isElementDisplayed = await appName.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await appName.getText();
    assert.strictEqual(
      text,
      constants.nipunLakshyaAppTitle,
      `Element text is not ${constants.nipunLakshyaAppTitle}, it is '${text}'`
    );
  });

  it("Verify app version is displayed in header", async () => {
    const appVersion = await driver.$(teacherFlowLocators.appVersion);
    // Verify the element exists
    const isElementDisplayed = await appVersion.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const text = await appVersion.getText();
    assert.strictEqual(
      text,
      constants.appVersiontext,
      `Element text is not ${constants.appVersiontext}, it is '${text}'`
    );
  });

  it("Verify chatbot icon is visiable", async () => {
    const chatbotIcon = await driver.$(teacherFlowLocators.chatbotIcon);
    const isElementDisplayed = await chatbotIcon.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
  });

  it("Verify teacher profile details are visiable (name,district,udise,block)", async () => {
    // name
    const nameText = await driver.$(teacherFlowLocators.teacherName);
    const isNameDisplayed = await nameText.isDisplayed();
    assert.strictEqual(isNameDisplayed, true, "Element is not displayed");
    const nametext = await nameText.getText();
    assert.strictEqual(
      nametext,
      constants.nameText,
      `Element text is not ${constants.nameText}, it is '${nametext}'`
    );

    //udise
    const udise = await driver.$(teacherFlowLocators.uside);
    const isUdiseDisplayed = await udise.isDisplayed();
    assert.strictEqual(isUdiseDisplayed, true, "Element is not displayed");
    const udisetext = await udise.getText();
    assert.strictEqual(
      udisetext,
      constants.udiseText,
      `Element text is not ${constants.udiseText}, it is '${udisetext}'`
    );

    // district
    const district = await driver.$(teacherFlowLocators.district);
    const isDistrictDisplayed = await district.isDisplayed();
    assert.strictEqual(isDistrictDisplayed, true, "Element is not displayed");
    const districtText = await district.getText();
    assert.strictEqual(
      districtText,
      constants.districtText,
      `Element text is not ${constants.districtText}, it is '${districtText}'`
    );

    //Block
    const block = await driver.$(teacherFlowLocators.block);
    const isBlockDisplayed = await block.isDisplayed();
    assert.strictEqual(isBlockDisplayed, true, "Element is not displayed");
    const blockText = await block.getText();
    assert.strictEqual(
      blockText,
      constants.blockText,
      `Element text is not ${constants.blockText}, it is '${blockText}'`
    );
  });

  it("Verify Shikshak Aklan Saransh label text is visiable.", async () => {
    const teacherAnkalanSaransh = await driver.$(
      teacherFlowLocators.teacherAnkalanSaransh
    );
    const isElementDisplayed = await teacherAnkalanSaransh.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
    const teacherAnkalanSaranshText = await teacherAnkalanSaransh.getText();
    assert.strictEqual(
      teacherAnkalanSaranshText,
      constants.teacherAnkalanSaranshText,
      `Element text is not ${constants.teacherAnkalanSaranshText}, it is '${teacherAnkalanSaranshText}'`
    );
  });

  it("Verify vartman sapata aklan text is visiable ", async () => {
    //weekly student assessed vartaman sapta text
    const currentMonthAnkalanElement = await driver.$(
      teacherFlowLocators.currentMonthAnkalan
    );
    const currentMonthAnkalanElementIsDisplayed =
      await currentMonthAnkalanElement.isDisplayed();
    assert.strictEqual(
      currentMonthAnkalanElementIsDisplayed,
      true,
      "Element is not displayed"
    );
    const currentMonthAnkalanElementtext =
      await currentMonthAnkalanElement.getText();
    assert.strictEqual(
      currentMonthAnkalanElementtext,
      constants.vartamanSaptahikAkalanText,
      `Element text is not ${constants.vartamanSaptahikAkalanText}, it is '${currentMonthAnkalanElementtext}'`
    );
  });

  it("Verify count of student assessed in week text and count is visiable", async () => {
    // student assessed in week text
    const studentsAssessedInWeek = await driver.$(
      teacherFlowLocators.countOfStudentAssesedInWeek
    );
    const countOfStudentAssesedInWeekElement =
      await studentsAssessedInWeek.isDisplayed();
    assert.strictEqual(
      countOfStudentAssesedInWeekElement,
      true,
      "Element is not displayed"
    );
    const studentsAssessedInWeektext = await studentsAssessedInWeek.getText();
    assert.strictEqual(
      studentsAssessedInWeektext,
      constants.studentsAssessedInWeekText,
      `Element text is not ${constants.studentsAssessedInWeekText}, it is '${studentsAssessedInWeektext}'`
    );
  });
  it("Verify count of student nipun in week text and count is visiable", async () => {
    // nipun students in week
    const studentsNipundInWeek = await driver.$(
      teacherFlowLocators.countNipunStudentsInWeek
    );
    const studentsNipundInWeekElement =
      await studentsNipundInWeek.isDisplayed();
    assert.strictEqual(
      studentsNipundInWeekElement,
      true,
      "Element is not displayed"
    );
    const studentsNipundInWeekText = await studentsNipundInWeek.getText();
    assert.strictEqual(
      studentsNipundInWeekText,
      constants.nipunStudentsInWeekText,
      `Element text is not ${constants.nipunStudentsInWeekText}, it is '${studentsNipundInWeekText}'`
    );
  });

  it("Verify count of student assessed in month text and count is visiable", async () => {
    // student assessed in month
    const studentsAssessedInMonth = await driver.$(
      teacherFlowLocators.countOfStudentAssesedInMonth
    );
    const studentsAssessedInMonthElement =
      await studentsAssessedInMonth.isDisplayed();
    assert.strictEqual(
      studentsAssessedInMonthElement,
      true,
      "Element is not displayed"
    );
    const studentsAssessedInMonthtext = await studentsAssessedInMonth.getText();
    assert.strictEqual(
      studentsAssessedInMonthtext,
      constants.studentsAssessedInMonthText,
      `Element text is not ${constants.studentsAssessedInMonthText}, it is '${studentsAssessedInMonthtext}'`
    );
  });

  it("Verify count of student nipun in month text and count is visiable", async () => {
    // nipun students in month
    const studentsNipundInMonth = await driver.$(
      teacherFlowLocators.countNipunStudentsInMonth
    );
    const studentsNipundInMonthElement =
      await studentsNipundInMonth.isDisplayed();
    assert.strictEqual(
      studentsNipundInMonthElement,
      true,
      "Element is not displayed"
    );
    const studentsNipundInMonthText = await studentsNipundInMonth.getText();
    assert.strictEqual(
      studentsNipundInMonthText,
      constants.nipunStudentsInWeekText,
      `Element text is not ${constants.nipunStudentsInMonthText}, it is '${studentsNipundInMonthText}'`
    );
  });

  it("Verify vidyarthi akalan button is visiable", async () => {
    const studentAssessButton = await driver.$(
      teacherFlowLocators.studentAkalanButton
    );
    const studentAssessButtonElement = await studentAssessButton.isDisplayed();
    assert.strictEqual(
      studentAssessButtonElement,
      true,
      "Element is not displayed"
    );
    const studentAssessButtonText = await studentAssessButton.getText();
    assert.strictEqual(
      studentAssessButtonText,
      constants.vidyarthiAkalanButoonText,
      `Element text is not ${constants.vidyarthiAkalanButoonText}, it is '${studentAssessButtonText}'`
    );
  });
  it("Verify school summary button is visiable", async () => {
    const schoolAssessmentSummaryButton = await driver.$(
      teacherFlowLocators.schoolAssessmentSummaryButton
    );
    const schoolAssessmentSummaryButtonElement =
      await schoolAssessmentSummaryButton.isDisplayed();
    assert.strictEqual(
      schoolAssessmentSummaryButtonElement,
      true,
      "Element is not displayed"
    );
    const schoolAssessmentSummaryButtonText =
      await schoolAssessmentSummaryButton.getText();
    assert.strictEqual(
      schoolAssessmentSummaryButtonText,
      constants.vidyalayKeAkalanKaSaransButtonText,
      `Element text is not ${constants.vidyalayKeAkalanKaSaransButtonText}, it is '${schoolAssessmentSummaryButtonText}'`
    );
  });
});
