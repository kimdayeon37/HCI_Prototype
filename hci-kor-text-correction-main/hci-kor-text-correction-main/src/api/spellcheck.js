import axios from "axios";
export const spellCheck = async (sentence) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/check", { sentence })
      .then((req) => {
        if (req.status == 200) {
          if (!req.data.success) {
            alert(req.data.message);
          }
          resolve(req.data);
        }
        resolve({ success: false });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  spellCheck,
};
