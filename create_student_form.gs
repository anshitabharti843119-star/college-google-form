/**
 * Creates a professional college student data collection form.
 * Run createCollegeStudentForm() once from Google Apps Script.
 */
function createCollegeStudentForm() {
  const form = FormApp.create('College Student Information & Career Profile')
    .setDescription(
      'Please complete this form to help us maintain an accurate student profile for academic, communication, and career-support purposes. Required fields must be completed.'
    )
    .setProgressBar(true)
    .setConfirmationMessage('Thank you. Your student profile has been submitted successfully.');

  const emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .setHelpText('Enter a valid email address.')
    .build();

  const phoneValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('^\\+?[0-9][0-9 ()-]{7,19}$')
    .setHelpText('Enter a valid phone or WhatsApp number.')
    .build();

  const urlValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('^https?://.+')
    .setHelpText('Enter a complete link beginning with http:// or https://.')
    .build();

  const scoreValidation = FormApp.createTextValidation()
    .requireTextMatchesPattern('^[0-9]{1,3}(\\.[0-9]{1,2})?%?$')
    .setHelpText('Enter a valid percentage or CGPA/SGPA value.')
    .build();

  function required(item) {
    item.setRequired(true);
    return item;
  }

  function text(title, isRequired, validation, helpText) {
    const item = form.addTextItem().setTitle(title);
    if (helpText) item.setHelpText(helpText);
    if (validation) item.setValidation(validation);
    if (isRequired) required(item);
    return item;
  }

  function paragraph(title, isRequired, helpText) {
    const item = form.addParagraphTextItem().setTitle(title);
    if (helpText) item.setHelpText(helpText);
    if (isRequired) required(item);
    return item;
  }

  function multipleChoice(title, choices, isRequired) {
    const item = form.addMultipleChoiceItem().setTitle(title).setChoiceValues(choices);
    if (isRequired) required(item);
    return item;
  }

  function checkbox(title, choices, isRequired) {
    const item = form.addCheckboxItem().setTitle(title).setChoiceValues(choices);
    if (isRequired) required(item);
    return item;
  }

  function dropdown(title, choices, isRequired) {
    const item = form.addListItem().setTitle(title).setChoiceValues(choices);
    if (isRequired) required(item);
    return item;
  }

  function upload(title, isRequired, helpText, types) {
    const item = form.addTextItem().setTitle(title + ' (upload link)');
    if (helpText) item.setHelpText(helpText);
    if (isRequired) required(item);
    return item;
  }

  // Section 1: Personal Information
  form.addPageBreakItem()
    .setTitle('Section 1: Personal Information')
    .setHelpText('Tell us about yourself.');
  text('Full Name', true, null, 'Enter your name as it appears on official records.');
  multipleChoice('Gender', ['Male', 'Female', 'Other'], true);
  required(form.addDateItem().setTitle('Date of Birth'));
  upload('Profile Photo Upload', false, 'Paste a Google Drive or image link for your profile photo.', null);
  dropdown('Blood Group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], true);

  // Section 2: Contact Information
  form.addPageBreakItem()
    .setTitle('Section 2: Contact Information')
    .setHelpText('Use current details so we can reach you about academic updates and opportunities.');
  text('College Email ID', true, emailValidation);
  text('Personal Email ID', false, emailValidation);
  text('Mobile Number / WhatsApp Number', true, phoneValidation);
  paragraph('Current Address', true);
  paragraph('Permanent Address', false);
  text('City, State, Pincode', true, null, 'Example: Pune, Maharashtra, 411001');

  // Section 3: Academic Information
  form.addPageBreakItem()
    .setTitle('Section 3: Academic Information')
    .setHelpText('Share your current academic details and official student identifiers.');
  text('College Name', true);
  text('University Name', true);
  dropdown('Course / Degree', ['B.Tech', 'BCA', 'BBA', 'MBA', 'B.Sc', 'M.Sc', 'Other'], true);
  text('Branch / Specialization', true);
  dropdown('Current Year / Semester', ['1st Year', '2nd Year', '3rd Year', '4th Year'], true);
  text('Roll Number / Enrollment Number', true);
  upload('College ID Card', false, 'Paste a Google Drive link to a clear image or PDF of your college ID card.', null);
  text('10th Percentage / CGPA', true, scoreValidation);
  text('12th Percentage / CGPA', true, scoreValidation);
  text('Current CGPA / SGPA', true, scoreValidation);
  multipleChoice('Any Backlogs?', ['Yes', 'No'], true);

  // Section 4: Skills & Career
  form.addPageBreakItem()
    .setTitle('Section 4: Skills & Career')
    .setHelpText('Highlight your strengths, experience, and career direction.');
  checkbox('Technical Skills', [
    'C', 'C++', 'Java', 'Python', 'HTML/CSS', 'JavaScript', 'React', 'SQL', 'Other'
  ], false);
  checkbox('Soft Skills', [
    'Communication', 'Teamwork', 'Leadership', 'Problem Solving', 'Time Management', 'Adaptability', 'Other'
  ], false);
  checkbox('Known Languages', [
    'Hindi', 'English', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Other'
  ], false);
  text('LinkedIn Profile Link', false, urlValidation);
  text('GitHub Profile Link', false, urlValidation);
  text('Portfolio Link', false, urlValidation);
  upload('Resume Upload', false, 'Paste a Google Drive link to your latest resume PDF.', null);
  paragraph('Career Goal / Interest Area', false);

  // Section 5: Extra Curricular & Other
  form.addPageBreakItem()
    .setTitle('Section 5: Extra Curricular & Other')
    .setHelpText('Tell us about your interests, campus involvement, and feedback.');
  checkbox('Hobbies & Interests', [
    'Reading', 'Writing', 'Music', 'Sports', 'Travel', 'Photography', 'Gaming', 'Volunteering', 'Other'
  ], false);
  paragraph('Have you participated in any clubs/committees?', false);
  multipleChoice('Hosteller or Day Scholar?', ['Hosteller', 'Day Scholar'], true);
  multipleChoice('How did you hear about us?', [
    'College / University', 'Friend or Classmate', 'Social Media', 'Website', 'Email', 'Other'
  ], false);
  paragraph('Any suggestions or queries?', false);

  Logger.log('Form created successfully.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Respond URL: ' + form.getPublishedUrl());
}
