import { performSwipe } from "../utils/gestures.js";

export async function fillOdkForm(driver) {
  await driver.setTimeout({ implicit: 20000 });

  async function selectVisibleThirdOptions() {
    const gridViewXpath = `//android.widget.GridView[@resource-id="org.samagra.missionPrerna:id/choices_recycler_view"]`;
    const visibleGridViews = await driver.$$(gridViewXpath);
    console.log(`Found ${visibleGridViews.length} visible sets on the screen`);

    for (let i = 0; i < visibleGridViews.length; i++) {
      const optionsXpath = `(//android.widget.GridView[@resource-id="org.samagra.missionPrerna:id/choices_recycler_view"])[${i + 1}]/android.widget.RelativeLayout`;
      const optionElements = await driver.$$(optionsXpath);

      try {
        if (optionElements.length >= 3) {
          console.log(`Set ${i + 1} has ${optionElements.length} options, clicking the third one.`);
          const thirdOption = optionElements[2]; // Index 2 for the 3rd option
          await thirdOption.click();
        } else if (optionElements.length > 0) {
          console.warn(`Set ${i + 1} does not have 3 options, clicking the available one.`);

          // Click the 1st or 2nd option if available
          const fallbackOption = optionElements[0] || optionElements[1]; // Try to click first or second option
          if (fallbackOption) {
            await fallbackOption.click();
          } else {
            console.error(`No valid options found to click in Set ${i + 1}`);
          }
        } else {
          console.error(`Set ${i + 1} does not have any options to click`);
        }
      } catch (error) {
        console.error(`Error clicking an option in Set ${i + 1}: ${error.message}`);
      }
    }
  }
  let scrollCount = 0;
  const maxScrolls = 6; 
  let moreSetsExist = true;

  while (moreSetsExist && scrollCount < maxScrolls) {
    await selectVisibleThirdOptions();
    
    // Perform a swipe to reveal more sets (faster swiping)
    console.log(`Swiping to reveal more options... Scroll count: ${scrollCount + 1}`);
    await performSwipe(driver, 617, 1783, 622, 757, 800); // Faster swipe with reduced duration
    scrollCount++; // Increment scroll count

    // Check if new sets have appeared by comparing the number of sets before and after swipe
    const gridViewXpath = `//android.widget.GridView[@resource-id="org.samagra.missionPrerna:id/choices_recycler_view"]`;
    const visibleGridViewsAfterSwipe = await driver.$$(gridViewXpath);
    
    if (visibleGridViewsAfterSwipe.length === 0) {
      console.log("No more sets are visible on the screen. Ending loop.");
      moreSetsExist = false;
    } else {
      console.log("New sets found, continuing...");
    }

    await driver.pause(500); 
  }

  // Scroll until the "आगे बढ़े" button is visible
  const aageBadheButtonXpath = '//android.widget.TextView[@content-desc="आगे बढ़े"]';
  const aageBadheButton = await driver.$(aageBadheButtonXpath);
  await aageBadheButton.click();
}






// export async function fillOdkForm(driver) {
//   await driver.setTimeout({ implicit: 20000 });

//   // Scroll function with enhanced logic
//   async function scrollUntilVisible(xpath, setIndex, maxAttempts = 5) {
//     for (let attempt = 0; attempt < maxAttempts; attempt++) {
//       console.log(`Attempt ${attempt + 1}: Searching for set ${setIndex}`);
//       const elements = await driver.$$(xpath);
//       if (elements.length > 0) {
//         console.log(`Set ${setIndex} found!`);
//         return elements[0]; // Return the first found element
//       }
//       // Perform swipe action to scroll
//       console.log(`Set ${setIndex} not found, swiping...`);
//       await performSwipe(driver, 617, 1783, 622, 757, 1300); 
//       await driver.pause(2000);
//     }
//     throw new Error(`Element with xpath ${xpath} not found after ${maxAttempts} attempts`);
//   }

