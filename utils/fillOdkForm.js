import { performSwipe } from "../utils/gestures.js";

export async function fillOdkForm(driver) {
      await driver.setTimeout({ implicit: 20000 });
      const firstRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[1]'
        )
       await firstRadioButton .click();

      const secondRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[4]'
        )
       await secondRadioButton.click();
       await performSwipe(driver, 617, 1783, 622, 757, 1000);
       
  

      const thirdRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[6]'
        )
       await thirdRadioButton.click();

      const fourthRadioButton = await driver
        .$(
          '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[9]'
        )
       await fourthRadioButton.click();
       await performSwipe(driver, 617, 1783, 622, 757, 1000);
    

      const aageBadheButton = await driver.$(
        '//android.widget.TextView[@content-desc="आगे बढ़े"]'
      );
      await aageBadheButton.click();
}