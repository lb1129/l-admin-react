import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div
      style={{
        padding: '160px 0 24px',
        textAlign: 'center'
      }}
    >
      {isRouteErrorResponse(error) ? (
        <>
          <h2
            style={{
              lineHeight: '64px',
              fontSize: '64px',
              fontWeight: 600
            }}
          >
            {error.status}
          </h2>
          <p
            style={{
              fontSize: '20px',
              fontWeight: 600
            }}
          >
            {error.statusText}
          </p>
          {error.data?.message && <p>{error.data.message}</p>}
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
        </>
      ) : error instanceof window.Error ? (
        <>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600
            }}
          >
            {t('applicationError')}
          </div>
          <p style={{ margin: '18px 0 24px' }}>{error.message}</p>
          <div
            style={{
              display: 'inline-block',
              padding: '4px',
              backgroundColor: '#c8c8c880'
            }}
          >
            <pre style={{ textAlign: 'left' }}>{error.stack}</pre>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Error
