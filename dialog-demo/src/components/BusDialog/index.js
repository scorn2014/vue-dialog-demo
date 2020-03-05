import bus from "../../bus";

export default {
  show() {
    bus.$emit("bus-dialog-show");
  }
};
