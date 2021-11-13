export interface IBaseEnumValue {
  sys: string
  human: string
}

export class BaseEnum {
  static values: IBaseEnumValue[]

  static getHumanValues() {
    return this.values.map((e) => e.human)
  }

  static getSysValues() {
    return this.values.map((e) => e.sys)
  }

  static getHumanValueBySys(sys: string) {
    return this.values.find((e) => e.sys === sys).human
  }
}
