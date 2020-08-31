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
