export default class FileUtils {
  private static spaceSymbol: string = '&nbsp;'
  private static nextLineSymbol: string = '<br><br>'

  static async upload(e: any, spacesAmount: number) {
    const [file] = e.target.files

    if (!file) return

    return this.formatPararaphsAndSpaces(await file.text(), spacesAmount)
  }

  private static formatPararaphsAndSpaces(text: string, spacesAmount: number) {
    return (text + '').replace(
      /(\r\n|\n|\r)/gm,
      this.nextLineSymbol + this.makeSpaces(spacesAmount)
    )
  }

  private static makeSpaces(spaces: number): string {
    let result: string = ''
    for (let i = 0; i < spaces; i++) {
      result += this.spaceSymbol
    }

    return result
  }
}
