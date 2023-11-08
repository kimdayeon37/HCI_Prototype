<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1>라이선스 안내 (고지)</h1>
        <br />
        <h3>본 웹서비스는 다음 라이선스를 준수합니다.</h3>
        <br />
        <v-card>
          <v-card-title>
            <h4>1. 맞춤법/문법 검사 관련 라이선스</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            현재 본 웹서비스에서 사용중인 모듈은
            <a href="https://github.com/9beach/hanspell">hanspell</a> 입니다.
            <br />
            이에 따라 해당 모듈에서 제공하는 라이선스인 MIT 를 따르고 있으며,
            해당 모듈의 라이선스 고지에 따라 부산대학교
            인공지능연구실/(주)나라인포테크의 맞춤법 웹 서비스는 권리자가 고지한
            대로 개인이나 학생만 무료로 사용할 수 있습니다.<br />
            이에 본 라이선스에 따르지 않는 상업/기업 에서 사용될 경우,
            권리자들의 저작권을 위배하는것이며, 위에서 명시한 저작권자의 제제를
            받을 수 있습니다.
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>
            <h4>2. 웹서비스 관련 라이선스</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            현재 본 웹서비스는 "광운대학교 정보융합학부 HCI와 UX평가" 수업의
            기말 프로젝트를 위해 제작되었습니다.
            <br />
            이에 따라, 본 서비스는 HCI와 UX평가 용도 외에 사용을 엄금하며, 본
            서비스의 UI/UX 및 디자인은 위 수업에 참여하여 본 서비스를 개발한
            개발자들에게 있음을 안내합니다.
            <br />
            이에 따라, 본 라이선스에 따르지 않고, 허가되지 않은 자가 용도 외의
            사용을 할 경우 권리자들의 저작권을 위배하는것이며, 위에서 명시한
            저작권자의 제제를 받을 수 있습니다.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "NotFound",
  components: {},
};
</script>
