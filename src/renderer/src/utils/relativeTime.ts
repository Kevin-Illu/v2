const DATE_UNITS: Record<string, number> = {
  year: 31536000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

type returnType = {
  value: number
  unit: string
}

const getSecondsDiff = (timestamp: Date): number => {
  return Math.abs((Date.now() - timestamp.getTime()) / 1000)
}

const getUnitAndValueDate = (secondsElapsed: number): returnType => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }

  return { value: secondsElapsed, unit: '' }
}

export const getTimeAgo = (timestamp: Date): string => {
  const rtf = new Intl.RelativeTimeFormat()

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
