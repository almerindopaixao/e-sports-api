export interface CreateAdDTO {
    name: string,
    yearsPlaying: number,
    discord: string,
    weekDays: string[],
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean
}