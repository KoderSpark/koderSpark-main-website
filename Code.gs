function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("Spreadsheet not found. Please ensure the script is bound to a spreadsheet.");

    // Determine sheet name
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    if (!sheet) sheet = ss.insertSheet("Sheet1");

    // Parse data
    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (f) {
      // Fallback for form-encoded data
      data = e.parameter;
    }
    
    var headers = [
      "Date Applied", 
      "Opportunity Title", 
      "Type", 
      "Student Name", 
      "Email", 
      "Phone", 
      "College", 
      "Course"
    ];

    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f0f0f0");
      sheet.setFrozenRows(1);
    }

    // Append the student's data
    sheet.appendRow([
      data.appliedAt || new Date().toLocaleString(),
      data.opportunityTitle || "N/A",
      data.opportunityType || "N/A",
      data.studentName || "N/A",
      data.studentEmail || "N/A",
      data.studentPhone || "N/A",
      data.studentCollege || "N/A",
      data.studentCourse || "N/A"
    ]);

    return ContentService.createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Ensure the sheet is ready
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  if (!sheet) sheet = ss.insertSheet("Sheet1");
  
  var headers = ["Date Applied", "Opportunity Title", "Type", "Student Name", "Email", "Phone", "College", "Course"];
  
  sheet.clear();
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f0f0f0");
  sheet.setFrozenRows(1);
}

function doGet() {
  return ContentService.createTextOutput("Koderspark Script is Live and Ready!");
}
