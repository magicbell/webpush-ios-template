export default function minVersionCheck(
  versionString: string,
  majorVersion: number,
  minorVersion: number
) {
  const [osMajorVersion, osMinorVersion] = versionString.split(".")
  if (
    Number(osMajorVersion) < majorVersion ||
    (Number(osMajorVersion) === majorVersion &&
      Number(osMinorVersion) < minorVersion)
  ) {
    return false
  } else {
    return true
  }
}
