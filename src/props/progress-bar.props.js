export const progressBarProps = {
  modelValue: {
    type: Number,
    required: true,
    validator(value) {
      return value >= 0 && value <= 100;
    },
  },
  labelText: { type: String, default: undefined },
  type: { type: String, default: undefined },
  label: { type: Boolean, default: false },
  minWidth: { type: Boolean, default: false },
  striped: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
};
