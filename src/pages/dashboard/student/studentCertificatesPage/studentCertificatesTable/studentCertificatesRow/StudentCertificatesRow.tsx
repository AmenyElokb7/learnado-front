import { TableRow, TableCell, Tooltip } from '@mui/material'
import { t } from 'i18next'
import { StudentCertificatesRowProps } from './StudentCertificatesRow.type'
import { Download } from '@mui/icons-material'

function StudentCertificatesRow({ certificate }: StudentCertificatesRowProps) {
  // Function to handle the file download
  const handleDownload = () => {
    const downloadUrl = certificate.downloadUrl
    window.open(downloadUrl, '_blank')
  }

  return (
    <>
      <TableRow key={certificate.id}>
        <TableCell>{t(certificate.courseTitle)}</TableCell>
        <TableCell>
          <Tooltip title={t('common.download')}>
            <Download color="info" cursor="pointer" onClick={handleDownload} />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}

export default StudentCertificatesRow
