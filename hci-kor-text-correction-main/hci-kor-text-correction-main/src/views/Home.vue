<template>
  <splitpanes :push-other-panes="false" :dbl-click-splitter="false">
    <pane
      min-size="70%"
      max-size="80%"
      size="80%"
      style="height: 100%; overflow-y: scroll"
    >
      <v-container style="min-height: 100%" @click="goFocus">
        <v-row>
          <v-col>
            <TipTapTest
              :stopInputHook="check"
              :changeHook="change"
              ref="editor"
              style="min-height: 100%"
              :value="contentText"
              @input="changeText"
            />
          </v-col>
        </v-row>
      </v-container>
    </pane>
    <pane
      min-size="20%"
      max-size="30%"
      size="20%"
      style="height: 100%; overflow-y: scroll"
    >
      <v-container
        style="min-height: 100%; background-color: #333; color: #fff"
        fluid
      >
        <v-row>
          <v-col>
            <h2>교정내용</h2>
          </v-col>
        </v-row>
        <v-divider dark></v-divider>
        <v-row class="py-2">
          <v-scroll-y-transition leave-absolute>
            <v-col cols="12" v-if="isChange && !isBlanked">
              <v-card>
                <v-card-text class="text-center">
                  <h2 class="py-2">작성중</h2>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    class="my-2"
                  ></v-progress-circular>
                </v-card-text>
              </v-card>
            </v-col>
          </v-scroll-y-transition>
          <v-scroll-y-transition hide-on-leave leave-absolute>
            <v-col cols="12" v-if="isLoading && !isBlanked">
              <v-card>
                <v-card-text class="text-center">
                  <h2 class="py-2">검사중</h2>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    class="my-2"
                  ></v-progress-circular>
                </v-card-text>
              </v-card>
            </v-col>
          </v-scroll-y-transition>
          <v-scroll-y-transition hide-on-leave leave-absolute>
            <v-col cols="12" v-if="isBlanked">
              <v-card>
                <v-card-text class="text-center">
                  <h2 class="py-2">문장을 입력하세요!</h2>
                </v-card-text>
              </v-card>
            </v-col>
          </v-scroll-y-transition>
          <v-scroll-y-transition hide-on-leave leave-absolute>
            <v-col cols="12" v-if="isGood">
              <v-card>
                <v-card-text class="text-center">
                  <h2 class="py-2">문장이 완벽합니다!</h2>
                  <v-icon color="success" size="80" class="text-weight-bold">
                    mdi-check
                  </v-icon>
                </v-card-text>
              </v-card>
            </v-col>
          </v-scroll-y-transition>

          <v-scroll-y-transition
            v-for="(check, index) in checkList"
            :key="index"
            hide-on-leave
            leave-absolute
          >
            <v-col cols="12">
              <v-card
                @mouseenter="hoverCorrectionCard($event, check)"
                @mouseleave="unHoverCorrectionCard($event, check)"
              >
                <v-card-text class="pa-0">
                  <v-container fluid>
                    <v-row>
                      <v-col cols="auto" class="px-2 py-1 mr-auto">
                        <v-btn small color="error" tile>
                          {{ textshorter(check.token) }}
                        </v-btn>
                      </v-col>
                      <v-col cols="auto" class="px-0 py-1 mx-auto">
                        <v-icon class="mx-3">mdi-arrow-right-bold</v-icon>
                      </v-col>
                      <v-col cols="auto" class="px-2 py-1 ml-auto">
                        <v-btn
                          small
                          color="success"
                          block
                          tile
                          @click="showSuggestions($event, check)"
                        >
                          {{ textshorter(check.suggestions[0]) }}
                        </v-btn>
                        <v-menu
                          flat
                          offset-y
                          nudge-left="-12"
                          v-model="showSugMenu"
                          :position-x="evt_x"
                          :position-y="evt_y"
                          dense
                        >
                          <v-card min-width="200px" elevation="0">
                            <v-card-title class="pa-0">
                              <v-btn small color="info" block tile
                                >추천 대치어</v-btn
                              >
                            </v-card-title>
                            <v-container>
                              <v-row justify="center">
                                <v-col
                                  cols="auto"
                                  v-for="(item, csindex) in suggestions"
                                  :key="csindex"
                                >
                                  <v-btn
                                    link
                                    dense
                                    color="success"
                                    tile
                                    small
                                    @click="fix($event, selectedChk, item)"
                                  >
                                    {{ item }}
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-divider></v-divider>
                    </v-row>
                    <v-row>
                      <v-col>{{ check.info }}</v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-scroll-y-transition>
        </v-row>
      </v-container>
    </pane>
  </splitpanes>
