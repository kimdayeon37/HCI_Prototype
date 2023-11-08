<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1>프로젝트 소개</h1>
        <br />
        <h3>
          본 프로젝트는, 광운대학교 정보융합학부 HCI와 UX/UI 평가 기말 프로젝트
          입니다.
        </h3>
        <br />
        <v-card>
          <v-card-title>
            <h4>1. 프로젝트 주제</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            본 프로젝트는 맞춤법/문법 첨삭시스템이 문장에 개입하는 정도나, 사용
            나이대 및 사용에 있어서 UX 기능적 차이에 따라 첨삭을 사용하는 사람과
            문장을 읽는 독자의 만족도 평가를 기반으로 적합한 맞춤법/문법
            첨삭기의 UI 와 조금 더 만족도 높은 첨삭 UX를 구현하고자 합니다.
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>
            <h4>2. 평가의 진행방법</h4>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            조금 더 객관적이고 정확한 평가를 위해 비공개. <br />
            평가 진행 이후 추후 공개.
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-title>
            <h4>3. 팀원 소개</h4>
          </v-card-title>
          <v-divider class="mb-2"></v-divider>
          <v-card-text class="my-0 py-1">
            <b>권택용 (정보융합학부, 2022204003)</b>
            <v-btn x-small color="info" class="mx-1">PM</v-btn>
          </v-card-text>
          <v-card-text class="my-0 py-1">
            <b>정재완 (정보융합학부, 2019204040)</b>
            <v-btn x-small color="error" class="mx-1">DEV</v-btn>
            <v-btn x-small color="success" class="mx-1" @click="contact">
              Contact <v-icon class="ml-2" size="18">mdi-web</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="my-0 py-1">
            <b>김형빈 (정보융합학부, 2018204073)</b>
          </v-card-text>
          <v-card-text class="my-0 py-1">
            <b>김다연 (정보융합학부, 2020204014)</b>
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
  methods: {
    contact() {
      window.open("http://jwmsg.kr");
    },
  },
};
</script>
