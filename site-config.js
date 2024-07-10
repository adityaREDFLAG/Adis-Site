const descriptionMd = `Upcoming Studio`

const description = descriptionMd
  .replace(/\[([^\]]+)\](\([^)]+\)|\[[^\]]+\])/g, '$1')
  .replace(/\n/g, '')
  .replace(/\s{2,}/g, ' ')
  .trim()

module.exports = {
  title: 'Adis Studio',
  descriptionMd,
  description,
  url: '',
  twitterUsername: '@adityaredflag',
  email: 'adi.redflag@gmail.com',
  socials: {
    GitHub: 'https://github.com/adityaredflag/',
    Twitter: 'https://twitter.com/adityaredflag',
  },
  bgColor: '#212121',
  themeColor: '#FF4545',
}
