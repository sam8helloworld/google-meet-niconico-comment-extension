<template>
  <v-app>
    <v-container id="app" fluid>
      <div class="nico-comment-list">
        <p v-for="(comment, index) in comments" :key="index">
          {{ comment }}
        </p>
      </div>
      <div class="nico-comment-form" v-click-outside="()=>{this.cmdVisible = false}">
        <command-box v-show="cmdVisible" @change="cmdSelected"></command-box>
        <v-text-field
            label="コマンド"
            solo
            @focus="cmdVisible = true"
            v-model="commandStr"
        ></v-text-field>
        <v-textarea
            label="コメント"
            solo
            v-model="comment"
            @keydown.enter="sendComment"
        ></v-textarea>
        <comment-template-btn @selected="templateSelected"></comment-template-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import CommentTemplateBtn from "@/components/CommentTemplateBtn";
import CommandBox from "@/components/CommandBox";

export default {
  components: {
    CommentTemplateBtn,
    CommandBox
  },
  data() {
    return {
      cmdVisible: false,
      command: {
        size: "medium",
        color: "#fff"
      },
      comment: ""
    }
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    commandStr: {
      get() {
        const cmd = [];
        if (this.command.color) {
          cmd.push(this.command.color)
        }
        if (this.command.size) {
          cmd.push(this.command.size)
        }
        return cmd.length ? cmd.join(" ") : "";
      },
      set(value) {
        const command = value.split(" ");
        const color = command[0] ? command[0] : "#fff";
        const size = command[1] ? command[1] : "medium";
        this.command = {size, color};
      }
    }
  },
  mounted() {
    document.querySelector(".BC4V9b").style.display = "none";
    this.observeComment();
  },
  methods: {
    observeComment() {
      // コメント欄を監視
      // 1. 監視する要素（動的に追加する要素ではないので注意）
      const target = document.querySelector(".z38b6.CnDs7d.hPqowe");
      // 2. MutationObserverインスタンス生成
      const mutationObserver = new MutationObserver(this.onCommented);

      // 4. MutationObserverの監視設定（何をどこまで監視するか？みたいなこと）
      const option = {
        childList: true,
        subtree: true
      };

      // 5. MutationObserverインスタンスに監視要素とオプションを教えてあげる
      mutationObserver.observe(target, option);
    },
    onCommented(mutations) {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          console.log(node);
          if (node.className === "oIy2qc") {
            let comment = "";
            let command = "";
            try {
              const data = JSON.parse(node.textContent);
              comment = data.comment;
              command = data.command;
            } catch (e) {
              comment = node.textContent;
              command = {
                size: "medium",
                color: "#fff"
              }
            }
            this.$store.commit("updateComments", {comment, command});
            this.comment = "";
          }
          if (node.className === "GDhqjd" && node.dataset.formattedTimestamp !== "") {
            let comment = "";
            let command = "";
            try {
              const data = JSON.parse(node.querySelector(".oIy2qc").innerText);
              comment = data.comment;
              command = data.command;
            } catch (e) {
              comment = node.querySelector(".oIy2qc").innerText;
              command = {
                size: "medium",
                color: "#fff"
              }
            }
            this.$store.commit("updateComments", {comment, command});
            this.comment = "";
          }
        });
      });
    },
    sendComment(event) {
      if (event.keyCode !== 13) return;
      this.$store.commit("sendComment", {comment: this.comment, command: this.command});
    },
    templateSelected(value) {
      this.$store.commit("sendComment", {comment: value, command: this.command});
    },
    cmdSelected(command) {
      this.command = command;
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  padding-bottom: 400px;
}

.nico-comment-list {
  overflow-y: scroll;
}

.nico-comment-form {
  width: 90%;
  position: fixed;
  bottom: 0;
}
</style>