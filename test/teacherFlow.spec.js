import { remote } from "webdriverio";
import assert, { doesNotReject } from "assert";
import * as tAndCLocators from "../constants/locators/termsAndCondition.js";
import * as constants from "../constants/constants.js";
import { getWdOpts } from "../utils/wdOptions.js";
import * as loginPageLocators from "../constants/locators/loginPage.js";
import * as teacherFlowLocators from "../constants/locators/teacherFlow.js";
import { refreshScreenByScrollDown ,scrollUp,performSwipe} from "../utils/gestures.js";
import { fillOdkForm } from "../utils/fillOdkForm.js";
import * as odkLocators from "../constants/locators/odkFlow.js"
import {selectRandomStudent,studentData,handleBsttFlow} from "../utils/commonFunctions.js"
 
let driver;

describe("[Teacher Flow] Profile page test cases", function () {
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

  // test cases

  it("TF_TC1_Verify Teacher profile is logged in successfully ", async () => {
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

  it("TF_TC2_Verify Nipun Lakshya app title is visiable in header on teacher profile page", async () => {
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

  it("TF_TC3_Verify app version is displayed in header", async () => {
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

  it("TF_TC4_Verify chatbot icon is visiable", async () => {
    const chatbotIcon = await driver.$(teacherFlowLocators.chatbotIcon);
    const isElementDisplayed = await chatbotIcon.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
  });

  it("TF_TC5_Verify teacher profile details are visiable (name,district,udise,block)", async () => {
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
    await driver.setTimeout({ implicit: 20000 });

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

  it("TF_TC6_Verify Shikshak Aklan Saransh label text is visiable.", async () => {
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

  it("TF_TC7_Verify vartman sapata aklan text is visiable ", async () => {
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

  it("TF_TC8_Verify count of student assessed in week text and count is visiable", async () => {
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

  it("TF_TC9_Verify count of student nipun in week text and count is visiable", async () => {
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

  it.skip("TF_TC10_Verify count of student assessed count is visiable", async () => {
    console.log("Can be run locally only");
    // student assessed in month
    await refreshScreenByScrollDown(driver);
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

  });

  it.skip("TF_TC11_Verify count of student nipun in month text and count is visiable", async () => {
    console.log("Can be run locally only")
    // nipun students in month
    await refreshScreenByScrollDown(driver);
    await driver.setTimeout({ implicit: 20000 });

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
  });

  it("TF_TC12_Verify vidyarthi akalan button is visiable", async () => {
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
  
  it("TF_TC13_Verify school summary button is visiable", async () => {
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

describe("[Teacher Flow] School summary page", function () {
  this.timeout(100000);

  before(async function () {
    // refresh on screen
    await refreshScreenByScrollDown(driver);
    await driver.$(teacherFlowLocators.schoolAssessmentSummaryButton).click()
  });

  // test cases

  it("TF_TC14_Verify Teacher able to click on school summary button and redirected to summary page", async () => {
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

  it("TF_TC15_Verify able to see grade 1,2,3 and all grade buttons and it is clickable", async () => {
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
 
  it("TF_TC16_Verify summary (month) table is displayed on page", async () => {
    const monthTable = await driver.$(teacherFlowLocators.monthTable);
    const isDisplayed = await monthTable.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");

  });

  it("TF_TC17_Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 1 is selected", async () => {
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


 
  it("TF_TC18_Verify Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 2 is selected", async () => {
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

  it("TF_TC19_Verify Verify month,total students,assessed students,nipun students this columns text are visiable on page when grade 3 is selected", async () => {
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
  after(async function () {
    if (driver) {
      await refreshScreenByScrollDown(driver);
      await driver.$(teacherFlowLocators.backButtonOnSchoolSummaryPage).click();
    }
  });
});


describe("[Teacher Flow] Student listing page",function(){
  this.timeout(100000);
  before(async function () {
    // refresh on screen
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
  });

  it("TF_TC20_Verify clicking on vidhyarthi akalan button landed on student listing page ", async () => {
    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    const isDisplayed = await selectGradeElement.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await selectGradeElement.getText();
    assert.strictEqual(
      text,
      constants.selectGradeText,
      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    );
  });

  it("TF_TC21_Verify able to see grade 1,2,3 and all grade buttons and it is clickable", async () => {
    //grade 1
    const grade1Label = await driver.$(teacherFlowLocators.grade1Label);
    await grade1Label.click();
    const grade1LabelisDisplayed = await grade1Label.isDisplayed();
    assert.strictEqual(grade1LabelisDisplayed, true, "Element is not displayed");
    const textGrade1Label = await grade1Label.getText();
    assert.strictEqual(
      textGrade1Label,
      constants.grade1LabelText,
      `Element text is not ${constants.grade1LabelText}, it is '${textGrade1Label}'`
    );

    //grade 2
    const grade2Label = await driver.$(teacherFlowLocators.grade2Label);
    await grade2Label.click();
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
    await grade3Label.click();
    const grade3LabelisDisplayed = await grade3Label.isDisplayed();
    assert.strictEqual(grade3LabelisDisplayed, true, "Element is not displayed");
    const textGrade3Label = await grade3Label.getText();
    assert.strictEqual(
      textGrade3Label,
      constants.grade3LabelText,
      `Element text is not ${constants.grade3LabelText}, it is '${textGrade3Label}'`
    );

  });

  it("TF_TC23_Verify able to see list of the students when grade 1 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC24_Verify able to see list of the students when grade 2 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade2Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC25_Verify able to see list of the students when grade 3 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade3Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC26_Verify able to see Student name,Roll number,last assessed date and akalan kare button.",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click();
    //student name
    const studentName = await driver.$(teacherFlowLocators.studentName)
    const studentNameIsDisplayed = await studentName.isDisplayed();
    assert.strictEqual(studentNameIsDisplayed, true, "Element is not displayed");

    //roll number 
    const rollNumber = await driver.$(teacherFlowLocators.studentRollNo)
    const rollNumberIsDisplayed = await rollNumber.isDisplayed();
    assert.strictEqual(rollNumberIsDisplayed, true, "Element is not displayed");

    
    //Last assessed date
    const studentLastAssessedDate = await driver.$(teacherFlowLocators.studentLastAssessedDate)
    const studentLastAssessedDateIsDisplayed = await studentLastAssessedDate.isDisplayed();
    assert.strictEqual(studentLastAssessedDateIsDisplayed, true, "Element is not displayed");
    
    //aakalan kare button 
    const takeAssessmentButton = await driver.$(teacherFlowLocators.takeAssessmentButton)
    const takeAssessmentButtonIsDisplayed = await takeAssessmentButton.isDisplayed();
    assert.strictEqual(takeAssessmentButtonIsDisplayed, true, "Element is not displayed");

  })
  
  it("TF_TC27_Verify nipun,not nipun,pending text is visiable when grade 1 is selected. ",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    //nipun text
    const nipunText = await driver.$(teacherFlowLocators.nipunTextElement)
    const nipunTextIsDisplayed = await nipunText.isDisplayed();
    assert.strictEqual(nipunTextIsDisplayed, true, "Element is not displayed");
    const text = await nipunText.getText();
    assert.strictEqual(
      text,
      constants.nipunText,
      `Element text is not ${constants.nipunText}, it is '${text}'`
    );
   //nipun count 
    const nipunCount = await driver.$(teacherFlowLocators.nipunCount)
    const nipunCountIsDisplayed = await nipunCount.isDisplayed();
    assert.strictEqual(nipunCountIsDisplayed, true, "Element is not displayed");
  //Not nipun text 
    const notNipunText = await driver.$(teacherFlowLocators.notNipunTextElement)
    const notNipunTextIsDisplayed = await notNipunText.isDisplayed();
    assert.strictEqual(notNipunTextIsDisplayed, true, "Element is not displayed");
    const notNipunTexts = await notNipunText.getText();
    assert.strictEqual(
    notNipunTexts,
    constants.notNipunText,
    `Element text is not ${constants.notNipunText}, it is '${notNipunTexts}'`
    );
    //Not nipun count
    const notNipunCount = await driver.$(teacherFlowLocators.notNipunCount)
    const notNipunCountIsDisplayed = await notNipunCount.isDisplayed();
    assert.strictEqual(notNipunCountIsDisplayed, true, "Element is not displayed");
    // to be assess text
    const pendingAssessmentTextElement = await driver.$(teacherFlowLocators.pendingAssessmentText)
    const pendingAssessmentTextIsDisplayed = await pendingAssessmentTextElement.isDisplayed();
    assert.strictEqual(pendingAssessmentTextIsDisplayed, true, "Element is not displayed");
    const pendingAssessmentTextElementText = await pendingAssessmentTextElement.getText();
    assert.strictEqual(
      pendingAssessmentTextElementText,
      constants.penddingToAssess,
      `Element text is not ${constants.penddingToAssess}, it is '${pendingAssessmentTextElementText}'`
    );
    // to be assess count
    const toBeAssessCount = await driver.$(teacherFlowLocators.pendingAssessmentCount)
    const toBeAssessCountIsDisplayed = await toBeAssessCount.isDisplayed();
    assert.strictEqual(toBeAssessCountIsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC28_Verify nipun,not nipun,pending text is visiable when grade 2 is selected. ",async()=>{
    await driver.$(teacherFlowLocators.grade2Label).click(); 
    //nipun text
    const nipunText = await driver.$(teacherFlowLocators.nipunTextElement)
    const nipunTextIsDisplayed = await nipunText.isDisplayed();
    assert.strictEqual(nipunTextIsDisplayed, true, "Element is not displayed");
    const text = await nipunText.getText();
    assert.strictEqual(
      text,
      constants.nipunText,
      `Element text is not ${constants.nipunText}, it is '${text}'`
    );
   //nipun count 
    const nipunCount = await driver.$(teacherFlowLocators.nipunCount)
    const nipunCountIsDisplayed = await nipunCount.isDisplayed();
    assert.strictEqual(nipunCountIsDisplayed, true, "Element is not displayed");
  //Not nipun text 
    const notNipunText = await driver.$(teacherFlowLocators.notNipunTextElement)
    const notNipunTextIsDisplayed = await notNipunText.isDisplayed();
    assert.strictEqual(notNipunTextIsDisplayed, true, "Element is not displayed");
    const notNipunTexts = await notNipunText.getText();
    assert.strictEqual(
    notNipunTexts,
    constants.notNipunText,
    `Element text is not ${constants.notNipunText}, it is '${notNipunTexts}'`
    );
    //Not nipun count
    const notNipunCount = await driver.$(teacherFlowLocators.notNipunCount)
    const notNipunCountIsDisplayed = await notNipunCount.isDisplayed();
    assert.strictEqual(notNipunCountIsDisplayed, true, "Element is not displayed");
    // to be assess text
    const pendingAssessmentTextElement = await driver.$(teacherFlowLocators.pendingAssessmentText)
    const pendingAssessmentTextIsDisplayed = await pendingAssessmentTextElement.isDisplayed();
    assert.strictEqual(pendingAssessmentTextIsDisplayed, true, "Element is not displayed");
    const pendingAssessmentTextElementText = await pendingAssessmentTextElement.getText();
    assert.strictEqual(
      pendingAssessmentTextElementText,
      constants.penddingToAssess,
      `Element text is not ${constants.penddingToAssess}, it is '${pendingAssessmentTextElementText}'`
    );
    // to be assess count
    const toBeAssessCount = await driver.$(teacherFlowLocators.pendingAssessmentCount)
    const toBeAssessCountIsDisplayed = await toBeAssessCount.isDisplayed();
    assert.strictEqual(toBeAssessCountIsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC29_Verify nipun,not nipun,pending text is visiable when grade 3 is selected. ",async()=>{
    await driver.$(teacherFlowLocators.grade3Label).click(); 
    //nipun text
    const nipunText = await driver.$(teacherFlowLocators.nipunTextElement)
    const nipunTextIsDisplayed = await nipunText.isDisplayed();
    assert.strictEqual(nipunTextIsDisplayed, true, "Element is not displayed");
    const text = await nipunText.getText();
    assert.strictEqual(
      text,
      constants.nipunText,
      `Element text is not ${constants.nipunText}, it is '${text}'`
    );
   //nipun count 
    const nipunCount = await driver.$(teacherFlowLocators.nipunCount)
    const nipunCountIsDisplayed = await nipunCount.isDisplayed();
    assert.strictEqual(nipunCountIsDisplayed, true, "Element is not displayed");
  //Not nipun text 
    const notNipunText = await driver.$(teacherFlowLocators.notNipunTextElement)
    const notNipunTextIsDisplayed = await notNipunText.isDisplayed();
    assert.strictEqual(notNipunTextIsDisplayed, true, "Element is not displayed");
    const notNipunTexts = await notNipunText.getText();
    assert.strictEqual(
    notNipunTexts,
    constants.notNipunText,
    `Element text is not ${constants.notNipunText}, it is '${notNipunTexts}'`
    );
    //Not nipun count
    const notNipunCount = await driver.$(teacherFlowLocators.notNipunCount)
    const notNipunCountIsDisplayed = await notNipunCount.isDisplayed();
    assert.strictEqual(notNipunCountIsDisplayed, true, "Element is not displayed");
    // to be assess text
    const pendingAssessmentTextElement = await driver.$(teacherFlowLocators.pendingAssessmentText)
    const pendingAssessmentTextIsDisplayed = await pendingAssessmentTextElement.isDisplayed();
    assert.strictEqual(pendingAssessmentTextIsDisplayed, true, "Element is not displayed");
    const pendingAssessmentTextElementText = await pendingAssessmentTextElement.getText();
    assert.strictEqual(
      pendingAssessmentTextElementText,
      constants.penddingToAssess,
      `Element text is not ${constants.penddingToAssess}, it is '${pendingAssessmentTextElementText}'`
    );
    // to be assess count
    const toBeAssessCount = await driver.$(teacherFlowLocators.pendingAssessmentCount)
    const toBeAssessCountIsDisplayed = await toBeAssessCount.isDisplayed();
    assert.strictEqual(toBeAssessCountIsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC30_Verify able see month on student listing page",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    const monthText= await driver.$(teacherFlowLocators.monthText)
    const IsDisplayed = await monthText.isDisplayed();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC31_Verify able see refresh button on student listing page and its working ",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
    await driver.$(teacherFlowLocators.grade2Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
    await driver.$(teacherFlowLocators.grade3Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
  })

  
  it("TF_TC32_Verify able to change month to see previous months student assessed history when grade 1 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    // previous 3 months
    await driver.$(teacherFlowLocators.previousMonth).click();
    const monthText= await driver.$(teacherFlowLocators.monthText)
    const IsDisplayed = await monthText.isDisplayed();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

    // back to current month 
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC33_Verify able to change month to see previous months student assessed history when grade 2 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade2Label).click(); 
    // previous 3 months
    await driver.$(teacherFlowLocators.previousMonth).click();
    const monthText= await driver.$(teacherFlowLocators.monthText)
    const IsDisplayed = await monthText.isDisplayed();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

    // back to current month 
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

  })

 
 it("TF_TC34_Verify able to change month to see previous months student assessed history when grade 3 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade3Label).click(); 
    // previous 3 months
    await driver.$(teacherFlowLocators.previousMonth).click();
    const monthText= await driver.$(teacherFlowLocators.monthText)
    const IsDisplayed = await monthText.isDisplayed();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.previousMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

    // back to current month 
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.nextMonth).click();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC35_Verify able to see button for start asssesment for anynoumous students when grade 1 selected",async()=>{
    await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
        //scroll up
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
    // student name not in list ?
    const studentNameNotInListText = await driver.$(teacherFlowLocators.studentNameNotInListTextElement)
    const studentNameNotInListTextIsDisplayed = await studentNameNotInListText.isDisplayed();
    assert.strictEqual(studentNameNotInListTextIsDisplayed, true, "Element is not displayed");
    const text = await studentNameNotInListText.getText();
    assert.strictEqual(
      text,
      constants.studentNameNotInListText,
      `Element text is not ${constants.studentNameNotInListText}, it is '${text}'`
    );
    // start assessment for anynomous student button
    const anynoumousStudentTakeAssessmentButton = await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton)
    const anynoumousStudentTakeAssessmentButtonIsDisplayed = await anynoumousStudentTakeAssessmentButton.isDisplayed();
    assert.strictEqual(anynoumousStudentTakeAssessmentButtonIsDisplayed, true, "Element is not displayed");
    const anynoumousStudentTakeAssessmentButtonIsDisplayedText = await anynoumousStudentTakeAssessmentButton.getText();
    assert.strictEqual(
      anynoumousStudentTakeAssessmentButtonIsDisplayedText,
      constants.anynoumousStudentTakeAssessmentButtonText,
      `Element text is not ${constants.anynoumousStudentTakeAssessmentButtonText}, it is '${anynoumousStudentTakeAssessmentButtonIsDisplayedText}'`
    );
  })

  it("TF_TC36_Verify able to see button for start asssesment for anynoumous students when grade 2 selected",async()=>{
    await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
    await driver.$(teacherFlowLocators.grade2Label).click(); 
     //scroll up
     await scrollUp(driver)
     await scrollUp(driver)
     await scrollUp(driver)
     await scrollUp(driver)
     await scrollUp(driver)
     
    // student name not in list ?
    const studentNameNotInListText = await driver.$(teacherFlowLocators.studentNameNotInListTextElement)
    const studentNameNotInListTextIsDisplayed = await studentNameNotInListText.isDisplayed();
    assert.strictEqual(studentNameNotInListTextIsDisplayed, true, "Element is not displayed");
    const text = await studentNameNotInListText.getText();
    assert.strictEqual(
      text,
      constants.studentNameNotInListText,
      `Element text is not ${constants.studentNameNotInListText}, it is '${text}'`
    );
    // start assessment for anynomous student button
    const anynoumousStudentTakeAssessmentButton = await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton)
    const anynoumousStudentTakeAssessmentButtonIsDisplayed = await anynoumousStudentTakeAssessmentButton.isDisplayed();
    assert.strictEqual(anynoumousStudentTakeAssessmentButtonIsDisplayed, true, "Element is not displayed");
    const anynoumousStudentTakeAssessmentButtonIsDisplayedText = await anynoumousStudentTakeAssessmentButton.getText();
    assert.strictEqual(
      anynoumousStudentTakeAssessmentButtonIsDisplayedText,
      constants.anynoumousStudentTakeAssessmentButtonText,
      `Element text is not ${constants.anynoumousStudentTakeAssessmentButtonText}, it is '${anynoumousStudentTakeAssessmentButtonIsDisplayedText}'`
    );
  })
  
  it("TF_TC37_Verify able to see button for start asssesment for anynoumous students when grade 3 selected",async()=>{
    await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
    await driver.$(teacherFlowLocators.grade3Label).click(); 
    //scroll up
    await scrollUp(driver)
    await scrollUp(driver)
    await scrollUp(driver)
    await scrollUp(driver)
    await scrollUp(driver)   
    await scrollUp(driver)
    // student name not in list ?
    const studentNameNotInListText = await driver.$(teacherFlowLocators.studentNameNotInListTextElement)
    const studentNameNotInListTextIsDisplayed = await studentNameNotInListText.isDisplayed();
    assert.strictEqual(studentNameNotInListTextIsDisplayed, true, "Element is not displayed");
    const text = await studentNameNotInListText.getText();
    assert.strictEqual(
      text,
      constants.studentNameNotInListText,
      `Element text is not ${constants.studentNameNotInListText}, it is '${text}'`
    );
    // start assessment for anynomous student button
    const anynoumousStudentTakeAssessmentButton = await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton)
    const anynoumousStudentTakeAssessmentButtonIsDisplayed = await anynoumousStudentTakeAssessmentButton.isDisplayed();
    assert.strictEqual(anynoumousStudentTakeAssessmentButtonIsDisplayed, true, "Element is not displayed");
    const anynoumousStudentTakeAssessmentButtonIsDisplayedText = await anynoumousStudentTakeAssessmentButton.getText();
    assert.strictEqual(
      anynoumousStudentTakeAssessmentButtonIsDisplayedText,
      constants.anynoumousStudentTakeAssessmentButtonText,
      `Element text is not ${constants.anynoumousStudentTakeAssessmentButtonText}, it is '${anynoumousStudentTakeAssessmentButtonIsDisplayedText}'`
    );
  })

  it("TF_TC32_Verify in header able to see app version and akalan text",async()=>{
    // app version in header
    const appVersionInHeader = await driver.$(teacherFlowLocators.appVersionInHeader)
    const appVersionInHeaderIsDisplayed = await appVersionInHeader.isDisplayed();
    assert.strictEqual(appVersionInHeaderIsDisplayed, true, "Element is not displayed");
    const appVersionInHeaderText = await appVersionInHeader.getText();
    assert.strictEqual(
      appVersionInHeaderText,
      constants.appVersiontext,
      `Element text is not ${constants.appVersiontext}, it is '${appVersionInHeaderText}'`
    );
  // Akalan Text in header
     const akalanTextInHeader = await driver.$(teacherFlowLocators.akalanTextInHeaderElement)
     const akalanTextInHeaderIsDisplayed = await akalanTextInHeader.isDisplayed();
     assert.strictEqual(akalanTextInHeaderIsDisplayed, true, "Element is not displayed");
     const akalanText = await akalanTextInHeader.getText();
     assert.strictEqual(
     akalanText,
     constants.akalanText,
    `Element text is not ${constants.akalanText}, it is '${akalanText}'`
  );
  })
  after(async function () {
    if (driver) {
      await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    }
  });

})

describe("[Teacher Flow] Assessment flow grade 1", function () {
  this.timeout(100000);

  it("TF_TC33_Verify able take assessment for grade 1 student",async()=>{
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await driver.$(teacherFlowLocators.assessNextStudent).click();
    // verify after assessment comes on student listing page 
    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    const isDisplayed = await selectGradeElement.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await selectGradeElement.getText();
    assert.strictEqual(
      text,
      constants.selectGradeText,
      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    );

  })

  it.skip("TF_TC34_Verify TC33 assessment are submitted on server manually",async()=>{
    console.log("Please check TF_TC33 assessment submission on backend.")
  })

  it.skip("TF_TC35_Verify student getting pass when we select all ans correctly",async()=>{
    console.log("Please check manually.")
  })

  it.skip("TF_TC36_Verify count of student assessed and nipun updated after assessment on teacher profile screen",async()=>{
    console.log("Please check manually.")
  })


  it("TF_TC37_Verify able take assessment for multiple students from grade 1 (2-students)",async()=>{
    //1st student 
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await driver.$(teacherFlowLocators.assessNextStudent).click();
    //2nd student 
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await driver.$(teacherFlowLocators.assessNextStudent).click();
    // verify after assessment comes on student listing page 
    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    const isDisplayed = await selectGradeElement.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await selectGradeElement.getText();
    assert.strictEqual(
      text,
      constants.selectGradeText,
      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    );

  })

  it.skip("TF_TC38_Verify TC35 assessment are submitted on server manually)",async()=>{
    console.log("Please check manually.")
  })

  it("TF_TC39_Verify able to cancel assessment when assessment is started for grade 1 student",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.pressKeyCode(4);
    console.log("Pressed the back button.");
    await driver.$(odkLocators.cancelAssessmentButton).click();
    // verify after assessment comes on student listing page 
    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    const isDisplayed = await selectGradeElement.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await selectGradeElement.getText();
    assert.strictEqual(
      text,
      constants.selectGradeText,
      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    );

  })
  
  it("TF_TC40_Verify from_id and form_title text is visiable in header while taking grade 1 students assessment",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await driver.$(teacherFlowLocators.assessNextStudent).click();
    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    const isDisplayed = await selectGradeElement.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    const text = await selectGradeElement.getText();
    assert.strictEqual(
      text,
      constants.selectGradeText,
      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    );

  })

  it("TF_TC41_Verify able to take assessment of anonymous student from grade 1",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
      //scroll up 
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)   
      await scrollUp(driver)
   await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
   await fillOdkForm(driver);
   await driver.$(odkLocators.nextButtonBtwTwoForms).click();
   await fillOdkForm(driver);
   await driver.$(odkLocators.nextButtonBtwTwoForms).click();
   await driver.$(teacherFlowLocators.assessNextStudent).click();
  })

  it.skip("TF_TC42_Verify  anonymous student from grade 1 assessment getting submitted on backend",async()=>{
     console.log("Please check manually.");
  })

  it("TF_TC43_Verify able to cancel assessment which is started for anonymous student from grade 1",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
      //scroll up 
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)
      await scrollUp(driver)   
      await scrollUp(driver)
   await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
   await fillOdkForm(driver);
   await driver.pressKeyCode(4);
   console.log("Pressed the back button.");
   await driver.$(odkLocators.cancelAssessmentButton).click();
   // verify after assessment comes on student listing page 
   const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
   const isDisplayed = await selectGradeElement.isDisplayed();
   assert.strictEqual(isDisplayed, true, "Element is not displayed");
   const text = await selectGradeElement.getText();
   assert.strictEqual(
     text,
     constants.selectGradeText,
     `Element text is not ${constants.selectGradeText}, it is '${text}'`
   );
   
  })

  after(async function () {
    if (driver) {
      await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    }
  });
  
})


describe("[Teacher Flow] Assessment flow grade 2", function () {
    this.timeout(100000);
  
    it("TF_TC44_Verify able take assessment for grade 2 student",async()=>{
      await driver.$(teacherFlowLocators.studentAkalanButton).click();
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await handleBsttFlow(driver);
      await driver.$(teacherFlowLocators.assessNextStudent).click();
      // verify after assessment comes on student listing page 
      const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
      const isDisplayed = await selectGradeElement.isDisplayed();
      assert.strictEqual(isDisplayed, true, "Element is not displayed");
      const text = await selectGradeElement.getText();
      assert.strictEqual(
        text,
        constants.selectGradeText,
        `Element text is not ${constants.selectGradeText}, it is '${text}'`
      );
  
    })
  
    it.skip("TF_TC45_Verify TC33 assessment are submitted on server manually",async()=>{
      console.log("Please check TF_TC33 assessment submission on backend.")
    })
  
    it.skip("TF_TC46_Verify student getting pass when we select all ans correctly",async()=>{
      console.log("Please check manually.")
    })
  
    it.skip("TF_TC47_Verify count of student assessed and nipun updated after assessment on teacher profile screen",async()=>{
      console.log("Please check manually.")
    })
  
  
    it("TF_TC48_Verify able take assessment for multiple students from grade 2 (2-students)",async()=>{
      //1st student 
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await handleBsttFlow(driver);
      await driver.$(teacherFlowLocators.assessNextStudent).click();
      //2nd student 
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await handleBsttFlow(driver);
      await driver.$(teacherFlowLocators.assessNextStudent).click();
      // verify after assessment comes on student listing page 
      const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
      const isDisplayed = await selectGradeElement.isDisplayed();
      assert.strictEqual(isDisplayed, true, "Element is not displayed");
      const text = await selectGradeElement.getText();
      assert.strictEqual(
        text,
        constants.selectGradeText,
        `Element text is not ${constants.selectGradeText}, it is '${text}'`
      );
  
    })
  
    it.skip("TF_TC49_Verify TC48 assessment are submitted on server manually)",async()=>{
      console.log("Please check manually.")
    })
  
    it("TF_TC50_Verify able to cancel assessment when assessment is started for grade 2 student",async()=>{
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.pressKeyCode(4);
      console.log("Pressed the back button.");
      await driver.$(odkLocators.cancelAssessmentButton).click();
      // verify after assessment comes on student listing page 
      const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
      const isDisplayed = await selectGradeElement.isDisplayed();
      assert.strictEqual(isDisplayed, true, "Element is not displayed");
      const text = await selectGradeElement.getText();
      assert.strictEqual(
        text,
        constants.selectGradeText,
        `Element text is not ${constants.selectGradeText}, it is '${text}'`
      );
  
    })
    
    it("TF_TC51_Verify from_id and form_title text is visiable in header while taking grade 2 students assessment",async()=>{
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await handleBsttFlow(driver);
      await driver.$(teacherFlowLocators.assessNextStudent).click();
      const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
      const isDisplayed = await selectGradeElement.isDisplayed();
      assert.strictEqual(isDisplayed, true, "Element is not displayed");
      const text = await selectGradeElement.getText();
      assert.strictEqual(
        text,
        constants.selectGradeText,
        `Element text is not ${constants.selectGradeText}, it is '${text}'`
      );
  
    })
  
    it("TF_TC52_Verify able to take assessment of anonymous student from grade 2",async()=>{
      await driver.$(teacherFlowLocators.grade2Label).click(); 
        //scroll up 
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)   
        await scrollUp(driver)
     await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
     await fillOdkForm(driver);
     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
     await fillOdkForm(driver);
     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
     await handleBsttFlow(driver);
     await driver.$(teacherFlowLocators.assessNextStudent).click();
    })
  
    it.skip("TF_TC53_Verify  anonymous student from grade 1 assessment getting submitted on backend",async()=>{
       console.log("Please check manually.");
    })
  
    it("TF_TC54_Verify able to cancel assessment which is started for anonymous student from grade 2",async()=>{
      await driver.$(teacherFlowLocators.grade2Label).click(); 
        //scroll up 
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)
        await scrollUp(driver)   
        await scrollUp(driver)
     await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
     await fillOdkForm(driver);
     await driver.pressKeyCode(4);
     console.log("Pressed the back button.");
     await driver.$(odkLocators.cancelAssessmentButton).click();
     // verify after assessment comes on student listing page 
     const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
     const isDisplayed = await selectGradeElement.isDisplayed();
     assert.strictEqual(isDisplayed, true, "Element is not displayed");
     const text = await selectGradeElement.getText();
     assert.strictEqual(
       text,
       constants.selectGradeText,
       `Element text is not ${constants.selectGradeText}, it is '${text}'`
     );
     
    })
  
    after(async function () {
      if (driver) {
        await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
      }
    });
    
  })

  // describe("[Teacher Flow] Assessment flow grade 3", function () {
    //   this.timeout(100000);
    
    //   it("TF_TC33_Verify able take assessment for grade 1 student",async()=>{
    //     await driver.$(teacherFlowLocators.studentAkalanButton).click();
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //     await selectRandomStudent(driver);
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await driver.$(teacherFlowLocators.assessNextStudent).click();
    //     // verify after assessment comes on student listing page 
    //     const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    //     const isDisplayed = await selectGradeElement.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, "Element is not displayed");
    //     const text = await selectGradeElement.getText();
    //     assert.strictEqual(
    //       text,
    //       constants.selectGradeText,
    //       `Element text is not ${constants.selectGradeText}, it is '${text}'`
    //     );
    
    //   })
    
    //   it.skip("TF_TC34_Verify TC33 assessment are submitted on server manually",async()=>{
    //     console.log("Please check TF_TC33 assessment submission on backend.")
    //   })
    
    //   it.skip("TF_TC35_Verify student getting pass when we select all ans correctly",async()=>{
    //     console.log("Please check manually.")
    //   })
    
    //   it.skip("TF_TC36_Verify count of student assessed and nipun updated after assessment on teacher profile screen",async()=>{
    //     console.log("Please check manually.")
    //   })
    
    
    //   it("TF_TC37_Verify able take assessment for multiple students from grade 1 (2-students)",async()=>{
    //     //1st student 
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //     await selectRandomStudent(driver);
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await driver.$(teacherFlowLocators.assessNextStudent).click();
    //     //2nd student 
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //     await selectRandomStudent(driver);
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await driver.$(teacherFlowLocators.assessNextStudent).click();
    //     // verify after assessment comes on student listing page 
    //     const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    //     const isDisplayed = await selectGradeElement.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, "Element is not displayed");
    //     const text = await selectGradeElement.getText();
    //     assert.strictEqual(
    //       text,
    //       constants.selectGradeText,
    //       `Element text is not ${constants.selectGradeText}, it is '${text}'`
    //     );
    
    //   })
    
    //   it.skip("TF_TC38_Verify TC35 assessment are submitted on server manually)",async()=>{
    //     console.log("Please check manually.")
    //   })
    
    //   it("TF_TC39_Verify able to cancel assessment when assessment is started for grade 1 student",async()=>{
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //     await selectRandomStudent(driver);
    //     await fillOdkForm(driver);
    //     await driver.pressKeyCode(4);
    //     console.log("Pressed the back button.");
    //     await driver.$(odkLocators.cancelAssessmentButton).click();
    //     // verify after assessment comes on student listing page 
    //     const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    //     const isDisplayed = await selectGradeElement.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, "Element is not displayed");
    //     const text = await selectGradeElement.getText();
    //     assert.strictEqual(
    //       text,
    //       constants.selectGradeText,
    //       `Element text is not ${constants.selectGradeText}, it is '${text}'`
    //     );
    
    //   })
      
    //   it("TF_TC40_Verify from_id and form_title text is visiable in header while taking grade 1 students assessment",async()=>{
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //     await selectRandomStudent(driver);
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await fillOdkForm(driver);
    //     await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //     await driver.$(teacherFlowLocators.assessNextStudent).click();
    //     const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    //     const isDisplayed = await selectGradeElement.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, "Element is not displayed");
    //     const text = await selectGradeElement.getText();
    //     assert.strictEqual(
    //       text,
    //       constants.selectGradeText,
    //       `Element text is not ${constants.selectGradeText}, it is '${text}'`
    //     );
    
    //   })
    
    //   it("TF_TC41_Verify able to take assessment of anonymous student from grade 1",async()=>{
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //       //scroll up 
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)   
    //       await scrollUp(driver)
    //    await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
    //    await fillOdkForm(driver);
    //    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //    await fillOdkForm(driver);
    //    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    //    await driver.$(teacherFlowLocators.assessNextStudent).click();
    //   })
    
    //   it.skip("TF_TC42_Verify  anonymous student from grade 1 assessment getting submitted on backend",async()=>{
    //      console.log("Please check manually.");
    //   })
    
    //   it("TF_TC43_Verify able to cancel assessment which is started for anonymous student from grade 1",async()=>{
    //     await driver.$(teacherFlowLocators.grade1Label).click(); 
    //       //scroll up 
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)
    //       await scrollUp(driver)   
    //       await scrollUp(driver)
    //    await driver.$(teacherFlowLocators.anynoumousStudentTakeAssessmentButton).click();
    //    await fillOdkForm(driver);
    //    await driver.pressKeyCode(4);
    //    console.log("Pressed the back button.");
    //    await driver.$(odkLocators.cancelAssessmentButton).click();
    //    // verify after assessment comes on student listing page 
    //    const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
    //    const isDisplayed = await selectGradeElement.isDisplayed();
    //    assert.strictEqual(isDisplayed, true, "Element is not displayed");
    //    const text = await selectGradeElement.getText();
    //    assert.strictEqual(
    //      text,
    //      constants.selectGradeText,
    //      `Element text is not ${constants.selectGradeText}, it is '${text}'`
    //    );
       
    //   })
    
    //   after(async function () {
    //     if (driver) {
    //       await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
    //     }
    //   });
      
    // })