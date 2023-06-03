import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom'

function Error() {
  const error = useRouteError()
  const navigate = useNavigate()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          back
        </button>
      </div>
    )
  } else {
    return <div>Oops</div>
  }
}

export default Error
