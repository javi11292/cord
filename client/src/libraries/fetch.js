import { HOST } from "./constants"

const host = `${HOST}/api`

async function parseResponse(response) {
  if (!response.ok) throw new Error("Error")

  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function post(path, body) {
  const response = await fetch(`${host}${path}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  return parseResponse(response)
}

export async function get(path) {
  const response = await fetch(`${host}${path}`, {
    credentials: "include",
  })

  return parseResponse(response)
}

export async function upload(path, data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value))

  const response = await fetch(`${host}${path}`, {
    credentials: "include",
    method: "POST",
    body: formData,
  })

  return parseResponse(response)
}