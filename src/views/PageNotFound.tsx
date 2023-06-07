import { useNavigate } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

const PageNotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div style={{ textAlign: 'center', paddingTop: 100 }}>
      <h2
        style={{
          lineHeight: '64px',
          fontSize: '64px',
          fontWeight: 600
        }}
      >
        404
      </h2>
      <p
        style={{
          fontSize: '20px',
          fontWeight: 600
        }}
      >
        {t('pageNotFound')}
      </p>
      <div
        style={{
          margin: '24px auto 18px',
          width: '150px'
        }}
      >
        <Divider />
      </div>
      <Button
        type="primary"
        ghost
        shape="round"
        onClick={() => {
          navigate(-1)
        }}
      >
        {t('back')}
      </Button>
    </div>
  )
}

export default PageNotFound
