// login page elements

export const nipunlakshyaTextAndLogoInHeader =
  '//android.widget.ImageView[@resource-id="org.samagra.nisai:id/iv_header"]';

export const appVersion =
  '//android.widget.TextView[@resource-id="org.samagra.nisai:id/tv_version_name"]';

export const teacherLogoImg =
  '//android.widget.LinearLayout[@resource-id="org.samagra.nisai:id/ll_teacher"]/android.widget.ImageView';

export const titleOnPage = `//android.widget.TextView[@text=" मेंटर, शिक्षक, परीक्षक"]`;

export const enterRegisterNumber =
  '//android.widget.TextView[@text="पंजीकृत मोबाइल नंबर भरें"]';

export const mobileNumberInputBox = `//android.widget.EditText[@resource-id="org.samagra.nisai:id/etResult"]`;

export const sendOtpButton = `//android.widget.Button[@resource-id="org.samagra.nisai:id/btnCollect"]`;

export const numberNotregisted = `//android.widget.TextView[@resource-id="org.samagra.nisai:id/tv_info_note"]`;

export const helplineNumber = `//android.widget.TextView[@text="0522–3538777"]`;

export const pleaseCheckNumber = `//android.widget.TextView[@resource-id="org.samagra.nisai:id/title_tv"]`;

export const pleaseEnterCorrectNumber = `//android.widget.TextView[@resource-id="org.samagra.nisai:id/description_tv"]`;

export const okButton =
  '//android.widget.Button[@resource-id="org.samagra.nisai:id/cta_button"]';

export const unableToSendOtp = `//android.widget.TextView[@resource-id="org.samagra.nisai:id/title_tv"]`;
export const numberIsNotRegisteredOnPernaPortal = `//android.widget.TextView[@resource-id="org.samagra.nisai:id/description_tv"]`;
export const otpInputBox =
  '-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)';
export const submitOtpButton =
  '//android.widget.Button[@resource-id="org.samagra.nisai:id/validate_button"]';
export const buttonOnLoggedInsuccessfullyPopUp =
  '//android.widget.Button[@resource-id="org.samagra.nisai:id/cta_button"]';
