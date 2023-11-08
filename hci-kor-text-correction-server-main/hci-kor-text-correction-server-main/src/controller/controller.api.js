const ResponseUtil = require("../util/ResponseUtil");
const SpellChecker = require("../service/SpellChecker")
class Controller {
  static async main(req, res, next) {
    const param = {
      message: {
        title: "JWMSG API SERVER",
        text: "This is API Server For JWMSG Service",
      },
    };
    ResponseUtil.ResponseSuccess200(req, res, param);
  }
  static async check(req, res, next) {
    const {sentence} = req.body
    try{
      if(sentence == undefined) throw "문장을 입력해 주시기 바랍니다."
      const checkList = await SpellChecker.check(sentence);
      const param = {
        data: checkList,
        message: {
          text: "정상적으로 완료되었습니다.",
        },
      };
      ResponseUtil.ResponseSuccess200(req, res, param);
    }catch(error){
      console.error(error)
      ResponseUtil.ResponseFail200(req,res,{message:{text:"문제가 발생했습니다.",error}})
    }   
  }
}
module.exports = Controller;
