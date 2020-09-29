<template>
  <div>
    <v-chip small label outlined v-for="(template, index) in templates" @click="selected(template.value)"
            :key="index">{{
        template.label
      }}
    </v-chip>
  </div>
</template>

<script>

export default {
  name: "CommentTemplateBtn",
  data() {
    return {
      templates: [
        {
          label: "www",
          value: "www"
        },
        {
          label: "8888888888888",
          value: "8888888888888"
        },
        {
          label: "草",
          value: "草"
        },
        {
          label: "待ってました！",
          value: "待ってました！"
        },
        {
          label: "わかる",
          value: "わかる"
        },
        {
          label: "おつ",
          value: "おつ"
        },
        {
          label: "あっ.....",
          value: "あっ....."
        },
        {
          label: "そマ？",
          value: "そマ？"
        },
        {
          label: "ドドドド",
          value: "┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨┣¨ ┣¨┣¨┣¨┣¨"
        },
        {
          label: "キター",
          value: "ｷﾀ━(ﾟ∀ﾟ)━!!"
        },
        {
          label: "ぴえん",
          value: "🥺"
        },
        {
          label: "スパチャ",
          value: "スパチャ ¥11,000"
        },
        {
          label: "現場ネコ",
          value: "･･･ヨシ！\n" +
              "　　　 ∧　　/ヽ\n" +
              "　　　/／￣￣＼|\n" +
              "　　 ∠＿╋＿＿〉\n" +
              "　　/　①八①　ヽ ＿\n" +
              "　 工ﾆf(_人_)ｴ二|′)ヽ\n" +
              "　　＼ヽヽノノ ノ ヘ |\n" +
              "⊂⌒)_＞―――′イ (＿)\n" +
              "　`ー､_ノ/￣ヽ　｜\n" +
              "　　 ＿|｜　 |　｜\n" +
              "　　(　 人＿ノ　Λ\n" +
              "　　 ＼ス￣￣ﾚ-Λ ＼\n" +
              "　　(￣　)　/ /　＼ﾉ＼\n" +
              "　　 ￣￣　(　ヽ　 ＼_)\n" +
              "　　　　　　＼ノ\n"
        }
      ]
    }
  },
  methods: {
    selected(value) {
      this.$emit("selected", value);
    }
  }
}
</script>