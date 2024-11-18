export class CalculateDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createWithValidData(): CalculateDto {
    return new CalculateDto(
      Math.floor(Math.random() * 1000 + 100),
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 70) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1) + 3),
    )
  }

  static createWithValidDataHighRisk(): CalculateDto {
    return new CalculateDto(1000, 50, Math.floor(Math.random() * 70) + 17, true, 200, 3)
  }

  static createWithValidDataMediumRisk(): CalculateDto {
    return new CalculateDto(1000, 50, Math.floor(Math.random() * 70) + 17, true, 200, 9)
  }

  static createWithValidDataLowRisk(): CalculateDto {
    return new CalculateDto(1000, 50, Math.floor(Math.random() * 70) + 17, true, 200, 12)
  }

  static createWithInvalidData(): CalculateDto {
    return new CalculateDto(-100, -50, Math.floor(Math.random() * 16), false, -500, 60) // Некорректные значения
  }
}
