/**
 * Sends HTTP request with json body and parses json response
 *
 * @param {string} url
 * @param {JSON} data
 * @param {string} type
 */
async function sendRequest(url, data, type) {
  try {
    const response = await fetch(url, {
      method: type,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

/**
 * Sends get request and parses json response.
 * @param {string} url
 */
async function doGet(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export { sendRequest, doGet };
