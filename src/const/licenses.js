import outdent from 'outdent'
export { default as LicenseListData } from '../license-list-data/licenses.json'

export const DomainInfo = {
  'developer.mozilla.org': {
    default: 'CC-BY-SA-2.5',
  },
  'ja.wikipedia.org': {
    default: 'CC-BY-SA-3.0',
  },
  'bsd.neuroinf.jp': {
    default: 'CC-BY-ND-4.0',
    phrase(url) {
      /* eslint-disable no-irregular-whitespace */
      return outdent`
        ＿＿著者名＿＿　＿＿タイトル＿＿　脳科学辞典　${url} (＿＿原稿完成日＿＿)
      `
      /* eslint-enable no-irregular-whitespace */
    },
  },
}

export const LicenseInfo = {
  'CC-BY-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by/1.0/deed.ja',
  },
  'CC-BY-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by/2.0/deed.ja',
  },
  'CC-BY-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by/2.5/deed.ja',
  },
  'CC-BY-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by/3.0/deed.ja',
  },
  'CC-BY-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by/4.0/deed.ja',
  },
  'CC-BY-NC-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/1.0/deed.ja',
  },
  'CC-BY-NC-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/2.0/deed.ja',
  },
  'CC-BY-NC-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/2.5/deed.ja',
  },
  'CC-BY-NC-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/3.0/deed.ja',
  },
  'CC-BY-NC-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja',
  },
  'CC-BY-NC-ND-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-nd/1.0/deed.ja',
  },
  'CC-BY-NC-ND-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-nd/2.0/deed.ja',
  },
  'CC-BY-NC-ND-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-nd/2.5/deed.ja',
  },
  'CC-BY-NC-ND-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-nd/3.0/deed.ja',
  },
  'CC-BY-NC-ND-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ja',
  },
  'CC-BY-NC-SA-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/1.0/deed.ja',
  },
  'CC-BY-NC-SA-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/2.0/deed.ja',
  },
  'CC-BY-NC-SA-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/2.5/deed.ja',
  },
  'CC-BY-NC-SA-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/3.0/deed.ja',
  },
  'CC-BY-NC-SA-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja',
  },
  'CC-BY-ND-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nd/1.0/deed.ja',
  },
  'CC-BY-ND-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nd/2.0/deed.ja',
  },
  'CC-BY-ND-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by-nd/2.5/deed.ja',
  },
  'CC-BY-ND-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nd/3.0/deed.ja',
  },
  'CC-BY-ND-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-nd/4.0/deed.ja',
  },
  'CC-BY-SA-1.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-sa/1.0/deed.ja',
  },
  'CC-BY-SA-2.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-sa/2.0/deed.ja',
  },
  'CC-BY-SA-2.5': {
    SOURCE: 'https://creativecommons.org/licenses/by-sa/2.5/deed.ja',
  },
  'CC-BY-SA-3.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-sa/3.0/deed.ja',
  },
  'CC-BY-SA-4.0': {
    SOURCE: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ja',
  },
  'CC0-1.0': {
    SOURCE: 'https://creativecommons.org/publicdomain/zero/1.0/deed.ja',
  },
}
