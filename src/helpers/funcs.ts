import { HelpTypes } from "../types/types";

const help: HelpTypes = {
  getPath: (location) => {
    const { pathname } = location;
    let partOfUrl = "/";
    if (pathname.includes("pc")) {
      partOfUrl = "?category_like=pc";
    } else if (pathname.includes("ps")) {
      partOfUrl = "?category_like=ps";
    } else if (pathname.includes("xbx")) {
      partOfUrl = "?category_like=xbx";
    }
    return partOfUrl;
  },

  formValidSignIn: (logMess, passMess) => {
    if (logMess === "Login is OK" && passMess === "Password is OK") {
      return true;
    }
    return false;
  },

  formValidSignUp: (logMess, passMess, repPassMess) => {
    if (logMess === "Login is OK" && passMess === "Password is OK" && repPassMess === "Repeated password is OK") {
      return true;
    }
    return false;
  },

  formValidEdit: (title, img, price, desc, finCat) => {
    if (title && img && price && desc && Boolean(finCat)) {
      return true;
    }
    return false;
  },
  formValidPic: (pic) => {
    if (pic.length > 0) {
      return true;
    }
    return false;
  },
  formValidPass: (pass, repPass) => {
    if (pass === "New password is OK" && repPass === "Repeated password is OK") {
      return true;
    }
    return false;
  },
  formValidEditClass: (pc, ps, xbx, title, img, price, desc) => {
    const finalCategory = [pc ? "pc" : null, ps ? "ps" : null, xbx ? "xbx" : null]
      .filter((categor) => Boolean(categor))
      .join(", ");
    if (title && img && price && desc && Boolean(finalCategory)) {
      return true;
    }
    return false;
  },
  formValidProfile: (name) => {
    if (name.length > 2) {
      return true;
    }
    return false;
  },
  verifyName: (log, marker) => {
    let str = "";
    if (marker === "signinout") {
      if (!log) {
        str = "Please enter login";
        return str;
      }
      if (log.length < 3 || log.length > 12) {
        str = "Login must be between 3 and 12 characters";
        return str;
      }
      str = "Login is OK";
      return str;
    }
    if (marker === "change") {
      if (!log) {
        str = "Please enter new login";
        return str;
      }
      if (log.length < 3 || log.length > 12) {
        str = "New login must be between 3 and 12 characters";
        return str;
      }
      str = "New login is OK";
      return str;
    }
    return str;
  },

  verifyPassword: (pass, marker) => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let str = "";
    if (marker === "signinout") {
      if (!pass) {
        str = "Please enter password";
        return str;
      }
      if (pass.length < 8 || pass.length > 15) {
        str = "Password must be between 8 and 15 characters";
        return str;
      }
      if (pass[0].toUpperCase() !== pass[0]) {
        str = "First character of password must be capital";
        return str;
      }
      if (!alphNumPass.test(pass)) {
        str = "At least 1 character of password must be numeric or alphabetic";
        return str;
      }
      str = "Password is OK";
      return str;
    }
    if (marker === "change") {
      if (!pass) {
        str = "Please enter password";
        return str;
      }
      if (pass.length < 8 || pass.length > 15) {
        str = "Password must be between 8 and 15 characters";
        return str;
      }
      if (pass[0].toUpperCase() !== pass[0]) {
        str = "First character of password must be capital";
        return str;
      }
      if (!alphNumPass.test(pass)) {
        str = "At least 1 character of password must be numeric or alphabetic";
        return str;
      }
      str = "New password is OK";
      return str;
    }
    return str;
  },
  comparePass: (pass: string, repPass: string, marker: string) => {
    let str = "";
    if (marker === "signinout") {
      if (repPass.length <= 0) {
        str = "Please repeat password";
        return str;
      }
      if (pass !== repPass || !repPass) {
        str = "Repeated password is not correct";
        return str;
      }
      str = "Repeated password is OK";
      return str;
    }
    if (marker === "change") {
      if (repPass.length <= 0) {
        str = "Please repeat new password";
        return str;
      }
      if (pass !== repPass || !repPass) {
        str = "Repeated password is not correct";
        return str;
      }
      str = "Repeated password is OK";
      return str;
    }
    return str;
  },
};

export default help;
