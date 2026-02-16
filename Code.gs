const SHEET_NAME = "studentdata";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      // Add headers if new sheet
      sheet.appendRow(["Date", "Full Name", "College Name", "Branch", "Graduation Status", "Batch", "Semester", "Phone", "Email"]);
    }

    const data = JSON.parse(e.postData.contents);
    
    // Check for duplicates (optional, based on email)
    // const emailColumn = 9; // Adjusted for new column
    // const emails = sheet.getRange(2, emailColumn, sheet.getLastRow(), 1).getValues().flat();
    // if (emails.includes(data.email)) {
    //   return ContentService
    //     .createTextOutput(JSON.stringify({ "result": "error", "error": "Email already exists" }))
    //     .setMimeType(ContentService.MimeType.JSON);
    // }

    const nextRow = sheet.getLastRow() + 1;
    const newRow = [
      new Date(),             // Date
      data.fullName,          // Full Name
      data.collegeName,       // College Name
      data.branch,            // Branch
      data.graduationStatus,  // Graduation Status
      data.batch || "",       // Batch (NEW - Optional)
      data.semester || "",    // Semester (Optional)
      "'" + data.phone,       // Phone (store as string)
      data.email              // Email
    ];

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
        sheet = doc.insertSheet(SHEET_NAME);
        sheet.appendRow(["Date", "Full Name", "College Name", "Branch", "Graduation Status", "Batch", "Semester", "Phone", "Email"]);
    }
}
