const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-42',
    headers: {
        authorization: '847f48dc-6a93-45de-a7d1-dce7549a04e7',
        'Content-Type': 'application/json'
    }
};

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

export function updateUserInfo({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

export function addNewCard({ name, link}) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}