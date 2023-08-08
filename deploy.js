var sftp = require('node-sftp-deploy')

sftp(require('./.ftp-credentials.json'), () => {
  console.log('Files uploaded')
})
