module.exports = {
  rules: {
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [
        "tailwind",
        "tailwindcss",
        "apply",
        "variants",
        "responsive",
        "screen"
      ]
    }]
  }
}; 