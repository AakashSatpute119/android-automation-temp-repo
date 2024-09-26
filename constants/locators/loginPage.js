// login page elements

export const nipunlakshyaTextAndLogoInHeader =
  '//android.widget.ImageView[@resource-id="org.samagra.missionPrerna:id/iv_header"]';

export const appVersion =
  '//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_version_name"]';

export const teacherLogoImg =
  '//android.widget.LinearLayout[@resource-id="org.samagra.missionPrerna:id/ll_teacher"]/android.widget.ImageView';

export const titleOnPage = `//android.widget.TextView[@text="मेंटर, शिक्षक, परीक्षक"]`; 

export const enterRegisterNumber =
  '//android.widget.TextView[@text="पंजीकृत मोबाइल नंबर भरें"]';

export const mobileNumberInputBox = `//android.widget.EditText`
export const mobileNumberInputBoxDefaultText = `//android.widget.TextView[@text="उदहारण: 9876543210"]`
// `//android.widget.EditText[@resource-id="org.samagra.missionPrerna:id/etResult"]`;

export const sendOtpButton = `//android.widget.Button`
// `//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/btnCollect"]`;

export const numberNotregisted = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_info_note"]`;

export const helplineNumber = `//android.widget.TextView[@text="0522–3538777"]`;

export const pleaseCheckNumber = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title_tv"]`;

export const pleaseEnterCorrectNumber = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/description_tv"]`;

export const okButton =
  '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/cta_button"]';

export const unableToSendOtp = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title_tv"]`;

export const numberIsNotRegisteredOnPernaPortal = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/description_tv"]`;

export const otpInputBox1 =
  '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)';
export const otpInputBox2 =
  '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(1)';
export const otpInputBox3 =
  '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(2)';
export const otpInputBox4 =
  '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(3)';

  export const submitOtpButton ='-android uiautomator:new UiSelector().className("android.widget.Button").instance(0)'
  // '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/validate_button"]';

  export const buttonOnLoggedInsuccessfullyPopUp =
  '//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/cta_button"]';




