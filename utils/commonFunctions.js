

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
                timeout: 10000, // 10 seconds
                timeoutMsg: 'No students found after waiting for 10 seconds'
            }
        );

        // Find all matching elements using XPath
        const students = await driver.$$(
            '//android.widget.TextView[@resource-id="org.samagra.nisai:id/btTakeAssessment"]'
        );

        // Determine the number of elements found
        const numberOfStudents = students.length;

        if (numberOfStudents > 0) {
            // Generate a random index
            const randomIndex = Math.floor(Math.random() * numberOfStudents);

            // Log the number of students found and the random index chosen
            console.log(`Found ${numberOfStudents} students. Clicking on student at index ${randomIndex}.`);

            // Click on the element at the random index
            await students[randomIndex].click();
        } else {
            console.log('No students found.');
        }
    } catch (error) {
        console.error('An error occurred while trying to find and click on a random student:', error.message);
    }
}

