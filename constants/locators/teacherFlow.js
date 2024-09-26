export const teacherProfileText =`//android.widget.ScrollView/android.view.View[1]`
  // '//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title_mentor_details"]';
export const chatbotIcon = `//android.view.View[@content-desc="Next Arrow"]`;
export const nipunLakshyaAppTitle =
  '//android.widget.TextView[@text="निपुण लक्ष्य ऐप "]';
export const appVersion = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_version"]`;
export const teacherName = `//android.widget.ScrollView/android.view.View[1]/android.widget.TextView[1]`;
export const udise = `//android.widget.ScrollView/android.view.View[1]/android.widget.TextView[3]`;
export const district = `//android.widget.ScrollView/android.view.View[1]/android.widget.TextView[2]`;
export const block = `//android.widget.ScrollView/android.view.View[1]/android.widget.TextView[4]`;
export const teacherAnkalanSaransh = `//android.widget.TextView[@text="शिक्षक आकलन सारांश"]`;
export const currentMonthAnkalan =
  '//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/periodTextView" and @text="वर्तमान सप्ताह आकलन"]';


//week
export const countOfStudentAssesedInWeek =
  '(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/labelTextView"])[1]';
export const countNipunStudentsInWeek =
  '(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/labelTextView"])[2]';
//month
export const countNipunStudentsInMonth =
 `(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/labelTextView"])[4]`;
export const countOfStudentAssesedInMonth = 
 `(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/labelTextView"])[3]`;



export const studentAkalanButton = `//android.widget.TextView[@text="विद्यार्थी आकलन"]`;
export const schoolAssessmentSummaryButton = `//android.widget.TextView[@text="आकलन सारांश"]`;

// school summary page
export const headerTextSchoolAkalanSaransh = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title"]`;
export const appVersionInHeader = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_version"]`;
export const grade1Label = `//android.widget.TextView[@text="कक्षा 1"]`;
export const grade2Label = `//android.widget.TextView[@text="कक्षा 2"]`;
export const grade3Label = `//android.widget.TextView[@text="कक्षा 3"]`;
export const allGradesLabel = `//android.widget.TextView[@text="सभी कक्षा"]`;

export const month = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/month_tv" and @text="माह"]`;
export const totalStudents = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/total_students_count_tv" and @text="कुल
विद्यार्थी"]`;
export const studentsAssessed = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/total_assessments_count_tv" and @text="विद्यार्थी
आकलन किए"]`;
export const nipunStudents = `//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/nipun_student_count_tv" and @text="विद्यार्थी
निपुण"]`

export const monthTable=`//androidx.recyclerview.widget.RecyclerView[@resource-id="org.samagra.missionPrerna:id/rvSchoolHistory"]`

export const backButtonOnSchoolSummaryPage=`//android.widget.ImageButton[@content-desc="Navigate up"]`


//student listing page 

export const selectGradeTextElement=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvChooseClass"]`
export const firstStudentCard=`(//android.view.ViewGroup[@resource-id="org.samagra.missionPrerna:id/clStudentDetails"])[1]`
export const studentName=`//*[@resource-id="org.samagra.missionPrerna:id/tvStudentName"]`
export const studentRollNo=`//*[@resource-id="org.samagra.missionPrerna:id/tvStudentRollNo"]`
export const studentLastAssessedDate=`//*[@resource-id="org.samagra.missionPrerna:id/tvStudentLastAssessmentDate"]`
export const takeAssessmentButton=`//*[@resource-id="org.samagra.missionPrerna:id/btTakeAssessment"]`
export const nipunTextElement=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunText" and @text="निपुण: "]`
export const nipunCount=`(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunCount"])[1]`
export const notNipunTextElement=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunText" and @text="निपुण नहीं है: "]`
export const notNipunCount=`(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunCount"])[2]`
export const pendingAssessmentText=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunText" and @text="आकलन नहीं हुआ: "]`
export const pendingAssessmentCount=`(//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tvNipunCount"])[3]`
export const monthText=`//*[@resource-id="org.samagra.missionPrerna:id/tvMonth"]`
export const previousMonth=`//*[@resource-id="org.samagra.missionPrerna:id/ivPreviousMonth"]`  
export const nextMonth=`//*[@resource-id="org.samagra.missionPrerna:id/ivNextMonth"]`
export const refreshButton=`//android.widget.Button[@content-desc="Refresh"]`
export const studentListingToHomePageBackButton=`//android.widget.ImageButton[@content-desc="Navigate up"]`
export const studentNameNotInListTextElement=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/help_tv"]`
export const anynoumousStudentTakeAssessmentButton=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/take_assessment_btn"]`
export const akalanTextInHeaderElement=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/title"]`

// student result page 
export const assessNextStudent=`//android.widget.Button[@resource-id="org.samagra.missionPrerna:id/cta"]`
export const studentNameOnResultPage=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_name"]`
export const assessmenttakenDateOnResultPage=`//android.widget.TextView[@resource-id="org.samagra.missionPrerna:id/tv_date"]`
