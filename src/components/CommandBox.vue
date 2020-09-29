<template>
  <v-card>
    <v-row justify="center">
      <v-col cols="4" v-for="(size, sizeIndex) in sizes" :key="sizeIndex">
        <v-btn @click="sizeSelected(size.value)">
          <span :class="size.classes">A</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn v-for="(color, colorIndex) in colors" :key="colorIndex" x-small :color="color.label"
               @click="colorSelected(color.value)"></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: "CommandBox",
  data() {
    return {
      command: {
        size: "medium",
        color: "#fff"
      },
      sizes: [
        {
          value: "big",
          classes: ["display-1"]
        },
        {
          value: "medium",
          classes: ["headline"]
        },
        {
          value: "small",
          classes: ["body-1"]
        }
      ],
      colors: [
        {
          label: "white",
          value: "#fff"
        },
        {
          label: "red",
          value: "#f44336"
        },
        {
          label: "pink",
          value: "#e91E63"
        },
        {
          label: "orange",
          value: "#ff9800"
        },
        {
          label: "yellow",
          value: "#ffeB3B"
        },
        {
          label: "green",
          value: "#4caf50"
        },
        {
          label: "blue",
          value: "#2196f3"
        },
        {
          label: "purple",
          value: "#9c27b0"
        },
        {
          label: "black",
          value: "#000000"
        },
      ]
    }
  },
  methods: {
    colorSelected(colorCode) {
      this.command.color = colorCode;
      this.$emit("change", this.command);
    },
    sizeSelected(size) {
      this.command.size = size;
      this.$emit("change", this.command);
    }
  }
}
</script>