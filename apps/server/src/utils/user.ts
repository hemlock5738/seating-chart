import { getEmail } from "../apis/getEmail.js";

export const isOwner = () => {
  const userEmail = getEmail();
  const scriptId = ScriptApp.getScriptId();
  const file = DriveApp.getFileById(scriptId);
  const owner = file.getOwner();
  return owner.getEmail() === userEmail;
};

export const isEditor = () => {
  const userEmail = getEmail();
  const scriptId = ScriptApp.getScriptId();
  const file = DriveApp.getFileById(scriptId);
  const editors = file.getEditors();
  return editors.some((editor) => editor.getEmail() === userEmail);
};
