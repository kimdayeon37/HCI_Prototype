const hanspell = require("hanspell");
const axios = require("axios");
const cheerio = require("cheerio");
const querystring = require("querystring");
class SpellChecker {
  static async checkPNU(sentence) {
    return new Promise((resolve, reject) => {
      const checkList = [];
      const runCheck = (data) => {
        // console.log(data);
        checkList.unshift(...data);
      };
      const endCheck = () => {
        resolve(checkList);
      };
      const errCheck = (err) => {
        throw err;
      };
      hanspell.spellCheckByPNU(sentence, 6000, runCheck, endCheck, errCheck);
    });
  }
  static async checkDAUM(sentence) {
    return new Promise((resolve, reject) => {
      const checkList = [];
      const runCheck = (data) => {
        checkList.push(...data);
      };
      const endCheck = () => {
        resolve(checkList);
      };
      const errCheck = (err) => {
        throw err;
      };
      hanspell.spellCheckByDAUM(sentence, 60000, runCheck, endCheck, errCheck);
    });
  }
  static async checkPNU_J(sentence) {
    // console.log({ sentence });
    const query = querystring.stringify({ text1: sentence });
    const res = await axios({
      // url: "http://speller.cs.pusan.ac.kr/results",
      url: "http://164.125.7.61/speller/results",
      method: "POST",
      data: query,
    });
    if (res.status != 200) {
      throw "Request Error (" + res.status + ")";
    }
    const $ = cheerio.load(res.data);
    const scripts = $("script").filter(function () {
      return $(this).html().indexOf("data = [") > -1;
    });
    if (scripts.length === 1) {
      const text = $(scripts[0]).html();
      const reg = /data = (\[[\w\W]*\])\;/gi;
      const regex = text.match(reg);
      if (regex.length == 0) return [];
      const data = regex[0].split("data = ")[1].trim().replace(";", "");
      console.log(data);
      return JSON.parse(data);
    }
  }
  static async check(sentence) {
    // const checkListDAUM = await this.checkDAUM(sentence);
    const checkListPNU = await this.checkPNU(sentence);
    // const checkListPNU_J = await this.checkPNU_J(sentence);
    // console.log(JSON.stringify(checkListPNU_J))
    const checkList = [...checkListPNU];
    // for (const check of checkListPNU) {
    //   const tmp = checkListDAUM.find((e) => e.token == check.token);
    //   if (tmp == null) {
    //     checkList.push(check);
    //   }
    // }
    return checkList;
  }
}

module.exports = SpellChecker;
