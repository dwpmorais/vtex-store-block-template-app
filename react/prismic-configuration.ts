export const repoName = 'my-blogignite'
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/graphql`
export const accessToken = 'MC5ZVHo1ZlJBQUFDSUEyS1Q0.NH5w77-977-9fe-_vQjvv70677-977-9Re-_vVZrcVLvv71lTmIC77-977-9Yu-_ve-_ve-_ve-_vTIU'

export const linkResolver = (doc: { type: string; uid: any; }) => {
  if (doc.type === 'post') return `/blog/${doc.uid}`
  return '/'
}