</template>

<script lang="js">
// @ is an alias to /src

import TipTapTest from "../components/TipTapTest.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { spellCheck } from "@/api/spellcheck";
export default {
  name: "Home",
  components: { TipTapTest, Splitpanes, Pane },
  mounted(){
    if(this.isMobile){
      this.$router.push("/mobile")
    }
  },
  methods: {
    changeText(e){
      // console.log(e)
      this.contentText = e
    },
    async check(html, text) {
      html;
      if(this.isLoading) return;
      this.isChange = false;
      if (this.isBlanked) return;
      this.isLoading = true;
      this.checkList = [];
      const data = await spellCheck(text);
      this.checkList = data.data;
      await this.textSelection();
      this.isLoading = false;
    },
    async calculateChcekPosition(){
      let offset = 0;
      for(const chk of this.checkList){
        const content = this.$refs.editor.getText();
        const start = content.indexOf(chk.token,offset) + 1
        if(start < 0) continue;
        const end = start + chk.token.length
        chk.position = {from:start,to:end}
        offset = end;
      }
    },
    async calculateCheckPositionHtml(){
      let offset = 0;
      for(const chk of this.checkList){
        const content = this.$refs.editor.editor.getHTML();
        const start = content.indexOf(chk.token,offset)
        if(start < 0) continue;
        const end = start + chk.token.length
        chk.position_html = {from:start,to:end}
        offset = end;
      }
    },
    async textSelection(){
      this.$refs.editor.unselectAll()
      await this.calculateChcekPosition()
      for(const chk of this.checkList){
        this.$refs.editor.selectText(chk.position)
      }
    },
    async change(html, text) {
      this.checkList = [];
      this.isChange = true;
      html;
      text;
    },
    async fix(evt,data,suggestion){
      evt;
      suggestion;
      this.$refs.editor.unselectText(data.position)
      this.calculateCheckPositionHtml()
      const content = this.$refs.editor.editor.getHTML()
      const newContent = content.slice(0,data.position_html.from) + suggestion + content.slice(data.position_html.to)
      const changeLen = suggestion.length - data.token.length
      this.contentText  = newContent
      const idx = this.checkList.findIndex(e=>e==data)
      if (idx > -1) this.checkList.splice(idx, 1)
      this.$refs.editor.unselectAll()

      for(const chk of this.checkList.slice(idx)){
        chk.position.to +=changeLen
        chk.position.from += changeLen
        this.$refs.editor.selectText(chk.position)
      }
    },
    goFocus(){
      // this.$refs.editor.editor.commands.focus('end')
    },
    textshorter(text) {
      if (text.length > 6) {
        return text.substr(0, 6) + "...";
      }
      return text;
    },
    showSuggestions(evt,data){
      evt.preventDefault();
      this.evt_x = evt.clientX;
      this.evt_y = evt.clientY;
      this.showSugMenu = true
      this.suggestions = data.suggestions;
      this.selectedChk = data
    },
    hoverCorrectionCard(evt,data){
      evt
      this.$refs.editor.selectText({from:data.position.from, to:data.position.to, color:"#FF0000", bold:true})
    },
    unHoverCorrectionCard(evt,data){
      evt
      this.$refs.editor.selectText({from:data.position.from, to:data.position.to})
    }
  },
  computed: {
    isBlanked() {
      return this.contentText.length == 0 || this.contentText == "<p></p>";
    },

    isGood() {
      return (
        !this.isBlanked &&
        this.checkList.length == 0 &&
        !this.isChange &&
        !this.isLoading
      );
    },
    isMobile(){
      const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      if(regex.test(navigator.userAgent)){
        return true
      }
      return false;
    }
  },

  data: () => {
    return {
      isChange: false,
      isLoading: false,
      checkList: [],
      contentText: "",
      showSugMenu:false,
      suggestions:[],
      selectedChk:null,
      evt_x:null,
      evt_y:null,
    };
  },
};
</script>

<style>
.splitpanes {
  background: rgba(0, 0, 0, 0);
}

.splitpanes--vertical > .splitpanes__splitter {
  box-shadow: 0 0 5px #000;
  min-width: 6px;
  background: #fff;
}

.splitpanes--horizontal > .splitpanes__splitter {
  box-shadow: 0 0 5px #000 inset;
  min-height: 6px;
  background: #fff;
}
.v-menu__content {
  box-shadow: 0 0 1px #000 !important;
}
</style>
