export default class LinkValidator {
  /**
   * Validates if a string is a valid Telegram sticker pack link
   * @param link The link to validate
   * @returns boolean indicating if the link is valid
   */
  static isTelegramStickerLink(link: string): boolean {
    // Check if the link is a string and not empty
    if (!link || typeof link !== 'string') {
      return false;
    }

    // Telegram sticker links typically follow these patterns:
    // - https://t.me/addstickers/{sticker_pack_name}
    // - https://telegram.me/addstickers/{sticker_pack_name}
    const telegramRegex = /^https?:\/\/(t|telegram)\.me\/addstickers\/[a-zA-Z0-9_]{1,64}$/;
    
    return telegramRegex.test(link.trim());
  }
  
  /**
   * Extracts the sticker pack name from a valid Telegram sticker link
   * @param link Valid Telegram sticker link
   * @returns The sticker pack name or null if invalid
   */
  static extractStickerPackName(link: string): string | null {
    if (!this.isTelegramStickerLink(link)) {
      return null;
    }
    
    const parts = link.trim().split('/');
    return parts[parts.length - 1] || null;
  }
}