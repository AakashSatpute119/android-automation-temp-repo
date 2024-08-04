import { remote } from "webdriverio";
import assert from "assert";
import * as tAndCLocators from "../../constants/locators/termsAndCondition.js";
import * as constants from "../../constants/constants.js";
import { getWdOpts } from "../../utils/wdOptions.js";
import * as loginPageLocators from "../../constants/locators/loginPage.js";
import * as teacherFlowLocators from "../../constants/locators/teacherFlow.js";
import { refreshScreenByScrollDown } from "../../utils/refresh.js";

let driver;

describe("Teacher school summary page", function () {
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
    await driver.$(teacherFlowLocators.schoolAssessmentSummaryButton).click()
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  // test cases

  it("Verify Teacher able to click on school summary button and redirected to summary page", async () => {
    const headerTextSchoolAkalanSaransh = await driver.$(teacherFlowLocators.headerTextSchoolAkalanSaransh);
    const isDisplayed = await headerTextSchoolAkalanSaransh.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await headerTextSchoolAkalanSaransh.getText();
    assert.strictEqual(
      text,
      constants.headerTextSchoolAkalanSaranshText,
      `Element text is not ${constants.headerTextSchoolAkalanSaranshText}, it is '${text}'`
    );
  });

  it("Verify able to see grade 1,2,3 and all grade buttons and it is clickable", async () => {
    //grade 1
    const grade1Label = await driver.$(teacherFlowLocators.grade1Label);
    const grade1LabelisDisplayed = await grade1Label.isDisplayed();
    assert.strictEqual(grade1LabelisDisplayed, true, "Element is not displayed");
    const textGrade1Label = await grade1Label.getText();
    assert.strictEqual(
      textGrade1Label,
      constants.grade1LabelText,
      `Element text is not ${constants.grade1LabelText}, it is '${textGrade1Label}'`
    );
    await grade1Label.click();

    //grade 2
    const grade2Label = await driver.$(teacherFlowLocators.grade2Label);
    const grade2LabelisDisplayed = await grade2Label.isDisplayed();
    assert.strictEqual(grade2LabelisDisplayed, true, "Element is not displayed");
    const textGrade2Label = await grade2Label.getText();
    assert.strictEqual(
      textGrade2Label,
      constants.grade2LabelText,
      `Element text is not ${constants.grade2LabelText}, it is '${textGrade2Label}'`
    );
    await grade2Label.click();
    
    //grade 3
    const grade3Label = await driver.$(teacherFlowLocators.grade3Label);
    const grade3LabelisDisplayed = await grade3Label.isDisplayed();
    assert.strictEqual(grade3LabelisDisplayed, true, "Element is not displayed");
    const textGrade3Label = await grade3Label.getText();
    assert.strictEqual(
      textGrade3Label,
      constants.grade3LabelText,
      `Element text is not ${constants.grade3LabelText}, it is '${textGrade3Label}'`
    );
    await grade3Label.click();

    // all grade text 
    const allGradesLabel = await driver.$(teacherFlowLocators.allGradesLabel);
    const allGradesLabelisDisplayed = await allGradesLabel.isDisplayed();
    assert.strictEqual(allGradesLabelisDisplayed, true, "Element is not displayed");
    const textAllGrade = await allGradesLabel.getText();
    assert.strictEqual(
      textAllGrade,
      constants.allGradesLabelText,
      `Element text is not ${constants.allGradesLabelText}, it is '${textAllGrade}'`
    );
    await allGradesLabel.click();
  });
 
  it("Verify summary (month) table is displayed on page", async () => {
    const monthTable = await driver.$(teacherFlowLocators.monthTable);
    const isDisplayed = await monthTable.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");

  });

  it("Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 1 is selected", async () => {
    // month column
    const month = await driver.$(teacherFlowLocators.month);
    const monthisDisplayed = await month.isDisplayed();
    assert.strictEqual(monthisDisplayed, true, "Element is not displayed");
    const textMonth = await month.getText();
    assert.strictEqual(
      textMonth,
      constants.monthText,
      `Element text is not ${constants.monthText}, it is '${textMonth}'`
    );

    // total students 
    const totalStudents = await driver.$(teacherFlowLocators.totalStudents);
    const totalStudentsisDisplayed = await totalStudents.isDisplayed();
    assert.strictEqual(totalStudentsisDisplayed, true, "Element is not displayed");
    const texttotalStudents = await totalStudents.getText();
    assert.strictEqual(
      texttotalStudents,
      constants.totalStudentsText,
      `Element text is not ${constants.totalStudentsText}, it is '${texttotalStudents}'`
    );

    
    // students assessed
    const studentsAssessed = await driver.$(teacherFlowLocators.studentsAssessed);
    const studentsAssessedisDisplayed = await studentsAssessed.isDisplayed();
    assert.strictEqual(studentsAssessedisDisplayed, true, "Element is not displayed");
    const textstudentsAssessed = await studentsAssessed.getText();
    assert.strictEqual(
      textstudentsAssessed,
      constants.studentsAssessedText,
      `Element text is not ${constants.studentsAssessedText}, it is '${textstudentsAssessed}'`
    );

        // nipun students
    const nipunStudents = await driver.$(teacherFlowLocators.nipunStudents);
    const nipunStudentsisDisplayed = await nipunStudents.isDisplayed();
    assert.strictEqual(nipunStudentsisDisplayed, true, "Element is not displayed");
    const textnipunStudents = await nipunStudents.getText();
    assert.strictEqual(
    textnipunStudents,
          constants.nipunStudentsText,
          `Element text is not ${constants.nipunStudentsText}, it is '${textnipunStudents}'`
    );

  });


 
  it("Verify Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 2 is selected", async () => {
    await driver.$(teacherFlowLocators.grade2Label).click();
    // month column
   const month = await driver.$(teacherFlowLocators.month);
   const monthisDisplayed = await month.isDisplayed();
   assert.strictEqual(monthisDisplayed, true, "Element is not displayed");
   const textMonth = await month.getText();
   assert.strictEqual(
     textMonth,
     constants.monthText,
     `Element text is not ${constants.monthText}, it is '${textMonth}'`
   );

   // total students 
   const totalStudents = await driver.$(teacherFlowLocators.totalStudents);
   const totalStudentsisDisplayed = await totalStudents.isDisplayed();
   assert.strictEqual(totalStudentsisDisplayed, true, "Element is not displayed");
   const texttotalStudents = await totalStudents.getText();
   assert.strictEqual(
     texttotalStudents,
     constants.totalStudentsText,
     `Element text is not ${constants.totalStudentsText}, it is '${texttotalStudents}'`
   );

   
   // students assessed
   const studentsAssessed = await driver.$(teacherFlowLocators.studentsAssessed);
   const studentsAssessedisDisplayed = await studentsAssessed.isDisplayed();
   assert.strictEqual(studentsAssessedisDisplayed, true, "Element is not displayed");
   const textstudentsAssessed = await studentsAssessed.getText();
   assert.strictEqual(
     textstudentsAssessed,
     constants.studentsAssessedText,
     `Element text is not ${constants.studentsAssessedText}, it is '${textstudentsAssessed}'`
   );

       // nipun students
   const nipunStudents = await driver.$(teacherFlowLocators.nipunStudents);
   const nipunStudentsisDisplayed = await nipunStudents.isDisplayed();
   assert.strictEqual(nipunStudentsisDisplayed, true, "Element is not displayed");
   const textnipunStudents = await nipunStudents.getText();
   assert.strictEqual(
   textnipunStudents,
         constants.nipunStudentsText,
         `Element text is not ${constants.nipunStudentsText}, it is '${textnipunStudents}'`
   );

  });

  it("Verify Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 3 is selected", async () => {
    await driver.$(teacherFlowLocators.grade3Label).click();
    // month column
   const month = await driver.$(teacherFlowLocators.month);
   const monthisDisplayed = await month.isDisplayed();
   assert.strictEqual(monthisDisplayed, true, "Element is not displayed");
   const textMonth = await month.getText();
   assert.strictEqual(
     textMonth,
     constants.monthText,
     `Element text is not ${constants.monthText}, it is '${textMonth}'`
   );

   // total students 
   const totalStudents = await driver.$(teacherFlowLocators.totalStudents);
   const totalStudentsisDisplayed = await totalStudents.isDisplayed();
   assert.strictEqual(totalStudentsisDisplayed, true, "Element is not displayed");
   const texttotalStudents = await totalStudents.getText();
   assert.strictEqual(
     texttotalStudents,
     constants.totalStudentsText,
     `Element text is not ${constants.totalStudentsText}, it is '${texttotalStudents}'`
   );

   
   // students assessed
   const studentsAssessed = await driver.$(teacherFlowLocators.studentsAssessed);
   const studentsAssessedisDisplayed = await studentsAssessed.isDisplayed();
   assert.strictEqual(studentsAssessedisDisplayed, true, "Element is not displayed");
   const textstudentsAssessed = await studentsAssessed.getText();
   assert.strictEqual(
     textstudentsAssessed,
     constants.studentsAssessedText,
     `Element text is not ${constants.studentsAssessedText}, it is '${textstudentsAssessed}'`
   );

       // nipun students
   const nipunStudents = await driver.$(teacherFlowLocators.nipunStudents);
   const nipunStudentsisDisplayed = await nipunStudents.isDisplayed();
   assert.strictEqual(nipunStudentsisDisplayed, true, "Element is not displayed");
   const textnipunStudents = await nipunStudents.getText();
   assert.strictEqual(
   textnipunStudents,
         constants.nipunStudentsText,
         `Element text is not ${constants.nipunStudentsText}, it is '${textnipunStudents}'`
   );
 
  });



 
});
