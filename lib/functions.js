const fetch = require('node-fetch')
const axios = require('axios')
const imgbb = require('imgbb-uploader')
const fs = require('fs')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')
const { fromBuffer } = require('file-type')
const FormData = require('form-data')

exports.getBuffer = getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

const simih = async (text) => {
	try {
		const sami = await fetch(`https://yuzzu-api.herokuapp.com/api/simi?text=${text.slice(2)}`, {method: 'GET'})
		const res = await sami.json()
		return res.result
	} catch {
		return 'Simi ga tau kak'
	}
}

const randomBytes = (length) => {
    return Crypto.randomBytes(length)
}

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const spinner = { 
  "interval": 500,
  "frames": [
    "🅓",
    "🅔",
    "🅝",
    "🅘",
    "🅢",
    "🅟",
    "🅤",
    "🅣",
    "🅡",
    "🅐"
  ]}

let globalSpinner;


const getGlobalSpinner = (disableSpins = false) => {
  if(!globalSpinner) globalSpinner = new spin({ color: 'white', succeedColor: 'green', spinner, disableSpins});
  return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
	spins.add(id, {text: text})
		/*setTimeout(() => {
			spins.succeed('load-spin', {text: 'Suksess'})
		}, Number(wait) * 1000)*/
	}
const info = (id, text) => {
	spins.update(id, {text: text})
}
const success = (id, text) => {
	spins.succeed(id, {text: text})

	}

const close = (id, text) => {
	spins.fail(id, {text: text})
}

module.exports = { getBuffer, getGroupAdmins, getRandom, start, simih, info, success, close }