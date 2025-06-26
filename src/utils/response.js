export function ok(res, body = null, code = 200) {
  return res.status(code).json({ status: 'ok', statusCode: code, body })
}

export function fail(res, message, code = 400) {
  return res.status(code).json({ status: 'error', statusCode: code, message })
}
