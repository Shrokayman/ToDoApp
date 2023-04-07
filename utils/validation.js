/**
 * @desc      format validation response
 * @access    Public
 */
export const errorFormatter = ({ location, msg, param }) => {
    return `${location}[${param}]: ${msg}`
  }