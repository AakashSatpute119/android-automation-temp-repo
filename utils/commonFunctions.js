import * as teacherFlowLocators from "../constants/locators/teacherFlow.js";


export async function selectRandomStudent(driver) {
    try {
        // Wait for up to 10 seconds for the elements to be present
        await driver.waitUntil(
            async () => {
                const students = await driver.$$(
                    '//android.widget.TextView[@resource-id="org.samagra.nisai:id/btTakeAssessment"]'
                );
                return students.length > 0;
            },
            {
                timeout: 10000, 
                timeoutMsg: 'No students found after waiting for 10 seconds'
            }
        );

        
        const students = await driver.$$(
            '//android.widget.TextView[@resource-id="org.samagra.nisai:id/btTakeAssessment"]'
        );
        const numberOfStudents = students.length;

        if (numberOfStudents > 0) {
            const randomIndex = Math.floor(Math.random() * numberOfStudents);
            console.log(`Found ${numberOfStudents} students. Clicking on student at index ${randomIndex}.`);
            await students[randomIndex].click();
        } else {
            console.log('No students found.');
        }
    } catch (error) {
        console.error('An error occurred while trying to find and click on a random student:', error.message);
    }
}


export async function studentData (driver){
    const studentName=await driver.$(teacherFlowLocators.studentNameOnResultPage).getText();
    const assessmenttakenDateOnResultPage=await driver.$(teacherFlowLocators.assessmenttakenDateOnResultPage).getText();
    console.log("Student Name: "+studentName);
    console.log("Assessed Date"+assessmenttakenDateOnResultPage);
    const currentUtcTimestamp = new Date().toISOString();
    console.log(currentUtcTimestamp);

}

export async function handleBsttFlow(driver) {
 const endButton= await  driver.$("//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[3]/android.widget.Button")
  await endButton.click();
 const storeBaseQButton= await driver.$("//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[2]/android.widget.Button")
 await storeBaseQButton.click();
}