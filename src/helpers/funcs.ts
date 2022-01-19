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
  formValidEdit: (title, img, price, desc, finCat) => {
    if (title && img && price && desc && Boolean(finCat)) {
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
};

export default help;