//   // Function to select the third option in each set
//   async function selectThirdOption(setIndex) {
//     console.log(`Selecting third option in set ${setIndex}`);
//     const gridViewXpath = `(//android.widget.GridView[@resource-id="org.samagra.nisai:id/choices_recycler_view"])[${setIndex}]/android.widget.RelativeLayout`;
//     await scrollUntilVisible(gridViewXpath, setIndex); // Pass the setIndex for logging
//     const optionElements = await driver.$$(gridViewXpath);

//     if (optionElements.length >= 3) {
//       console.log(`Set ${setIndex} has ${optionElements.length} options, clicking the third one.`);
//       for(){}
//       const thirdOption = optionElements[2]; // Index 2 for the 3rd option
//       await thirdOption.click();
//     } else {
//       console.error(`Set ${setIndex} does not have enough options (found ${optionElements.length})`);
//     }
//   }

//   // Loop through all 4 sets
//   for (let i = 1; i <= 4; i++) {
//     await selectThirdOption(i);
//     // Perform swipe if needed to move to the next set 
//     if (i < 4) {
//       console.log(`Swiping to move to set ${i + 1}`);
//       await performSwipe(driver, 617, 1783, 622, 757, 1300);
//     }
//   }

//   // Scroll until the "आगे बढ़े" button is visible
//   const aageBadheButtonXpath = '//android.widget.TextView[@content-desc="आगे बढ़े"]';
//   console.log(`Scrolling until 'आगे बढ़े' button is visible`);
//   await scrollUntilVisible(aageBadheButtonXpath);
//   const aageBadheButton = await driver.$(aageBadheButtonXpath);
//   await aageBadheButton.click();
// }




// export async function fillOdkForm(driver) {
//   await driver.setTimeout({ implicit: 20000 });
//   async function selectThirdOption(setIndex) {
//     const options = await driver.$$(
//       `(//android.widget.GridView[@resource-id="org.samagra.nisai:id/choices_recycler_view"])[${setIndex}]/android.widget.RelativeLayout`
//     );
//     if (options.length < 4) {
//       // Click the 3rd option (index 1 in XPath)
//       const thirdOption = await driver.$(
//         `(//android.widget.GridView[@resource-id="org.samagra.nisai:id/choices_recycler_view"])[${setIndex}]/android.widget.RelativeLayout[1]`
//       );
//       await thirdOption.click();
//     } else {
//       console.error(`Set ${setIndex} does not have enough options (found ${options.length})`);
//     }
//   }

//   for (let i = 1; i <= 4; i++) {
//     await selectThirdOption(i);
//     // Perform swipe if needed to move to the next set 
//     if (i < 4) {
//       await performSwipe(driver, 617, 1783, 622, 757, 1300);
//     }
//   }
//          const aageBadheButton = await driver.$(
//        '//android.widget.TextView[@content-desc="आगे बढ़े"]'
//       );
//       await aageBadheButton.click();
// }



// export async function fillOdkForm(driver) {
//       await driver.setTimeout({ implicit: 20000 });
      
//       const firstRadioButton = await driver
//         .$(
//           '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[1]'
//         )
//        await firstRadioButton .click();

//       const secondRadioButton = await driver
//         .$(
//           '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[5]'
//         )
//        await secondRadioButton.click();
//        await performSwipe(driver, 617, 1783, 622, 757, 1000);
       
  

//       const thirdRadioButton = await driver
//         .$(
//           '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[9]'
//         )
//        await thirdRadioButton.click();
//        await performSwipe(driver, 617, 1783, 622, 757, 1000);

//       const fourthRadioButton = await driver
//         .$(
//           '(//android.widget.RadioButton[@resource-id="org.samagra.nisai:id/text_label"])[13]'
//         )
//        await fourthRadioButton.click();
//        await performSwipe(driver, 617, 1783, 622, 757, 1000);
    

//       const aageBadheButton = await driver.$(
//         '//android.widget.TextView[@content-desc="आगे बढ़े"]'
//       );
//       await aageBadheButton.click();
// }