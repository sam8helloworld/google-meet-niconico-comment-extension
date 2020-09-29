<template>
  <canvas id="comment-canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script>
import {gsap} from "gsap";

export default {
  name: "CommentCanvas",
  data() {
    return {
      ctx: null,
      comments: [],
      canvasWidth: 0,
      canvasHeight: 0,
      lines: Array(20).fill(false)
    }
  },
  mounted() {
    // キャンバスのリサイズに対応
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.updateCanvasSize();
      }
    });
    const target = document.querySelector(".zWfAib.Z319Jd.QhPhw");
    resizeObserver.observe(target);

    this.ctx = this.$refs.canvas.getContext("2d");
    // コメントの更新を購読
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'updateComments') {
        const latestComment = state.comments[state.comments.length - 1];
        this.createComment(latestComment, state.command);
      }
    });
  },
  methods: {
    createComment(text, command) {
      const lines = text.split("\n");
      const {fontSize, color, maxLength} = this.parseCommand(text, command);
      const lineNum = this.lines.indexOf(false);
      const y = fontSize * lineNum;
      lines.map((line, i) => {
        const id = Math.random();
        let comment = {
          id: id,
          lineNum: lineNum,
          text: line,
          font: `${fontSize}px 'ＭＳ 明朝'`,
          color: color,
          x: this.canvasWidth,
          y: fontSize + y + fontSize * i
        }
        this.lines[lineNum] = true;
        this.comments.push(comment);
        const anim = gsap.to(comment, {
          duration: 5,
          x: maxLength * fontSize * -1,
          ease: p => p
        });
        gsap.ticker.add(this.commentAnimLoop);
        anim.eventCallback("onComplete", () => {
          let index = null;
          this.comments.map((comment, key) => {
            if (comment.id === id) {
              index = key;
              this.lines[comment.lineNum] = false;
            }
          });
          this.comments.splice(index, 1);
        });
      })
    },
    parseCommand(comment, command) {
      const commentLines = comment.split("\n");
      const commentLineCount = commentLines.length;
      const color = command.color;
      let fontSize = this.canvasHeight / 13;
      // フォントサイズの決定
      if (command.size === "small") {
        if (commentLineCount <= 6) {
          fontSize = this.canvasHeight / 21;
        } else {
          fontSize = this.canvasHeight / 38;
        }
      }
      if (command.size === "medium") {
        if (commentLineCount <= 4) {
          fontSize = this.canvasHeight / 13;
        } else {
          fontSize = this.canvasHeight / 25;
        }
      }
      if (command.size === "big") {
        if (commentLineCount <= 4) {
          fontSize = this.canvasHeight / 8;
        } else {
          fontSize = this.canvasHeight / 16;
        }
      }
      let maxLength = 0;
      commentLines.map(line => {
        if (maxLength < line.length) {
          maxLength = line.length;
        }
      });
      return {
        fontSize,
        color,
        maxLength
      }
    },
    commentAnimLoop() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.comments.map(comment => {
        this.ctx.font = comment.font;
        this.ctx.fillStyle = comment.color;
        this.ctx.fillText(comment.text, comment.x, comment.y, this.canvasWidth);
      })
    },
    updateCanvasSize() {
      this.canvasWidth = document.querySelector(".zWfAib.Z319Jd")?.clientWidth | 0;
      this.canvasHeight = window.innerHeight - document.querySelector(".rG0ybd")?.clientHeight | 0;
    }
  }
}
</script>

<style scoped>
#comment-canvas {
  position: absolute;
  top: 0;
  z-index: 2;
}
</style>
