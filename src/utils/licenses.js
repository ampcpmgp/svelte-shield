import { LicenseListData, LicenseInfo } from '../const/licenses'

export function getUrl(license) {
  const definedUrl = LicenseInfo[license]?.SOURCE

  if (definedUrl) return definedUrl

  const defaultUrl = LicenseListData.licenses.find(
    item => item.licenseId === license
  )?.seeAlso[0]

  return defaultUrl
}
