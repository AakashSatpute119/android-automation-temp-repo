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
import * as scoreBoard from "../constants/locators/ScoreBoared.js"
import {selectRandomStudent,studentData,handleBsttFlow} from "../utils/commonFunctions.js"
 
let driver;

describe("[Mentor Flow] Profile page test cases", function () {
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
    await mobileNumberInputBox.setValue(constants.mentorValidMobileNumber);
    (await driver.$(loginPageLocators.sendOtpButton)).click();
    await driver.setTimeout({ implicit: 6000 });
    const OTPField1 = await driver.$(loginPageLocators.otpInputBox1);
    const OTPField2 = await driver.$(loginPageLocators.otpInputBox2);
    const OTPField3 = await driver.$(loginPageLocators.otpInputBox3);
    const OTPField4 = await driver.$(loginPageLocators.otpInputBox4);
    await OTPField1.addValue(constants.defaultOtp[0]);
    await OTPField2.addValue(constants.defaultOtp[1]);
    await OTPField3.addValue(constants.defaultOtp[2]);
    await OTPField4.addValue(constants.defaultOtp[3]);
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

  it("TF_TC1_Verify Mentor profile is logged in successfully ", async () => {
    const mentorProfileText = await driver.$(
      teacherFlowLocators.teacherProfileText
    );
    // Verify the element exists
    const isElementDisplayed = await mentorProfileText.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
  });

  it("TF_TC2_Verify Nipun Lakshya app title is visible in header on mentor profile page", async () => {
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

  it.skip("TF_TC3_Verify app version is displayed in header", async () => {
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

  it("TF_TC4_Verify chatbot icon is visible", async () => {
    const chatbotIcon = await driver.$(teacherFlowLocators.chatbotIcon);
    const isElementDisplayed = await chatbotIcon.isDisplayed();
    assert.strictEqual(isElementDisplayed, true, "Element is not displayed");
  });

  it("TF_TC5_Verify mentor profile details are visible (name,district,udise,block)", async () => {
    // name
    const nameText = await driver.$(teacherFlowLocators.teacherName);
    const isNameDisplayed = await nameText.isDisplayed();
    assert.strictEqual(isNameDisplayed, true, "Element is not displayed");
    const nametext = await nameText.getText();
    assert.strictEqual(
      nametext,
      constants.mentornameText,
      `Element text is not ${constants.mentornameText}, it is '${nametext}'`
    );

    //udise
    await driver.setTimeout({ implicit: 20000 });

    const udise = await driver.$(teacherFlowLocators.udise);
    const isUdiseDisplayed = await udise.isDisplayed();
    assert.strictEqual(isUdiseDisplayed, true, "Element is not displayed");
    const udisetext = await udise.getText();
    assert.strictEqual(
      udisetext,
      constants.mentorUdiseText,
      `Element text is not ${constants.mentorUdiseText}, it is '${udisetext}'`
    );

    // district
    const district = await driver.$(teacherFlowLocators.district);
    const isDistrictDisplayed = await district.isDisplayed();
    assert.strictEqual(isDistrictDisplayed, true, "Element is not displayed");
    const districtText = await district.getText();
    assert.strictEqual(
      districtText,
      constants.mentorDistrictText,
      `Element text is not ${constants.mentorDistrictText}, it is '${districtText}'`
    );

    //Block
    const block = await driver.$(teacherFlowLocators.block);
    const isBlockDisplayed = await block.isDisplayed();
    assert.strictEqual(isBlockDisplayed, true, "Element is not displayed");
    const blockText = await block.getText();
    assert.strictEqual(
      blockText,
      constants.mentorBlockText,
      `Element text is not ${constants.mentorBlockText}, it is '${blockText}'`
    );
  });

  it("TF_TC6_Verify Shikshak Aklan Saransh label text is visible.", async () => {
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

  it.skip("TF_TC7_Verify vartman sapata aklan text is visible ", async () => {
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

  it.skip("TF_TC8_Verify count of student assessed in week text and count is visible", async () => {
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

  it.skip("TF_TC9_Verify count of student nipun in week text and count is visible", async () => {
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

  it.skip("TF_TC10_Verify count of student assessed count is visible", async () => {
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

  it.skip("TF_TC11_Verify count of student nipun in month text and count is visible", async () => {
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

  it("TF_TC12_Verify mentor akalan text is visible", async () => {
    const mentorAklanText = await driver.$(
      teacherFlowLocators.teacherAnkalanSaransh
    );
    const mentorAklanTextElement = await mentorAklanText.isDisplayed();
    assert.strictEqual(
      mentorAklanTextElement,
      true,
      "Element is not displayed"
    );
    const mentorAklanElementText = await mentorAklanText.getText();
    assert.strictEqual(
      mentorAklanElementText,
      constants.teacherAnkalanSaranshText,
      `Element text is not ${constants.teacherAnkalanSaranshText}, it is '${mentorAklanElementText}'`
    );
  });
  
 
describe("[Mentor Flow] School summary page", function () {
  this.timeout(100000);

  it("TF_TC13_Verify able to see grade 1,2,3 and all grade buttons and it is clickable", async () => {
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
  //   const grade3Label = await driver.$(teacherFlowLocators.grade3Label);
  //   const grade3LabelisDisplayed = await grade3Label.isDisplayed();
  //   assert.strictEqual(grade3LabelisDisplayed, true, "Element is not displayed");
  //   const textGrade3Label = await grade3Label.getText();
  //   assert.strictEqual(
  //     textGrade3Label,
  //     constants.grade3LabelText,
  //     `Element text is not ${constants.grade3LabelText}, it is '${textGrade3Label}'`
  //   );
  });
 
  it("TF_TC14_Verify choose School page displayed on page after clicking on ankalan page", async () => {
    await driver.$(teacherFlowLocators.studentAkalanButton).click();
    const chooseSchoolPage = await driver.$(teacherFlowLocators.chooseScholTitle);
      const chooseSchoolPageDisplayed = await chooseSchoolPage.isDisplayed();
      assert.strictEqual(chooseSchoolPageDisplayed, true, "Element is not displayed");

  });

  it("TF_TC15_Verify filter for UDISE, Block and panchayat should be visible and clickable", async () => {
    const janpadLabel = await driver.$(teacherFlowLocators.FilterScholJanpad);
    const janpadLabelisDisplayed = await janpadLabel.isDisplayed();
    assert.strictEqual(janpadLabelisDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.FilterScholJanpadSelect).click();
    await driver.$(teacherFlowLocators.FilterOptionList).click();
    //block label
    const blockLabel = await driver.$(teacherFlowLocators.FilterScholBlock);
    const blockLabelisDisplayed = await janpadLabel.isDisplayed();
    assert.strictEqual(blockLabelisDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.FilterScholBlockSelect).click();
    await driver.$(teacherFlowLocators.FilterOptionList).click();
    //Panchayat label
    const panchayatLabel = await driver.$(teacherFlowLocators.FilterScholPanchayat);
    const panchayatLabelisDisplayed = await panchayatLabel.isDisplayed();
    assert.strictEqual(panchayatLabelisDisplayed, true, "Element is not displayed");
    await driver.$(teacherFlowLocators.FilterScholPanchayatSelect).click();
    await driver.$(teacherFlowLocators.FilterOptionList).click();
  });

  it("TF_TC16_Verify By UDISE search Filter", async () => {
    const UdiseTabSearch = await driver.$(teacherFlowLocators.SearchUDISENo);
    const UdiseTabSearchisDisplayed = await UdiseTabSearch.isDisplayed();
    assert.strictEqual(UdiseTabSearchisDisplayed, true, "Search tab is not displayed");
    await UdiseTabSearch.addValue(constants.udisefortest);

  });
});

describe("[Mentor Flow] Student listing page",function(){
  this.timeout(100000);
  before(async function () {
    // refresh on screen
    await driver.$(teacherFlowLocators.selectSearchSchoolforAssesment).click();
  });

  it("TF_TC17_Verify clicking on vidhyarthi akalan button landed on student listing page ", async () => {
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

  it("TF_TC18_Verify able to see grade 1,2,3 and all grade buttons and it is clickable", async () => {
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
    // await grade2Label.click();
    
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

  it("TF_TC19_Verify able to see list of the students when grade 1 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC20_Verify able to see list of the students when grade 2 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade2Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC21_Verify able to see list of the students when grade 3 is selected",async()=>{
    await driver.$(teacherFlowLocators.grade3Label).click();
    const studentCards = await driver.$(teacherFlowLocators.firstStudentCard)
    const isDisplayed = await studentCards.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Element is not displayed");
  })

  it("TF_TC22_Verify able to see Student name and akalan kare button.",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click();
    //student name
    const studentName = await driver.$(teacherFlowLocators.studentName)
    const studentNameIsDisplayed = await studentName.isDisplayed();
    assert.strictEqual(studentNameIsDisplayed, true, "Element is not displayed");
    
    //aakalan kare button 
    const takeAssessmentButton = await driver.$(teacherFlowLocators.takeAssessmentButton)
    const takeAssessmentButtonIsDisplayed = await takeAssessmentButton.isDisplayed();
    assert.strictEqual(takeAssessmentButtonIsDisplayed, true, "Element is not displayed");

  })
  
  it("TF_TC23_Verify nipun,not nipun,pending text is visible when grade 1 is selected. ",async()=>{
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

  it("TF_TC24_Verify nipun,not nipun,pending text is visible when grade 2 is selected. ",async()=>{
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

  it("TF_TC25_Verify nipun,not nipun,pending text is visible when grade 3 is selected. ",async()=>{
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

  it("TF_TC26_Verify able see month on student listing page",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    const monthText= await driver.$(teacherFlowLocators.monthText)
    const IsDisplayed = await monthText.isDisplayed();
    assert.strictEqual(IsDisplayed, true, "Element is not displayed");

  })

  it("TF_TC27_Verify able see refresh button on student listing page and its working ",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
    await driver.$(teacherFlowLocators.grade2Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
    await driver.$(teacherFlowLocators.grade3Label).click(); 
    await driver.$(teacherFlowLocators.refreshButton).click();
  })

  it("TF_TC28_Verify able to change month to see previous months student assessed history when grade 1 is selected",async()=>{
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

  it("TF_TC29_Verify able to change month to see previous months student assessed history when grade 2 is selected",async()=>{
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

 it("TF_TC30_Verify able to change month to see previous months student assessed history when grade 3 is selected",async()=>{
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

  it("TF_TC31_Verify able to see button for start asssesment for anynoumous students when grade 1 selected",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click();  
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

  it("TF_TC32_Verify able to see button for start asssesment for anynoumous students when grade 2 selected",async()=>{
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
  
  it("TF_TC33_Verify able to see button for start asssesment for anynoumous students when grade 3 selected",async()=>{
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

  it("TF_TC34_Verify in header able to see app version and akalan text",async()=>{
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

 describe("[Mentor Flow] Assessment flow grade 1", function () {
  this.timeout(100000);

  it("TF_TC35_Verify able take assessment for grade 1 student",async()=>{
    await driver.$(teacherFlowLocators.grade1Label).click(); 
    await selectRandomStudent(driver);
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    await fillOdkForm(driver);
    await driver.$(odkLocators.nextButtonBtwTwoForms).click();
    const scoreboard = await driver.$(scoreBoard.scoreboared);
    const isScoreBoardDisplayed = await scoreboard.isDisplayed();
    assert.strictEqual(isScoreBoardDisplayed, true, "ScoreBoard not displayed");
    const studentAnklanPageBack = await driver.$(teacherFlowLocators.studentAnklanPageBack);
    const studentAnklanPageBackDisplayed = await studentAnklanPageBack.isDisplayed();
    assert.strictEqual(studentAnklanPageBackDisplayed, true, "Student Anklann page is not displayed");
    await driver.$(teacherFlowLocators.studentAnklanPageBack).click();
    

  })


  after(async function () {
    if (driver) {
      // await driver.$(teacherFlowLocators.studentAnklanPageBack).click();
    }
  });
  
})
describe("[Mentor Flow] Assessment flow grade 2", function () {
    this.timeout(100000);
  
    it("TF_TC36_Verify able take assessment for grade 2 student",async()=>{
      await driver.$(teacherFlowLocators.grade2Label).click(); 
      await selectRandomStudent(driver);
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await fillOdkForm(driver);
      await driver.$(odkLocators.nextButtonBtwTwoForms).click();
      await handleBsttFlow(driver);
      const scoreboard = await driver.$(scoreBoard.scoreboared);
      const isScoreBoardDisplayed = await scoreboard.isDisplayed();
      assert.strictEqual(isScoreBoardDisplayed, true, "ScoreBoard not displayed");
      // await driver.$(teacherFlowLocators.assessNextStudent).click();
      // verify after assessment comes on student listing page 
      // const selectGradeElement = await driver.$(teacherFlowLocators.selectGradeTextElement);
      // const isDisplayed = await selectGradeElement.isDisplayed();
      // assert.strictEqual(isDisplayed, true, "Element is not displayed");
      // const text = await selectGradeElement.getText();
      // assert.strictEqual(
      //   text,
      //   constants.selectGradeText,
      //   `Element text is not ${constants.selectGradeText}, it is '${text}'`
      // );
  
    })
  
    after(async function () {
      if (driver) {
        // await driver.$(teacherFlowLocators.studentListingToHomePageBackButton).click();
      }
    });
    
})
})
