module.exports = {
    apps: [
      {
        name: "hci-kor-text-correction-server",
        script: "src/app.js",
        exec_mode: "cluster",
        instances: 0,
      },
    ],
  };
  