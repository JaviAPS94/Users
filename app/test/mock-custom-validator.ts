export const mockCustomValidator = {
  birthDateRules: [
    {
      rules: {
        birthdate: {
          required: true,
          birthdateMin: 10,
          birthdateMax: 100
        }
      }
    }
  ],
  documentTypeRules: [
    {
      rules: {
        documentType: {
          in: ["CI", "RUC"]
        }
      }
    }
  ]
};