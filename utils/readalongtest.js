// In a separate utility file, e.g., loginUtil.js
export async function loginTeacher(driver) {
    const privacyScoller = driver.$(tAndCLocators.privacyScoller);
    await privacyScoller.click();
    const checkBox = await driver.$(tAndCLocators.checkBox);
    await checkBox.click();
    await driver.$(tAndCLocators.aageBadheButton).click();
    const mobileNumberInputBox = await driver.$(loginPageLocators.mobileNumberInputBox);
    await mobileNumberInputBox.clearValue();
    await mobileNumberInputBox.setValue(constants.teacherValidMobileNumber);
    await driver.$(loginPageLocators.sendOtpButton).click();
    await driver.setTimeout({ implicit: 6000 });
    const OTP = await driver.$(loginPageLocators.otpInputBox);
    await OTP.addValue(constants.defaultOtp);
    await driver.$(loginPageLocators.submitOtpButton).click();
    await driver.$(loginPageLocators.buttonOnLoggedInsuccessfullyPopUp).click();
}
